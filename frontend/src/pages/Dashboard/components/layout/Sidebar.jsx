import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { navItems } from '../../constants/dashboardData';
import Logo from '../../../../assets/logo.png';
import supabase from '../../../../lib/supabaseClient';

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const navigate = useNavigate();

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

  return (
    <aside className="hidden lg:flex w-64 h-screen bg-[#010410] fixed left-0 top-0 flex-col z-20">
      {/* Logo */}
      <div className="flex items-center h-20 px-4">
        <img src={Logo} alt="ZYRA Logo" className="w-auto h-40 -ml-8" />
      </div>

      {/* User Profile */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <span className="text-sm font-semibold text-white">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">User</p>
            <p className="text-xs text-gray-400 truncate">My Account</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.filter(item => item.label !== 'Settings').map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                isActive 
                  ? 'bg-[#13131A] text-white' 
                  : 'text-gray-400 hover:bg-[#13131A]'
              }`}
            >
              <Icon className="flex-shrink-0 w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="px-4 pb-4 space-y-2">
        {navItems.filter(item => item.label === 'Settings').map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                isActive 
                  ? 'bg-[#13131A] text-white' 
                  : 'text-gray-400 hover:bg-[#13131A]'
              }`}
            >
              <Icon className="flex-shrink-0 w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
        
        <button 
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 text-gray-400 transition-colors rounded-lg hover:bg-[#13131A]"
        >
          <LogOut className="flex-shrink-0 w-5 h-5" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
}