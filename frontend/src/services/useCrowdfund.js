import { useState, useCallback } from "react";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import {
  contribute,
  createCampaign,
  approveCampaign,
  releaseFunds,
  endCampaign,
  fetchCampaign,
  fetchAllCampaigns,
  addAdmin,
  removeAdmin,
  initializePlatform,
} from "../services/crowdfund";

// ================================================================
// useCrowdfund Hook
// Drop this into any component that needs to interact with
// the crowdfunding smart contract.
//
// Usage example:
//   const { donate, loading, error } = useCrowdfund();
//   await donate(campaignId, amount);
// ================================================================

export function useCrowdfund() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [txSignature, setTxSignature] = useState(null);

  // Get the connected Solana wallet from Reown AppKit
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

  // ── Public Functions ─────────────────────────────────────────

  // Donate to a campaign
  // Usage: await donate(42, 50) → donates $50 USDT to campaign #42
  const donate = useCallback(
    (campaignId, amountInUsdt) =>
      execute(contribute, campaignId, amountInUsdt),
    [execute]
  );

  // Create a new campaign (goes to Pending status)
  // Usage: await submitCampaign(42, "wallet_address", 10000)
  const submitCampaign = useCallback(
    (campaignId, payoutAddress, goalInUsdt) =>
      execute(createCampaign, campaignId, payoutAddress, goalInUsdt),
    [execute]
  );

  // Admin: approve a pending campaign
  const approve = useCallback(
    (campaignId) => execute(approveCampaign, campaignId),
    [execute]
  );

  // Admin: release funds to creator
  const release = useCallback(
    (campaignId) => execute(releaseFunds, campaignId),
    [execute]
  );

  // Admin: end a campaign early
  const end = useCallback(
    (campaignId) => execute(endCampaign, campaignId),
    [execute]
  );

  // Admin: add a new admin wallet
  const addNewAdmin = useCallback(
    (adminWalletAddress) => execute(addAdmin, adminWalletAddress),
    [execute]
  );

  // Admin: remove an admin wallet
  const removeExistingAdmin = useCallback(
    (adminWalletAddress) => execute(removeAdmin, adminWalletAddress),
    [execute]
  );

  // Super admin: initialize the platform (called once after deployment)
  const initialize = useCallback(
    (platformWalletAddress) =>
      execute(initializePlatform, platformWalletAddress),
    [execute]
  );

  // ── Read Functions (no wallet needed) ───────────────────────

  // Fetch a single campaign's on-chain data (for progress bar etc)
  const getCampaign = useCallback(async (campaignId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchCampaign(campaignId);
      if (!result.success) setError(result.error);
      return result;
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all campaigns (for the campaigns list page)
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

    // User actions
    donate,
    submitCampaign,

    // Admin actions
    approve,
    release,
    end,
    addNewAdmin,
    removeExistingAdmin,
    initialize,

    // Read actions
    getCampaign,
    getAllCampaigns,
  };
}