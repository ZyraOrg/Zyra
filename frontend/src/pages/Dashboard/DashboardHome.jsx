import { useState, useEffect } from 'react';
import StatsCards from './components/dashboard/StatsCards';
import DonationChart from './components/dashboard/DonationChart';
import CampaignsTable from './components/layout/CampaignsTable';
import TransactionsList from './components/dashboard/TransactionsList';
import api from '../../services/api';

export default function DashboardHome() {
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.getUser();
        const name = data?.user?.name || data?.user?.username || data?.user?.email;
        if (name) setUsername(name);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  
  return (
    <>
      {/* Mobile Welcome Text - ONLY SHOWS ON MOBILE */}
      <div className="mb-4 lg:hidden">
        <h1 className="text-lg font-semibold">
          Hi, <span className="bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] bg-clip-text text-transparent">{username}</span>
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