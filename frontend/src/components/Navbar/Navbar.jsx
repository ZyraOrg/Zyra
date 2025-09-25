import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Navbar = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS, animate once
  }, []);

  return (
    <nav className="fixed left-0 z-50 flex justify-center w-full py-2 top-10">
      <ul className="flex items-center gap-10">
        <li data-aos="fade-down" data-aos-delay="0">
          <a
            href="#home"
            className="text-white font-roboto font-semibold relative pb-2 hover:text-[#91F2F9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </a>
        </li>
        <li data-aos="fade-down" data-aos-delay="200">
          <a
            href="#explore"
            className="text-white font-roboto font-semibold relative pb-2 hover:text-[#91F2F9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
          >
            Campaigns
          </a>
        </li>
        <li data-aos="fade-down" data-aos-delay="400">
          <a
            href="#how-it-works"
            className="text-white font-roboto font-semibold relative pb-2 hover:text-[#91F2F9] transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
          >
            Create
          </a>
        </li>
        <li data-aos="fade-down" data-aos-delay="600">
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