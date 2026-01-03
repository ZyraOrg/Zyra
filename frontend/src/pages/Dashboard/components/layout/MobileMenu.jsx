import { X, LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { navItems } from '../../constants/dashboardData';
import Logo from '../../../../assets/logo.png';
import supabase from '../../../../lib/supabaseClient';
import api from '../../../../services/api';

export default function MobileMenu({ isOpen, onClose, activeItem, setActiveItem }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('User');

  useEffect(() => {
    let cancelled = false;
    async function loadUser() {
      try {
        const { data } = await api.getUser();
        const name = data?.user?.name || data?.user?.username || data?.user?.email;
        if (!cancelled && name) setUsername(name);
      } catch {
        // ignore
      }
    }
    if (isOpen) loadUser();
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Logged out successfully');
      navigate('/login', { replace: true });
    } catch (err) {
      console.error('Logout error:', err);
      toast.error(err?.message || 'Failed to log out');
    }
  };

  const handleNavClick = (item) => {
    setActiveItem(item.label);
    onClose();
    if (item.label === 'Dashboard') navigate('/dashboard');
    if (item.label === 'Profile') navigate('/dashboard/profile');
    if (item.label === 'Campaigns') navigate('/dashboard/campaigns');
  };

  return (
    <div className="lg:hidden">
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu Drawer */}
      <aside 
        className={`fixed top-0 left-0 h-full w-72 bg-[#010410] z-50
                    flex flex-col transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Menu Header with Logo & Close Button */}
        <div className="flex items-center justify-between h-20 px-4 border-b border-gray-800">
          <img src={Logo} alt="ZYRA Logo" className="w-auto h-40 -ml-8" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#13131A] rounded-lg transition-colors"
            aria-label="Close mobile menu"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* User Profile */}
        <div className="px-4 py-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
              <span className="text-sm font-semibold text-white">U</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-white">{username}</p>
              <p className="text-xs text-gray-400 truncate">My Account</p>
            </div>
          </div>
        </div>

        {/* Navigation - All items including Settings */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                  isActive 
                    ? 'bg-[#13131A] text-white' 
                    : 'text-gray-400 hover:bg-[#13131A] hover:text-white'
                }`}
              >
                <Icon className="flex-shrink-0 w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Only */}
        <div className="px-4 pb-6 border-t border-gray-800 pt-4">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full gap-3 px-4 py-3 text-red-400 transition-colors rounded-lg hover:bg-[#13131A] hover:text-red-300"
          >
            <LogOut className="flex-shrink-0 w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </aside>
    </div>
  );
}