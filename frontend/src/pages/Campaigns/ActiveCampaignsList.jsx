import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useCrowdfund } from "../../services/useCrowdfund";
import useAuthStore from "../../store/useAuthStore";

// ── Suggested donation amounts ───────────────────────────────────
const SUGGESTED_AMOUNTS = [10, 50, 100, 250, 500];

// ── Progress Bar ─────────────────────────────────────────────────
function ProgressBar({ percent }) {
  const clamped = Math.min(Math.max(percent || 0), 100);
  return (
    <div className="w-full h-1.5 bg-[#1E1E2D] rounded-full overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] transition-all duration-700"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

// ── Campaign Card ─────────────────────────────────────────────────
function CampaignCard({ campaign, onDonate, isOwn }) {
  const raised = Number(campaign.raised || 0);
  const goal = Number(campaign.goal_amount || 0);
  const percent = goal > 0 ? (raised / goal) * 100 : 0;

  return (
    <div className="group relative bg-[#010410] border border-gray-800/40 rounded-2xl overflow-hidden hover:border-[#91F2F9]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(145,242,249,0.08)] flex flex-col">
      {/* Cover image */}
      <div className="relative h-44 overflow-hidden bg-[#0a0a1a]">
        {campaign.cover_url ? (
          <img
            src={campaign.cover_url}
            alt={campaign.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-600 text-xs font-sora">No cover</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#010410] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Campaign ID badge */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-[#91F2F9]/60 bg-[#91F2F9]/5 border border-[#91F2F9]/10 px-2 py-0.5 rounded-full">
            #{String(campaign.id).slice(0, 8)}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-roboto font-semibold text-white text-base leading-tight line-clamp-2">
          {campaign.name || "Untitled Campaign"}
        </h3>

        {/* Objective */}
        <p className="text-gray-400 text-xs font-sora leading-relaxed line-clamp-2 flex-1">
          {campaign.objective || "No description available"}
        </p>

        {/* Progress */}
        <div className="space-y-2">
          <ProgressBar percent={percent} />
          <div className="flex justify-between items-center text-xs font-sora">
            <span className="text-[#91F2F9] font-medium">
              ${raised.toLocaleString()} raised
            </span>
            <span className="text-gray-500">
              of ${goal.toLocaleString()} goal
            </span>
          </div>
        </div>

        {/* Donate button */}
        {isOwn ? (
          <div
            className="mt-1 w-full py-3 rounded-xl font-roboto font-bold text-sm text-gray-400
                       bg-[#0a0a1a] border border-gray-800/50 text-center cursor-not-allowed"
            title="You can't donate to your own campaign"
          >
            Your campaign
          </div>
        ) : (
          <button
            onClick={() => onDonate(campaign)}
            className="mt-1 w-full py-3 rounded-xl font-roboto font-bold text-sm text-black
                       bg-gradient-to-r from-[#0A36F7] to-[#91F2F9]
                       shadow-[0_0_15px_rgba(145,242,249,0.3)]
                       hover:shadow-[0_0_25px_rgba(145,242,249,0.6)]
                       active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Donate
          </button>
        )}
      </div>
    </div>
  );
}

// ── Donate Modal ──────────────────────────────────────────────────
function DonateModal({ campaign, onClose, onSuccess }) {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const { donate, loading, error, isConnected } = useCrowdfund();

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  async function handleConfirm() {
    if (!finalAmount || finalAmount <= 0) {
      toast.error("Please select or enter a valid amount");
      return;
    }
    if (!isConnected) {
      toast.error("Please connect your Solana wallet first");
      return;
    }

    const result = await donate(campaign.id, finalAmount);

    if (result.success) {
      toast.success(
        `You successfully donated $${finalAmount} USDT to "${campaign.name}"!`
      );
      onSuccess(campaign.id);
      onClose();
    } else {
      toast.error(result.error || "Transaction failed. Please try again.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(1,4,21,0.85)", backdropFilter: "blur(8px)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md bg-[#010415] border border-gray-800/50 rounded-2xl p-6 shadow-[0_0_60px_rgba(10,54,247,0.15)]">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-xl leading-none"
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-6">
          <p className="text-[#91F2F9] text-xs font-mono mb-1">
            #{String(campaign.id).slice(0, 8)}
          </p>
          <h3 className="font-roboto font-bold text-white text-lg leading-tight">
            Donate to {campaign.name}
          </h3>
        </div>

        {/* Suggested amounts */}
        <div className="mb-4">
          <p className="text-gray-400 text-xs font-sora mb-3">Select amount (USDT)</p>
          <div className="grid grid-cols-5 gap-2">
            {SUGGESTED_AMOUNTS.map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount("");
                }}
                className={`py-2.5 rounded-xl text-sm font-roboto font-bold transition-all duration-200 cursor-pointer
                  ${selectedAmount === amount && !customAmount
                    ? "bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black shadow-[0_0_15px_rgba(145,242,249,0.4)]"
                    : "bg-[#0a0a1a] border border-gray-800/50 text-gray-300 hover:border-[#91F2F9]/40 hover:text-white"
                  }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>

        {/* Custom amount */}
        <div className="mb-6">
          <p className="text-gray-400 text-xs font-sora mb-2">Or enter custom amount</p>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-roboto font-bold">
              $
            </span>
            <input
              type="number"
              min="1"
              placeholder="0.00"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }}
              className="w-full bg-[#0a0a1a] border border-gray-800/50 rounded-xl pl-8 pr-4 py-3
                         text-white font-roboto text-sm placeholder-gray-600
                         focus:outline-none focus:border-[#91F2F9]/50 focus:shadow-[0_0_15px_rgba(145,242,249,0.1)]
                         transition-all duration-200"
            />
          </div>
        </div>

        {/* Summary */}
        {finalAmount > 0 && (
          <div className="mb-4 p-3 bg-[#0a0a1a] rounded-xl border border-gray-800/30">
            <div className="flex justify-between text-xs font-sora text-gray-400 mb-1">
              <span>Donation amount</span>
              <span className="text-white">${finalAmount} USDT</span>
            </div>
            <div className="flex justify-between text-xs font-sora text-gray-400 mb-1">
              <span>Platform fee (2%)</span>
              <span className="text-gray-500">-${(finalAmount * 0.02).toFixed(2)} USDT</span>
            </div>
            <div className="h-px bg-gray-800/50 my-2" />
            <div className="flex justify-between text-xs font-sora">
              <span className="text-gray-400">Campaign receives</span>
              <span className="text-[#91F2F9] font-medium">${(finalAmount * 0.98).toFixed(2)} USDT</span>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-red-400 text-xs font-sora mb-4">{error}</p>
        )}

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={loading || !finalAmount || finalAmount <= 0}
          className="w-full py-4 rounded-xl font-roboto font-extrabold text-base text-black
                     bg-gradient-to-r from-[#0A36F7] to-[#91F2F9]
                     shadow-[0_0_20px_rgba(145,242,249,0.4)]
                     hover:shadow-[0_0_35px_rgba(145,242,249,0.7)]
                     disabled:opacity-50 disabled:cursor-not-allowed
                     active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          {loading ? "Processing..." : `Confirm Donation${finalAmount ? ` · $${finalAmount}` : ""}`}
        </button>

        <p className="text-center text-gray-600 text-[10px] font-sora mt-3">
          Two wallet confirmations required · Powered by Solana
        </p>
      </div>
    </div>
  );
}

// ── Active Campaigns List (shared by public + dashboard pages) ─────
export default function ActiveCampaignsList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();

  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  const loadCampaigns = useCallback(async () => {
    try {
      setIsLoading(true);

      const { data } = await api.getPublicCampaigns({ limit: 20, offset: 0 });
      setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
    } catch (error) {
      console.error("Failed to load campaigns:", error);
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCampaigns();
  }, [loadCampaigns]);

  // True when the current user owns the campaign.
  const isOwnCampaign = (campaign) =>
    Boolean(user && campaign.user_id && campaign.user_id === user.id);

  // Donating requires an account. Visitors who aren't logged in are sent to
  // the login page (and returned here afterwards). You also can't donate to
  // a campaign you own.
  function handleDonate(campaign) {
    if (!user) {
      toast.error("Please log in to donate");
      navigate("/login", { state: { from: location } });
      return;
    }
    if (isOwnCampaign(campaign)) {
      toast.error("You can't donate to your own campaign");
      return;
    }
    setSelectedCampaign(campaign);
  }

  // After a successful donation refresh campaigns from Supabase
  async function handleDonationSuccess() {
    await loadCampaigns();
  }

  return (
    <>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-[#010410] border border-gray-800/40 rounded-2xl h-80 animate-pulse"
            />
          ))}
        </div>
      ) : campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-5xl mb-4"></div>
          <h3 className="font-roboto font-semibold text-white text-lg mb-2">
            No active campaigns yet
          </h3>
          <p className="font-sora text-gray-500 text-sm max-w-xs">
            Check back soon, new campaigns are reviewed and approved daily.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onDonate={handleDonate}
              isOwn={isOwnCampaign(campaign)}
            />
          ))}
        </div>
      )}

      {/* Donate modal */}
      {selectedCampaign && (
        <DonateModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
          onSuccess={handleDonationSuccess}
        />
      )}
    </>
  );
}
