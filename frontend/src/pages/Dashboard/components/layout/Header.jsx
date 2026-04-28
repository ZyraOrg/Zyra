import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import MegaphoneIcon from "../../../../assets/Megaphone2.svg?react";
import api from "../../../../services/api";

function truncateAddress(address) {
  const str = String(address || "");
  if (!str) return "";
  if (str.length <= 12) return str;
  return `${str.slice(0, 6)}...${str.slice(-4)}`;
}

export default function Header({ setIsMobileMenuOpen }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [username, setUsername] = useState("User");
  const savingRef = useRef(false);

  const { data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: () => api.getProfile().then((r) => r.data),
    retry: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.getUser();
        const name = data?.user?.name || data?.user?.email;
        if (name) setUsername(name);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  // Sync the connected wallet to profile.receiving_wallet_address only when
  // it actually differs from what's stored on the server. Comparing against
  // saved state (rather than a per-mount ref) prevents the toast from firing
  // on every page navigation when wagmi auto-reconnects.
  useEffect(() => {
    if (!isConnected || !address) return;
    if (!profileData?.profile) return;
    if (savingRef.current) return;

    const saved = profileData.profile.receiving_wallet_address || "";
    if (saved.toLowerCase() === address.toLowerCase()) return;

    savingRef.current = true;
    api
      .saveProfile({ receiving_wallet_address: address })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast.success("Wallet connected");
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.error ||
          err?.message ||
          "Failed to save wallet address";
        toast.error(msg);
      })
      .finally(() => {
        savingRef.current = false;
      });
  }, [address, isConnected, profileData, queryClient]);

  return (
    <header className="h-auto py-3 sm:h-23 sm:py-0 bg-[#010410]/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex flex-col items-start justify-start h-full gap-2 px-4 sm:px-8 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        {/* Hamburger Menu + Greeting */}
        <div className="flex items-center gap-2 mb-0 ml-0 sm:gap-0 sm:ml-12 lg:ml-0 sm:mb-0">
          {/* Mobile Hamburger Menu - Hidden on desktop */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 hover:bg-[#13131A] rounded-lg transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          <h1 className="text-base font-bold sm:text-2xl">
            Hi, Welcome {username}
          </h1>
        </div>

        {/* Buttons container */}
        <div className="flex items-center w-full gap-2 sm:gap-4 sm:w-auto mt-2 md:mt-0">
          {isConnected && address ? (
            <div className="flex-1 sm:flex-none sm:w-[213px]">
              <div
                className="flex items-center justify-center gap-2 px-2.5 sm:px-6 py-1.5 sm:py-2.5
                   bg-[#13131A] text-white text-[11px] sm:text-sm font-semibold
                   rounded-md sm:rounded-lg border sm:border-2 border-[#0A36F7]"
                title={address}
              >
                <span className="whitespace-nowrap">
                  {truncateAddress(address)}
                </span>
                <button
                  type="button"
                  onClick={() => disconnect()}
                  className="p-1 rounded hover:bg-white/10 transition-colors"
                  aria-label="Disconnect wallet"
                  title="Disconnect"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => open()}
              className="flex sm:block px-2.5 sm:px-6 py-1.5 sm:py-2.5 flex-1 sm:flex-none sm:w-[213px]
                   bg-[#13131A] text-white text-[11px] sm:text-sm font-semibold
                   rounded-md sm:rounded-lg border sm:border-2 border-[#0A36F7]
                   items-center justify-center hover:bg-[#1a1a24] transition-colors"
            >
              <span className="whitespace-nowrap">Connect wallet</span>
            </button>
          )}

          {/* Create Campaign - Gradient with icon before text (NOW SECOND) */}
          <button
            type="button"
            onClick={() => navigate("/dashboard/create-campaign")}
            className="px-2.5 sm:px-6 py-1.5 sm:py-2.5 flex-1 sm:flex-none sm:w-[213px]
                   bg-gradient-to-r from-[#0A36F7] to-[#91F2F9]
                   text-black text-[11px] sm:text-sm font-semibold
                   rounded-md sm:rounded-lg transition-colors flex items-center justify-center gap-1.5 sm:gap-2
                   hover:opacity-90"
          >
            <MegaphoneIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 [&_path]:fill-black" />
            <span className="whitespace-nowrap">Create campaign</span>
          </button>
        </div>
      </div>
    </header>
  );
}
