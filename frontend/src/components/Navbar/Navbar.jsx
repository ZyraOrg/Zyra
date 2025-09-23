import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full flex justify-center fixed top-10 left-0 z-50 py-2">
      {/* Navigation links */}
      <ul className="flex gap-10 items-center">
        <li>
          <a
            href="#home"
            className="text-white font-roboto font-semibold relative pb-2 hover:text-[#91F2F9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#explore"
            className="text-white font-roboto font-semibold relative pb-2 hover:text-[#91F2F9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
          >
            Campaigns
          </a>
        </li>
        <li>
          <a
            href="#how-it-works"
            className="text-white font-roboto font-semibold relative pb-2 hover:text-[#91F2F9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
          >
            Create
          </a>
        </li>
        <li>
          <a
            href="#why-choose"
            className="text-white font-roboto font-semibold relative pb-2 hover:text-[#91F2F9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
          >
            About
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;