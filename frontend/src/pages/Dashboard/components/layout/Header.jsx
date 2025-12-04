import { Menu } from 'lucide-react';
import MegaphoneIcon from '../../../../assets/Megaphone2.svg?react';

export default function Header({ setIsMobileMenuOpen }) {
  return (
    <header className="h-16 bg-[#010410] sticky top-0 z-10 border-b border-gray-800/50">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left: Mobile Menu + Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen?.(true)}
            className="lg:hidden p-2 hover:bg-[#13131A] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-xs font-bold">Z</span>
            </div>
            <span className="text-sm font-bold">ZYRA</span>
          </div>
          <h1 className="hidden lg:block text-xl font-bold">
            Hi, Welcome User
          </h1>
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          <button className="px-3 py-2 bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5">
            <MegaphoneIcon className="w-3.5 h-3.5 [&_path]:fill-black" />
            <span className="hidden sm:inline">Create campaign</span>
          </button>

          <button className="hidden sm:flex px-3 py-2 bg-[#13131A] text-white text-xs font-semibold rounded-lg border border-[#0A36F7]">
            Connect wallet
          </button>
        </div>
      </div>
    </header>
  );
}