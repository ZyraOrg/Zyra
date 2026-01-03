import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Sidebar from './components/layout/Sidebar';
import MobileMenu from './components/layout/MobileMenu';
import Header from './components/layout/Header';
import StatsCards from './components/dashboard/StatsCards';
import DonationChart from './components/dashboard/DonationChart';
import CampaignsTable from './components/layout/CampaignsTable';
import TransactionsList from './components/dashboard/TransactionsList';
import api from '../../services/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        await api.getUser();
        if (!cancelled) setIsCheckingAuth(false);
      } catch (err) {
        if (cancelled) return;
        const status = err?.response?.data ? err?.response?.status : undefined;
        // If backend responds 401/403, force user back to login.
        toast.error('Please log in to continue');
        navigate('/login', { replace: true });
      }
    }

    checkSession();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  if (isCheckingAuth) return null;

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