import StatsCards from './components/dashboard/StatsCards';
import DonationChart from './components/dashboard/DonationChart';
import CampaignsTable from './components/layout/CampaignsTable';
import TransactionsList from './components/dashboard/TransactionsList';

export default function DashboardHome() {
  return (
    <>
      <StatsCards />
      
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3 sm:gap-6 sm:mt-6">
        <DonationChart />
        <CampaignsTable />
      </div>

      <TransactionsList />
    </>
  );
}