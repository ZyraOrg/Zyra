import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navItems } from '../../constants/dashboardData';
import Logo from '../../../../assets/logo.png';

export default function MobileMenu({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide Menu */}
      <div className={`fixed left-0 top-0 w-72 h-screen bg-[#010410] border-r border-gray-800 z-50 lg:hidden transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-sm font-bold">Z</span>
            </div>
            <span className="text-lg font-bold">ZYRA</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-[#13131A] rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="px-4 py-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-sm font-semibold">U</span>
            </div>
            <div>
              <p className="text-sm font-semibold">User</p>
              <p className="text-xs text-gray-400">My Account</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <button
                key={item.label}
                onClick={() => {
                  navigate(item.href);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                  isActive 
                    ? 'bg-[#13131A] text-white' 
                    : 'text-gray-400 hover:bg-[#13131A]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}