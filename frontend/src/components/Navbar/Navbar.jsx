import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MulticulturalImg from "../../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed left-0 z-50 flex items-center w-full px-8 py-2 transition-transform duration-300 top-10">
      {/* Logo*/}
      <div className="absolute left-2">
        <img 
          src={MulticulturalImg} 
          alt="Zyra Logo" 
          className="object-contain h-40 cursor-pointer w-50"
          data-aos="fade-down"
        />
      </div>

      {/* Desktop Navbar */}
      <ul className="items-center hidden gap-10 mx-auto md:flex">
        {["Home", "Campaigns", "Create", "About"].map((item, i) => (
          <li key={i} data-aos="fade-down" data-aos-delay={i * 200}>
            <a
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-white font-roboto font-semibold relative pb-2 hover:text-[#91F2F9] transition-colors duration-300 
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      
      <div className="ml-auto md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="relative z-50 flex flex-col justify-between w-8 h-6"
        >
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''
          }`}></span>
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? 'opacity-0' : ''
          }`}></span>
          <span className={`w-full h-0.5 bg-white transition-all duration-300 ${
            isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''
          }`}></span>
        </button>

       
        {isMobileMenuOpen && (
          <>
           
            <div 
              className="fixed inset-0 z-40 bg-oacity-50 bg-wh backdrop-blur-sm"
              onClick={toggleMobileMenu}
            ></div>

          
            <ul className="fixed top-0 right-0 z-50 flex flex-col items-center justify-center w-64 h-full space-y-8 border border-white/40 bg-black/40 backdrop-blur-xl">
              {["Home", "Campaigns", "Create", "About"].map((item, i) => (
                <li key={i} data-aos="fade-left" data-aos-delay={i * 100}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-white font-roboto font-semibold text-lg hover:text-[#91F2F9] transition-colors duration-300"
                    onClick={toggleMobileMenu}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
