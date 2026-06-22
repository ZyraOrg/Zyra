import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import MobileMenu from "./components/layout/MobileMenu";
import Header from "./components/layout/Header";
import ActiveCampaignsList from "../Campaigns/ActiveCampaignsList";

// ── Dashboard "Active Campaigns" page ─────────────────────────────
// Same look as the public page, wrapped in the dashboard layout.
export default function ActiveCampaigns() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#010415] text-white">
      <Sidebar />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 lg:ml-64">
        <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="p-4 sm:p-6 lg:p-8">
          {/* Page header */}
          <div className="mb-10">
            <h1 className="font-roboto font-bold text-2xl md:text-4xl text-white mb-3">
              Active Campaigns
            </h1>
            <p className="font-sora text-gray-400 text-base max-w-xl">
              Every donation is traced on-chain. Pick a campaign and make a
              difference today.
            </p>
          </div>

          {/* Campaigns grid */}
          <ActiveCampaignsList />
        </main>
      </div>
    </div>
  );
}
