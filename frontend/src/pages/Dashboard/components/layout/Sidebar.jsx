import { useState } from 'react';
import { LogOut, ChevronLeft } from 'lucide-react';
import { navItems } from '../../constants/dashboardData';
import Logo from '../../../../assets/logo.png';
export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <aside 
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen bg-[#0A0A0F] border-r border-[#1E1E2D] fixed left-0 top-0 transition-all duration-300 flex-col z-20 hidden lg:flex`}
    >
      {/* Logo */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-[#1E1E2D]">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img src={Logo} alt="ZYRA Logo" className="h-50 w-50" />
            
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-[#13131A] rounded-lg transition-colors"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <ChevronLeft 
            className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* User Profile */}
      <div className="px-4 py-6 border-b border-[#1E1E2D]">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <span className="text-sm font-semibold text-white">VX</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Visual X</p>
              <p className="text-xs text-gray-400 truncate">Key Account</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
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
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-[#1E1E2D]">
        <button className="flex items-center w-full gap-3 px-4 py-3 text-red-400 transition-colors rounded-lg hover:bg-red-500/10">
          <LogOut className="flex-shrink-0 w-5 h-5" />
          {!isCollapsed && <span className="text-sm font-medium">Log out</span>}
        </button>
      </div>
    </aside>
  );
}