import StatsCards from './components/dashboard/StatsCards';
import DonationChart from './components/dashboard/DonationChart';
import CampaignsTable from './components/layout/CampaignsTable';
import TransactionsList from './components/dashboard/TransactionsList';

export default function DashboardHome() {
  return (
    <>
      {/* Mobile Welcome Text - ONLY SHOWS ON MOBILE */}
      <div className="mb-4 lg:hidden">
        <h1 className="text-lg font-semibold">
          Hi, <span className="bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] bg-clip-text text-transparent">Welcome Visual X</span>
        </h1>
      </div>

      <StatsCards />
      
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3 sm:gap-6 sm:mt-6">
        <DonationChart />
        <CampaignsTable />
      </div>

      <TransactionsList />
    </>
  );
}