import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import MobileMenu from './components/layout/MobileMenu';
import Header from './components/layout/Header';
import StatsCards from './components/dashboard/StatsCards';
import DonationChart from './components/dashboard/DonationChart';
import CampaignsTable from './components/layout/CampaignsTable';
import TransactionsList from './components/dashboard/TransactionsList';

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="flex min-h-screen bg-[#010415] text-white">
      {/* Desktop Sidebar - Always visible on lg+ */}
      <Sidebar />

      {/* Mobile Menu - Only toggles on mobile/tablet */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />
        
        <main className="p-4 sm:p-6 lg:p-8">
          <StatsCards />

          <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3 sm:gap-6 sm:mt-6">
            <DonationChart />
            <CampaignsTable />
          </div>

          <TransactionsList />
        </main>
      </div>
    </div>
  );
}