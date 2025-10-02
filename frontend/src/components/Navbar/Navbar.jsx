import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MulticulturalImg from "../../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 0);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

 
  const buttonClasses =
    "px-8 py-3 rounded-full text-black font-roboto font-extrabold text-lg " +
    "shadow-[0_0_20px_rgba(145,242,249,0.6)] " +
    "transition-all duration-300 " +
    "bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] " +
    "hover:shadow-[0_0_30px_rgba(145,242,249,0.8)]";

  return (
    <nav
      className={`fixed left-0 z-50 flex items-center w-full px-8 py-3 transition-all duration-300 ${
        scrolled ? "top-0 bg-[#071555]" : "top-10 bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="absolute max-[800px]:-left-6 left-2">
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
              className="text-white font-roboto font-semibold relative py-3 px-1 hover:text-[#91F2F9] transition-colors duration-300 
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <div className="relative z-50 ml-auto md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="relative flex flex-col justify-between w-8 h-6"
          data-aos="fade-down"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`w-full h-0.5 bg-white transition-all duration-300 ${
              isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
            }`}
          ></span>
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Background overlay */}
            <div
              className="fixed inset-0 z-40 backdrop-blur-md bg-blue-950/20"
              onClick={toggleMobileMenu}
            />

            {/* Menu content */}
            <div className="fixed top-0 right-0 z-50 flex flex-col items-center justify-start w-64 h-full pt-10 space-y-8 border border-white/10 bg-white/10 backdrop-blur-2xl">
              {/* Navlinks */}
              {["Home", "Campaigns", "Create", "About"].map((item, i) => (
                <a
                  key={i}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className={`${buttonClasses} py-4`} // 🔹 extra top/bottom padding
                  data-aos="slide-left"
                  data-aos-duration="500"
                  data-aos-delay={100 + i * 100}
                >
                  {item}
                </a>
              ))}

              {/* Lite Paper */}
              <a
                href="/Zyra-Litepaper-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClasses} py-4`} // 🔹 extra padding too
                data-aos="slide-left"
                data-aos-duration="500"
                data-aos-delay="600"
              >
                Lite Paper
              </a>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
