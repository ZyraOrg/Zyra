import toast from "react-hot-toast";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useChainId, useDisconnect } from "wagmi";

const NETWORK_NAMES = {
  1: "Ethereum",
  137: "Polygon",
  10: "Optimism",
  42161: "Arbitrum",
  8453: "Base",
  56: "BNB Smart Chain",
  43114: "Avalanche",
  100: "Gnosis",
  59144: "Linea",
  534352: "Scroll",
  324: "zkSync Era",
  5000: "Mantle",
  42220: "Celo",
  250: "Fantom",
  81457: "Blast",
};

function formatWalletAddress(address) {
  if (!address) return "";
  return `${address.slice(0, 6)}...........${address.slice(-3)}`;
}

export default function WalletPayments() {
  const { open } = useAppKit();
  const { address, isConnected, status } = useAccount();
  const chainId = useChainId();
  const { disconnect } = useDisconnect();

  const isConnecting = status === "connecting" || status === "reconnecting";
  const network = isConnected
    ? NETWORK_NAMES[chainId] || "Unknown Network"
    : "N/A";

  const handleDisconnect = () => {
    disconnect();
    toast.success("Wallet disconnected");
  };

  return (
    <div>
      <h1 className="text-lg md:text-2xl font-bold mb-6 p-4 md:p-6 bg-[#010410] rounded-sm">
        Wallet & <span className="text-secondary">payments</span>
      </h1>

      <div className="space-y-1 text-sm md:text-base">
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Connected Wallet</span>
          <span className="text-gray-400">
            {isConnected
              ? formatWalletAddress(address)
              : "No wallet connected"}
          </span>
        </div>

        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Network</span>
          <span className="text-gray-400">{network}</span>
        </div>
      </div>

      <div className="mt-12 flex justify-center gap-4">
        {isConnected ? (
          <button
            onClick={handleDisconnect}
            className="px-8 py-3 bg-transparent border-2 border-secondary text-secondary rounded-sm font-semibold hover:bg-secondary hover:text-black transition-all"
          >
            Disconnect wallet
          </button>
        ) : (
          <button
            onClick={() => open()}
            disabled={isConnecting}
            className="px-15 py-[1px] bg-gradient-to-r from-primary to-secondary text-black rounded-sm shadow-md shadow-primary hover:opacity-90 transition-opacity font-semibold text-sm border-2 border-white hover:border-secondary disabled:opacity-50"
          >
            {isConnecting ? "Connecting..." : "Connect new wallet"}
          </button>
        )}
      </div>
    </div>
  );
}
