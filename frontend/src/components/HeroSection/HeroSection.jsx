import React, { useEffect, useState } from "react"; 
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight } from "lucide-react";
import ShieldImg from "../../assets/SHIELDw.svg";
import Shielding2 from "../../assets/Bottomimg.svg";
import MobileHero from "../../assets/MobileHero.png";

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center text-center bg-[#01060E] pt-16">
      {/* Hero Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center max-w-screen-xl px-6 mx-auto md:px-16"
        data-aos="fade-up"
      >
        {/* Heading */}
        <h1 className="text-3xl font-bold leading-tight text-white md:text-6xl">
          Empowering Trust, <br />
          <span className="text-[#4960FA]">Securing Tomorrow</span>
        </h1>

        {/* Subtext */}
        <p className="max-w-2xl mt-6 text-base text-gray-400 md:text-lg">
          Zyra provides cutting-edge solutions designed to protect your digital
          world with advanced security and seamless user experience.
        </p>

        {/* CTA Button */}
        <button className="mt-8 px-6 py-3 rounded-xl bg-[#4960FA] text-white flex items-center gap-2 hover:bg-[#3a4ed5] transition-all">
          Get Started <ArrowUpRight size={20} />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative flex justify-center w-full mt-12" data-aos="zoom-in">
        {isMobile ? (
          <img src={MobileHero} alt="MobileHero" className="w-full max-w-md" />
        ) : (
          <div className="relative">
            <img src={ShieldImg} alt="Hero Shield" className="w-[700px]" />
            <img
              src={Shielding2}
              alt="Bottom Shield"
              className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 w-[400px] opacity-80"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
