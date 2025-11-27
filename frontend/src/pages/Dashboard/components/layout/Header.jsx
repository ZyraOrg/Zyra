import MegaphoneIcon from '../../../../assets/Megaphone2.svg?react';

export default function Header() {
  return (
    <header className="h-16 sm:h-20 bg-[#010410]/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between h-full px-4 sm:px-8">
        <div className="ml-12 lg:ml-0">
          <h1 className="text-xl font-bold sm:text-2xl">
            Hi, Welcome User
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="px-3 sm:px-6 py-2 sm:py-2.5 w-[213px] bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] text-black text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
            <MegaphoneIcon className="w-4 h-4 [&_path]:fill-black " />
            Create campaign
          </button>

          <button className="hidden sm:block px-6 py-2.5 w-[213px] bg-[#13131A] text-white text-sm font-semibold rounded-lg border-2 border-gradient-to-r from-[#91F2F9] to-[#0A36F7] transition-colors hover:bg-black-700">
            Connect wallet
          </button>
        </div>
      </div>
    </header>
  );
}