import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiHome } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RiMenu3Fill } from "react-icons/ri";
import { MdCampaign } from "react-icons/md";
import { FaPlus, FaInfoCircle } from "react-icons/fa";
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

  // 👇 Smooth scroll to section
  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 👇 Smooth scroll to top when "Home" is clicked
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Desktop button classes (kept for potential future use)
  // const buttonClasses =
  //   "px-8 py-3 rounded-full text-black font-roboto font-extrabold text-lg " +
  //   "shadow-[0_0_20px_rgba(145,242,249,0.6)] " +
  //   "transition-all duration-300 " +
  //   "bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] " +
  //   "hover:shadow-[0_0_30px_rgba(145,242,249,0.8)]";

  return (
    <nav
      className={`fixed left-0 z-50 flex items-center w-full px-8 py-3 transition-all duration-300 ${
        scrolled ? "top-0 bg-[#0b1b63]" : "top-10 bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="absolute max-[800px]:-left-6 left-2">
        <img
          src={MulticulturalImg}
          alt="Zyra Logo"
          className="object-contain h-40 cursor-pointer w-50"
          data-aos="fade-down"
          onClick={handleScrollToTop}
        />
      </div>

      {/* Desktop Navbar */}
      <ul className="items-center hidden gap-10 mx-auto md:flex">
        {[
          { name: "Home", id: "home" },
          { name: "Campaigns", id: "explore" },
          { name: "Create", id: "create" },
          { name: "About", id: "about" }
        ].map((item, i) => (
          <li key={i} data-aos="fade-down" data-aos-delay={i * 200}>
            {item.name === "Home" ? (
              <a
                href={`#${item.id}`}
                onClick={handleScrollToTop}
                className="text-white font-roboto font-semibold relative py-3 px-1 hover:text-[#91F2F9] transition-colors duration-300 
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            ) : (
              <a
                href={`#${item.id}`}
                onClick={(e) => handleSmoothScroll(e, item.id)}
                className="text-white font-roboto font-semibold relative py-3 px-1 hover:text-[#91F2F9] transition-colors duration-300 
                  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#91F2F9] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Hamburger */}
      <div className="relative z-50 ml-auto md:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-white transition-colors duration-300 hover:text-[#91F2F9]"
          data-aos="fade-down"
          data-aos-duration="800"
          data-aos-delay="400"
        >
          {isMobileMenuOpen ? (
            <IoClose className="w-8 h-8" />
          ) : (
            <RiMenu3Fill className="w-8 h-8" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={toggleMobileMenu}
            />
            <div className="fixed top-0 right-0 z-50 flex flex-col items-start justify-start w-40 h-full pt-20 px-4 space-y-8 bg-[#051041]">
              {[
                { name: "Home", icon: HiHome, id: "home" },
                { name: "Campaigns", icon: MdCampaign, id: "explore" },
                { name: "Create", icon: FaPlus, id: "create" },
                { name: "About", icon: FaInfoCircle, id: "about" }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={`#${item.id}`}
                    onClick={
                      item.name === "Home"
                        ? (e) => {
                            handleScrollToTop(e);
                            toggleMobileMenu();
                          }
                        : (e) => {
                            handleSmoothScroll(e, item.id);
                            toggleMobileMenu();
                          }
                    }
                    className="text-white font-roboto font-semibold text-base hover:text-[#91F2F9] transition-colors duration-300 w-full text-left flex items-center gap-3"
                    data-aos="slide-left"
                    data-aos-duration="500"
                    data-aos-delay={100 + i * 100}
                  >
                    <Icon className="w-5 h-5 text-[#91F2F9]" />
                    {item.name}
                  </a>
                );
              })}
              <a
                href="/Zyra-Litepaper-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-full text-black font-roboto font-bold text-sm shadow-[0_0_15px_rgba(145,242,249,0.5)] transition-all duration-300 bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] hover:shadow-[0_0_25px_rgba(145,242,249,0.7)] text-center w-full"
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