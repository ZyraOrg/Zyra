import Navbar from "../../components/Navbar/Navbar";
import ActiveCampaignsList from "./ActiveCampaignsList";

// ── Public "Active Campaigns" page (reached from the landing page) ─
export default function PublicCampaigns() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#010415] text-white pt-24 pb-16 px-6 md:px-16">
        {/* Page header */}
        <div className="max-w-6xl mx-auto mb-10">
          <h1 className="font-roboto font-bold text-3xl md:text-4xl text-white mb-3">
            Active Campaigns
          </h1>
          <p className="font-sora text-gray-400 text-base max-w-xl">
            Every donation is traced on-chain. Pick a campaign and make a
            difference today.
          </p>
        </div>

        {/* Campaigns grid */}
        <div className="max-w-6xl mx-auto">
          <ActiveCampaignsList />
        </div>
      </div>
    </>
  );
}
