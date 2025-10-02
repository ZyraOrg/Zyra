import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import MulticulturalImg from "../../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  // Dark Mode handler
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Gradient button style (reusable for links)
  const buttonClasses =
    "px-8 py-3 rounded-full text-black font-roboto font-extrabold text-lg " +
    "shadow-[0_0_20px_rgba(145,242,249,0.6)] " +
    "transition-all duration-300 " +
    "bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] " +
    "hover:shadow-[0_0_30px_rgba(145,242,249,0.8)]";

  return (
    <nav
      className={`fixed left-0 z-50 flex items-center w-full px-8 py-2 transition-all duration-300 ${
        scrolled ? "top-0 md:bg-black/40" : "top-10"
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
              className="text-white font-roboto font-semibold relative pb-2 hover:text-[#91F2F9] transition-colors duration-300 
                after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Dark Mode Toggle - Desktop (right side) */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="hidden p-2 ml-6 transition border border-gray-400 rounded-full md:flex dark:border-gray-200 bg-white/20 dark:bg-black/30 backdrop-blur-sm hover:scale-105"
      >
        {darkMode ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-900"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21.64 13.64A9 9 0 1110.36 2.36a7 7 0 1011.28 11.28z" />
          </svg>
        )}
      </button>

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
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={toggleMobileMenu}
            />

            {/* Menu content */}
            <div className="fixed top-0 right-0 z-50 flex flex-col items-center justify-start w-64 h-full pt-10 space-y-8 border border-transparent/40 bg-black/40 backdrop-blur-xl">
              {/* Dark Mode Toggle - Mobile (top right) */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="self-end p-2 mb-6 mr-6 transition border border-gray-400 rounded-full dark:border-gray-200 bg-white/20 dark:bg-black/30 backdrop-blur-sm hover:scale-105"
              >
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-100"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64 13.64A9 9 0 1110.36 2.36a7 7 0 1011.28 11.28z" />
                  </svg>
                )}
              </button>

              {/* Navlinks as buttons */}
              {["Home", "Campaigns", "Create", "About"].map((item, i) => (
                <a
                  key={i}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className={buttonClasses}
                  data-aos="slide-left"
                  data-aos-duration="500"
                  data-aos-delay={100 + i * 100}
                >
                  {item}
                </a>
              ))}

              {/* Lite Paper button */}
              <a
                href="/Zyra-Litepaper-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonClasses}
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
