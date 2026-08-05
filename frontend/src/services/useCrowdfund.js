import { useState, useCallback } from "react";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import {
  contribute,
  fetchCampaign,
  fetchAllCampaigns,
  initializePlatform,
  updateAuthority,
} from "../services/crowdfund";

// ================================================================
// useCrowdfund Hook
// Connects any component to the Zyra crowdfunding smart contract.
//
// Usage:
//   const { donate, loading, error } = useCrowdfund();
//   await donate(chainId, amount);
// ================================================================

export function useCrowdfund() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txSignature, setTxSignature] = useState(null);

  // Get connected Solana wallet from Reown AppKit
  const { walletProvider } = useAppKitProvider("solana");
  const { address, isConnected } = useAppKitAccount();

  // ── Helper ───────────────────────────────────────────────────
  // Wraps any contract call with loading/error state management
  const execute = useCallback(
    async (fn, ...args) => {
      if (!isConnected || !walletProvider) {
        setError("Please connect your Solana wallet first");
        return { success: false, error: "Wallet not connected" };
      }

      setLoading(true);
      setError(null);
      setTxSignature(null);

      try {
        const result = await fn(walletProvider, ...args);
        if (result.success) {
          setTxSignature(result.tx);
        } else {
          setError(result.error);
        }
        return result;
      } catch (err) {
        setError(err.message);
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    },
    [isConnected, walletProvider]
  );

  // ── Donate ───────────────────────────────────────────────────
  // Main user action — donate USDC to a campaign
  // chainId: campaign.chain_id from Supabase
  // amountInUsdc: e.g. 50 for $50
  const donate = useCallback(
    (chainId, amountInUsdc) => execute(contribute, chainId, amountInUsdc),
    [execute]
  );

  // ── One-time setup (deployer only) ───────────────────────────
  const initialize = useCallback(
    (authorityAddress, platformWalletAddress) =>
      execute(initializePlatform, authorityAddress, platformWalletAddress),
    [execute]
  );

  // ── Update authority (current authority only) ────────────────
  const changeAuthority = useCallback(
    (newAuthorityAddress) => execute(updateAuthority, newAuthorityAddress),
    [execute]
  );

  // ── Read functions (no wallet needed) ────────────────────────

  // Get live raised amount and status for a single campaign
  const getCampaign = useCallback(async (chainId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCampaign(chainId);
      if (!result.success) setError(result.error);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get all campaigns from the contract
  const getAllCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchAllCampaigns();
      if (!result.success) setError(result.error);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    // State
    loading,
    error,
    txSignature,
    isConnected,
    connectedAddress: address,
    walletProvider,

    // User actions
    donate,

    // Setup actions
    initialize,
    changeAuthority,

    // Read actions
    getCampaign,
    getAllCampaigns,
  };
}