import { Menu, X } from 'lucide-react';
import { navItems } from '../../constants/dashboardData';

export default function MobileMenu({ isOpen, setIsOpen, activeItem, setActiveItem }) {
  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-[#13131A] rounded-lg border"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay & Menu */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-0 top-0 w-64 h-screen bg-[#0A0A0F] border-r border-[#1E1E2D] z-50 lg:hidden">
            <div className="flex items-center h-20 px-6 border-b ">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                  <span className="text-sm font-bold text-white">Z</span>
                </div>
                <span className="text-lg font-bold">ZYRA.</span>
              </div>
            </div>
            <nav className="px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setActiveItem(item.label);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                      activeItem === item.label 
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
      )}
    </>
  );
}