import { Program, AnchorProvider, web3, BN } from "@coral-xyz/anchor";
import { Buffer } from "buffer";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import {
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import idl from "../lib/idl/idl.json";

// ── Constants ────────────────────────────────────────────────────
const PROGRAM_ID = new PublicKey("DDHnP6bWygPFJZiumq3EUZmVNSrVeFwtd8w8WeAtLEfR");
const NETWORK = import.meta.env.VITE_SOLANA_NETWORK || "devnet";
const CONNECTION = new Connection(clusterApiUrl(NETWORK), "confirmed");

function normalizeWalletPublicKey(wallet) {
  const candidate =
    wallet?.publicKey ??
    wallet?.adapter?.publicKey ??
    wallet?.session?.publicKey ??
    wallet?.wallet?.adapter?.publicKey;

  if (!candidate) {
    throw new Error("No public key found in wallet provider. Please reconnect your wallet and try again.");
  }

  if (candidate instanceof PublicKey) return candidate;

  if (typeof candidate === "string") return new PublicKey(candidate);

  if (typeof candidate.toString === "function") {
    const maybeAddress = candidate.toString();
    if (maybeAddress && maybeAddress !== "[object Object]") {
      return new PublicKey(maybeAddress);
    }
  }

  throw new Error("Wallet public key is in an unsupported format.");
}

function getUsdcMint() {
  const mint =
    NETWORK === "mainnet-beta"
      ? "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
      : import.meta.env.VITE_USDC_MINT_DEVNET;
  if (!mint) {
    throw new Error(`USDC mint address is not configured for network "${NETWORK}"`);
  }
  return new PublicKey(mint);
}

// Turns a raw/technical error into a message safe to show a user, while
// always logging the original error so it's visible in the console/logs.
function toFriendlyError(context, error) {
  console.error(`${context} error:`, error);

  const message = error?.message || String(error);

  if (message.includes("_bn") || message.includes("Invalid public key")) {
    return "This action is misconfigured on our end. Please contact support.";
  }
  if (message.includes("not configured")) {
    return "This network isn't fully set up yet. Please contact support.";
  }
  if (message.includes("User rejected") || message.includes("rejected the request")) {
    return "Transaction was cancelled.";
  }
  if (message.includes("insufficient")) {
    return "Insufficient balance to complete this transaction.";
  }
  if (message.includes("has not been initialized on-chain") ||
      message.includes("USDC token account") ||
      message.includes("missing its on-chain id") ||
      message.includes("No public key found")) {
    // Already a clear, user-facing message written by our own code.
    return message;
  }

  return "Something went wrong while processing your request. Please try again.";
}

// ── Helper: Get Program ──────────────────────────────────────────
function getProgram(wallet) {
  const publicKey = normalizeWalletPublicKey(wallet);

  const anchorWallet = {
    publicKey,
    signTransaction: (tx) => wallet.signTransaction(tx),
    signAllTransactions: (txs) =>
      Promise.all(txs.map((tx) => wallet.signTransaction(tx))),
  };

  const provider = new AnchorProvider(CONNECTION, anchorWallet, {
    commitment: "confirmed",
    preflightCommitment: "confirmed",
  });

  return new Program(idl, PROGRAM_ID, provider);
}

// ── Helper: Derive PDAs ──────────────────────────────────────────
export function getPlatformPDA() {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("platform")],
    PROGRAM_ID
  );
}

export function getCampaignPDA(campaignId) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("campaign"), new BN(campaignId).toArrayLike(Buffer, "le", 8)],
    PROGRAM_ID
  );
}

async function accountExists(publicKey) {
  const account = await CONNECTION.getAccountInfo(publicKey);
  return Boolean(account);
}

// ── 1. INITIALIZE PLATFORM ───────────────────────────────────────
// Called once after deployment by the deployer wallet.
// Sets the authority (backend keypair) and platform fee wallet.
export async function initializePlatform(wallet, authorityAddress, platformWalletAddress) {
  try {
    const publicKey = normalizeWalletPublicKey(wallet);
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const authority = new PublicKey(authorityAddress);
    const platformWallet = new PublicKey(platformWalletAddress);

    const tx = await program.methods
      .initialize(authority, platformWallet)
      .accounts({
        platform: platformPDA,
        payer: publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Platform initialized. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    return { success: false, error: toFriendlyError("initializePlatform", error) };
  }
}

// ── 2. UPDATE AUTHORITY ──────────────────────────────────────────
// Only current authority can call this.
// Allows changing backend keypair without redeployment.
export async function updateAuthority(wallet, newAuthorityAddress) {
  try {
    const publicKey = normalizeWalletPublicKey(wallet);
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const newAuthority = new PublicKey(newAuthorityAddress);

    const tx = await program.methods
      .updateAuthority(newAuthority)
      .accounts({
        platform: platformPDA,
        authority: publicKey,
      })
      .rpc();

    console.log("Authority updated. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    return { success: false, error: toFriendlyError("updateAuthority", error) };
  }
}

// ── 3. CONTRIBUTE ────────────────────────────────────────────────
// Any user can call this. Sends USDC to campaign vault.
// 2% goes to platform wallet. 98% stays in campaign vault.
// campaignId: the chain_id from Supabase (bigint/number)
// amountInUsdC: human readable e.g. 50 for $50 USDC
export async function contribute(wallet, campaignId, amountInUsdc) {
  try {
    if (campaignId === null || campaignId === undefined || campaignId === "") {
      throw new Error("Campaign is missing its on-chain id");
    }

    const publicKey = normalizeWalletPublicKey(wallet);
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const [campaignPDA] = getCampaignPDA(campaignId);

    // Fetch platform account to get platform wallet for fee
    const platformAccount = await program.account.platform.fetch(platformPDA);
    const platformWallet = platformAccount?.platformWallet;

    if (!platformWallet) {
      throw new Error("Platform wallet is not initialized on-chain yet.");
    }

    const usdcMint = getUsdcMint();

    try {
      await program.account.campaign.fetch(campaignPDA);
    } catch {
      throw new Error(
        "This campaign has not been initialized on-chain yet. Please approve/create it on-chain before accepting donations."
      );
    }

    // Derive all USDC token accounts
    const contributorTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      publicKey
    );
    const campaignVaultTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      campaignPDA,
      true // allowOwnerOffCurve — needed because campaign is a PDA
    );
    const platformTokenAccount = await getAssociatedTokenAddress(
      usdcMint,
      platformWallet
    );

    if (!(await accountExists(contributorTokenAccount))) {
      throw new Error(
        "Your wallet does not have a USDC token account for this network. Please fund this wallet with the configured USDC token, then try again."
      );
    }

    const preInstructions = [];
    if (!(await accountExists(campaignVaultTokenAccount))) {
      preInstructions.push(
        createAssociatedTokenAccountInstruction(
          publicKey,
          campaignVaultTokenAccount,
          campaignPDA,
          usdcMint
        )
      );
    }
    if (!(await accountExists(platformTokenAccount))) {
      preInstructions.push(
        createAssociatedTokenAccountInstruction(
          publicKey,
          platformTokenAccount,
          platformWallet,
          usdcMint
        )
      );
    }

    // Convert amount to on-chain units (6 decimals: 1 USDC = 1_000_000)
    const amountOnChain = new BN(Math.round(amountInUsdc * 1_000_000));

    const tx = await program.methods
      .contribute(new BN(campaignId), amountOnChain)
      .accounts({
        platform: platformPDA,
        campaign: campaignPDA,
        contributorTokenAccount,
        campaignVaultTokenAccount,
        platformTokenAccount,
        contributor: publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      })
      .preInstructions(preInstructions)
      .rpc();

    console.log("Contribution successful. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    return { success: false, error: toFriendlyError("contribute", error) };
  }
}

// ── 4. FETCH CAMPAIGN DATA ───────────────────────────────────────
// Reads a campaign's on-chain data.
// Used by the frontend to get live raised amount for progress bar.
export async function fetchCampaign(campaignId) {
  try {
    const provider = { connection: CONNECTION };
    const program = new Program(idl, PROGRAM_ID, provider);
    const [campaignPDA] = getCampaignPDA(campaignId);

    const campaignAccount = await program.account.campaign.fetch(campaignPDA);

    return {
      success: true,
      data: {
        campaignId: campaignAccount.campaignId.toString(),
        payoutAddress: campaignAccount.payoutAddress.toString(),
        goal: campaignAccount.goal.toNumber() / 1_000_000,
        raised: campaignAccount.raised.toNumber() / 1_000_000,
        status: Object.keys(campaignAccount.status)[0],
        progressPercent:
          campaignAccount.goal.toNumber() > 0
            ? (campaignAccount.raised.toNumber() /
                campaignAccount.goal.toNumber()) *
              100
            : 0,
      },
    };
  } catch (error) {
    return { success: false, error: toFriendlyError("fetchCampaign", error) };
  }
}

// ── 5. FETCH ALL CAMPAIGNS ───────────────────────────────────────
// Fetches all campaign accounts from the contract.
export async function fetchAllCampaigns() {
  try {
    const provider = { connection: CONNECTION };
    const program = new Program(idl, PROGRAM_ID, provider);

    const campaigns = await program.account.campaign.all();

    return {
      success: true,
      data: campaigns.map((c) => ({
        campaignId: c.account.campaignId.toString(),
        payoutAddress: c.account.payoutAddress.toString(),
        goal: c.account.goal.toNumber() / 1_000_000,
        raised: c.account.raised.toNumber() / 1_000_000,
        status: Object.keys(c.account.status)[0],
        progressPercent:
          c.account.goal.toNumber() > 0
            ? (c.account.raised.toNumber() / c.account.goal.toNumber()) * 100
            : 0,
        publicKey: c.publicKey.toString(),
      })),
    };
  } catch (error) {
    return { success: false, error: toFriendlyError("fetchAllCampaigns", error) };
  }
}
