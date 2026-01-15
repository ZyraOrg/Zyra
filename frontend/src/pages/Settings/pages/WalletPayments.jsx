import { useState, useEffect } from "react";
import toast from "react-hot-toast";
// import LoadingSpinner from "../../../components/LoadingSpinner";

export default function WalletPayments() {
  const [walletAddress, setWalletAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  const checkWalletConnection = async () => {
    // setIsLoadingData(true);
    try {
      if (typeof window.ethereum !== "undefined") {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });

        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setIsConnected(true);
          await getNetwork();
        }
      }
    } catch (err) {
      console.error("Error checking wallet connection:", err);
    } finally {
      // setIsLoadingData(false);
    }
  };

  const getNetwork = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        const chainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        const networkNames = {
          "0x1": "Ethereum",
          "0x89": "Polygon",
          "0xa": "Optimism",
          "0xa4b1": "Arbitrum",
        };

        setNetwork(networkNames[chainId] || "Unknown Network");
      }
    } catch (err) {
      console.error("Error getting network:", err);
    }
  };

  const formatWalletAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...........${address.slice(-3)}`;
  };

  const handleConnectWallet = async () => {
    setLoading(true);
    try {
      if (typeof window.ethereum === "undefined") {
        toast.error("Please install MetaMask or another Web3 wallet");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        await getNetwork();
        toast.success("Wallet connected successfully");
      }
    } catch (err) {
      console.error("Error connecting wallet:", err);
      toast.error(err?.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnectWallet = () => {
    setWalletAddress("");
    setNetwork("");
    setIsConnected(false);
    toast.success("Wallet disconnected");
  };

  // if (isLoadingData) {
  //   return <LoadingSpinner message="Checking wallet connection..." />;
  // }

  return (
    <div>
      <h1 className="text-lg md:text-2xl font-bold mb-6 p-4 md:p-6 bg-[#010410] rounded-sm">
        Wallet & <span className="text-secondary">payments</span>
      </h1>

      <div className="space-y-1 text-sm md:text-base">
        {/* Connected Wallet */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Connected Wallet</span>
          <span className="text-gray-400">
            {isConnected
              ? formatWalletAddress(walletAddress)
              : "No wallet connected"}
          </span>
        </div>

        {/* Network */}
        <div className="flex items-center justify-between p-4 md:p-6 bg-[#010410] rounded-sm">
          <span className="text-white font-semibold">Network</span>
          <span className="text-gray-400">{isConnected ? network : "N/A"}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex justify-center gap-4">
        <button
          onClick={handleConnectWallet}
          disabled={loading || isConnected}
          className="px-15 py-[1px] bg-gradient-to-r from-primary to-secondary text-black rounded-sm shadow-md shadow-primary hover:opacity-90 transition-opacity font-semibold text-sm border-2 border-white hover:border-secondary disabled:opacity-50"
        >
          {loading ? "Connecting..." : "Connect new wallet"}
        </button>

        {isConnected && (
          <button
            onClick={handleDisconnectWallet}
            className="px-8 py-3 bg-transparent border-2 border-secondary text-secondary rounded-sm font-semibold hover:bg-secondary hover:text-black transition-all"
          >
            Disconnect wallet
          </button>
        )}
      </div>
    </div>
  );
}
