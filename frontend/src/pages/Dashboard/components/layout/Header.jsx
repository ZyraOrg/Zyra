import { Menu } from 'lucide-react';
import MegaphoneIcon from '../../../../assets/Megaphone2.svg?react';

export default function Header({ setIsMobileMenuOpen }) {
  return (
    <header className="h-auto py-3 sm:h-20 sm:py-0 bg-[#010410]/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="h-full px-4 sm:px-8 
                      flex flex-col sm:flex-row 
                      items-start sm:items-center justify-start sm:justify-between 
                      gap-2 sm:gap-0">

        {/* Hamburger Menu + Greeting */}
        <div className="flex items-center gap-2 sm:gap-0 ml-0 sm:ml-12 lg:ml-0 mb-0 sm:mb-0">
          {/* Mobile Hamburger Menu - Hidden on desktop */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 hover:bg-[#13131A] rounded-lg transition-colors"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>

          <h1 className="text-base font-bold sm:text-2xl">
            Hi, Welcome User
          </h1>
        </div>

        {/* Buttons container */}
        <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <button className="px-2.5 sm:px-6 py-1.5 sm:py-2.5 flex-1 sm:flex-none sm:w-[213px] 
                             bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] 
                             text-black text-[11px] sm:text-sm font-semibold 
                             rounded-md sm:rounded-lg transition-colors flex items-center justify-center gap-1.5 sm:gap-2">
            <MegaphoneIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 [&_path]:fill-black" />
            <span className="whitespace-nowrap">Create campaign</span>
          </button>

          <button className="flex sm:block px-2.5 sm:px-6 py-1.5 sm:py-2.5 flex-1 sm:flex-none sm:w-[213px] 
                             bg-[#13131A] text-white text-[11px] sm:text-sm font-semibold 
                             rounded-md sm:rounded-lg border sm:border-2 border-[#0A36F7]
                             items-center justify-center">
            <span className="whitespace-nowrap">Connect wallet</span>
          </button>
        </div>
      </div>
    </header>
  );
}