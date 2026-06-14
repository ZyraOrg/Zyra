import { Program, AnchorProvider, web3, BN } from "@coral-xyz/anchor";
import { Buffer } from "buffer";
import {
  Connection,
  PublicKey,
  clusterApiUrl,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import idl from "../lib/idl/idl.json";

// ── Constants ────────────────────────────────────────────────────
const NETWORK = import.meta.env.VITE_SOLANA_NETWORK || "devnet";
const CONNECTION = new Connection(clusterApiUrl(NETWORK), "confirmed");

// These are functions so PublicKey is only created when called,
// not at file load time — fixes the "_bn undefined" crash
function getProgramId() {
  return new PublicKey(import.meta.env.VITE_PROGRAM_ID);
}

function getUsdtMint() {
  const mint =
    NETWORK === "mainnet-beta"
      ? "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"
      : import.meta.env.VITE_USDT_MINT_DEVNET;
  return new PublicKey(mint);
}

// ── Helper: Get Program ──────────────────────────────────────────
function getProgram(wallet) {
  const provider = new AnchorProvider(CONNECTION, wallet, {
    commitment: "confirmed",
  });
  return new Program(idl, getProgramId(), provider);
}

// ── Helper: Derive PDAs ──────────────────────────────────────────
export function getPlatformPDA() {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("platform")],
    getProgramId()
  );
}

export function getCampaignPDA(campaignId) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("campaign"), new BN(campaignId).toArrayLike(Buffer, "le", 8)],
    getProgramId()
  );
}

export function getAdminRecordPDA(adminWallet) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("admin"), new PublicKey(adminWallet).toBytes()],
    getProgramId()
  );
}

export function getContributionPDA(campaignId, contributorWallet) {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from("contribution"),
      new BN(campaignId).toArrayLike(Buffer, "le", 8),
      new PublicKey(contributorWallet).toBytes(),
    ],
    getProgramId()
  );
}

// ── 1. INITIALIZE PLATFORM ───────────────────────────────────────
export async function initializePlatform(wallet, platformWalletAddress) {
  try {
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const platformWallet = new PublicKey(platformWalletAddress);

    const tx = await program.methods
      .initialize(platformWallet)
      .accounts({
        platform: platformPDA,
        superAdmin: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Platform initialized. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    console.error("initializePlatform error:", error);
    return { success: false, error: error.message };
  }
}

// ── 2. ADD ADMIN ─────────────────────────────────────────────────
export async function addAdmin(wallet, adminWalletAddress) {
  try {
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const adminWallet = new PublicKey(adminWalletAddress);
    const [adminRecordPDA] = getAdminRecordPDA(adminWalletAddress);

    const tx = await program.methods
      .addAdmin(adminWallet)
      .accounts({
        platform: platformPDA,
        adminRecord: adminRecordPDA,
        superAdmin: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Admin added. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    console.error("addAdmin error:", error);
    return { success: false, error: error.message };
  }
}

// ── 3. REMOVE ADMIN ──────────────────────────────────────────────
export async function removeAdmin(wallet, adminWalletAddress) {
  try {
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const adminWallet = new PublicKey(adminWalletAddress);
    const [adminRecordPDA] = getAdminRecordPDA(adminWalletAddress);

    const tx = await program.methods
      .removeAdmin(adminWallet)
      .accounts({
        platform: platformPDA,
        adminRecord: adminRecordPDA,
        superAdmin: wallet.publicKey,
      })
      .rpc();

    console.log("Admin removed. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    console.error("removeAdmin error:", error);
    return { success: false, error: error.message };
  }
}

// ── 4. CREATE CAMPAIGN ───────────────────────────────────────────
export async function createCampaign(wallet, campaignId, payoutAddress, goalInUsdt) {
  try {
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const [campaignPDA] = getCampaignPDA(campaignId);
    const payout = new PublicKey(payoutAddress);
    const goalOnChain = new BN(goalInUsdt * 1_000_000);

    const tx = await program.methods
      .createCampaign(new BN(campaignId), payout, goalOnChain)
      .accounts({
        platform: platformPDA,
        campaign: campaignPDA,
        payer: wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Campaign created. Tx:", tx);
    return { success: true, tx, campaignPDA: campaignPDA.toString() };
  } catch (error) {
    console.error("createCampaign error:", error);
    return { success: false, error: error.message };
  }
}

// ── 5. APPROVE CAMPAIGN (Admin only) ─────────────────────────────
export async function approveCampaign(wallet, campaignId) {
  try {
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const [campaignPDA] = getCampaignPDA(campaignId);
    const [adminRecordPDA] = getAdminRecordPDA(wallet.publicKey.toString());

    const tx = await program.methods
      .approveCampaign(new BN(campaignId))
      .accounts({
        platform: platformPDA,
        adminRecord: adminRecordPDA,
        campaign: campaignPDA,
        authority: wallet.publicKey,
      })
      .rpc();

    console.log("Campaign approved. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    console.error("approveCampaign error:", error);
    return { success: false, error: error.message };
  }
}

// ── 6. CONTRIBUTE ────────────────────────────────────────────────
export async function contribute(wallet, campaignId, amountInUsdt) {
  try {
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const [campaignPDA] = getCampaignPDA(campaignId);
    const [contributionPDA] = getContributionPDA(
      campaignId,
      wallet.publicKey.toString()
    );

    const platformAccount = await program.account.platform.fetch(platformPDA);
    const platformWallet = platformAccount.platformWallet;
    const usdtMint = getUsdtMint();

    const contributorTokenAccount = await getAssociatedTokenAddress(
      usdtMint,
      wallet.publicKey
    );
    const campaignVaultTokenAccount = await getAssociatedTokenAddress(
      usdtMint,
      campaignPDA,
      true
    );
    const platformTokenAccount = await getAssociatedTokenAddress(
      usdtMint,
      platformWallet
    );

    const amountOnChain = new BN(amountInUsdt * 1_000_000);

    const tx = await program.methods
      .contribute(new BN(campaignId), amountOnChain)
      .accounts({
        platform: platformPDA,
        campaign: campaignPDA,
        contribution: contributionPDA,
        contributorTokenAccount,
        campaignVaultTokenAccount,
        platformTokenAccount,
        contributor: wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: web3.SystemProgram.programId,
      })
      .rpc();

    console.log("Contribution successful. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    console.error("contribute error:", error);
    return { success: false, error: error.message };
  }
}

// ── 7. RELEASE FUNDS (Admin only) ────────────────────────────────
export async function releaseFunds(wallet, campaignId) {
  try {
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const [campaignPDA] = getCampaignPDA(campaignId);
    const [adminRecordPDA] = getAdminRecordPDA(wallet.publicKey.toString());

    const campaignAccount = await program.account.campaign.fetch(campaignPDA);
    const payoutAddress = campaignAccount.payoutAddress;
    const usdtMint = getUsdtMint();

    const campaignVaultTokenAccount = await getAssociatedTokenAddress(
      usdtMint,
      campaignPDA,
      true
    );
    const payoutTokenAccount = await getAssociatedTokenAddress(
      usdtMint,
      payoutAddress
    );

    const tx = await program.methods
      .releaseFunds(new BN(campaignId))
      .accounts({
        platform: platformPDA,
        adminRecord: adminRecordPDA,
        campaign: campaignPDA,
        campaignVaultTokenAccount,
        payoutTokenAccount,
        authority: wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    console.log("Funds released. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    console.error("releaseFunds error:", error);
    return { success: false, error: error.message };
  }
}

// ── 8. END CAMPAIGN (Admin only) ─────────────────────────────────
export async function endCampaign(wallet, campaignId) {
  try {
    const program = getProgram(wallet);
    const [platformPDA] = getPlatformPDA();
    const [campaignPDA] = getCampaignPDA(campaignId);
    const [adminRecordPDA] = getAdminRecordPDA(wallet.publicKey.toString());

    const tx = await program.methods
      .endCampaign(new BN(campaignId))
      .accounts({
        platform: platformPDA,
        adminRecord: adminRecordPDA,
        campaign: campaignPDA,
        authority: wallet.publicKey,
      })
      .rpc();

    console.log("Campaign ended. Tx:", tx);
    return { success: true, tx };
  } catch (error) {
    console.error("endCampaign error:", error);
    return { success: false, error: error.message };
  }
}

// ── 9. FETCH CAMPAIGN DATA ───────────────────────────────────────
export async function fetchCampaign(campaignId) {
  try {
    const provider = { connection: CONNECTION };
    const program = new Program(idl, getProgramId(), provider);
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
          (campaignAccount.raised.toNumber() /
            campaignAccount.goal.toNumber()) *
          100,
      },
    };
  } catch (error) {
    console.error("fetchCampaign error:", error);
    return { success: false, error: error.message };
  }
}

// ── 10. FETCH ALL CAMPAIGNS ──────────────────────────────────────
export async function fetchAllCampaigns() {
  try {
    const provider = { connection: CONNECTION };
    const program = new Program(idl, getProgramId(), provider);

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
          (c.account.raised.toNumber() / c.account.goal.toNumber()) * 100,
        publicKey: c.publicKey.toString(),
      })),
    };
  } catch (error) {
    console.error("fetchAllCampaigns error:", error);
    return { success: false, error: error.message };
  }
}