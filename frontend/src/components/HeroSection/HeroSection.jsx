import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight } from "lucide-react";
import ShieldImg from "../../assets/SHIELDw.svg";
import Shielding2 from "../../assets/Bottomimg.svg";
import MobileHero from "../../assets/MobileHero.png";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ once: true });

    // FIX mobile vh zooming issue caused by browser bars
    const setMobileVH = () => {
      if (window.innerWidth < 768) {
        // mobile only
        document.documentElement.style.setProperty(
          "--mobile-vh",
          `${window.innerHeight}px`
        );
      }
    };

    setMobileVH();
    window.addEventListener("resize", setMobileVH);

    return () => window.removeEventListener("resize", setMobileVH);
  }, []);

  return (
    <section
      className="relative flex flex-col items-center justify-between gap-8
             px-6 pt-20 md:pt-32 sm:px-8 md:px-16 
             text-white h-[85vh] md:h-[150vh] lg:flex-row
             pb-20 md:pb-0" // <-- Added this
      data-aos="fade-up"
    >
      {/* Mobile background */}
      <div
        className="absolute inset-0 bg-top bg-cover md:hidden"
        style={{ backgroundImage: `url(${MobileHero})` }}
      ></div>

      {/* Mobile Overlay */}
      <div className="absolute inset-0 bg-[rgba(2,1,1,0.55)] z-10 md:hidden"></div>

      {/* Left Content */}
      <div
        className="relative z-20 flex flex-col items-center w-full gap-6 mt-16 md:mt-0 md:w-1/2 md:items-start"
        data-aos="fade-down"
      >
        <h1
          className="font-roboto font-semibold text-center md:text-left
          text-[2.2rem] md:text-[3.75rem] lg:text-[4.5rem]
          leading-[1.3] md:leading-[1.1] scale-y-[0.98]"
          data-aos="fade-down"
          data-aos-delay="400"
        >
          RAISE VERIFIED <br />
          FUNDS WITH <br />
          <span className="text-[#91F2F9]">
            TRANSPARENCY <br /> & TRUST
          </span>
        </h1>

        <h2
          className="font-sora font-medium text-center md:text-left 
          max-w-[500px] text-[0.8rem] md:text-lg leading-[1.21] text-white"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          Every donation traceable on-chain, every beneficiary <br />
          verified. The future of crowdfunding is here
        </h2>
        {/* Buttons */}
        <div className="flex flex-col items-center gap-4 mt-0 sm:flex-row md:items-start">
          <button
            className="px-10 py-5 min-w-[220px] md:min-w-[200px] rounded-full 
            text-black font-roboto font-extrabold text-lg 
            shadow-[0_0_20px_rgba(145,242,249,0.6)]
            transition-all duration-300 
            bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] 
            hover:shadow-[0_0_30px_rgba(145,242,249,0.8)]"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-delay="400"
          >
            Start a Campaign
          </button>

          <button
            className="flex items-center justify-center gap-2
             w-[166px] h-[42px] md:w-[220px] md:h-[70px]  // desktop now same height as Start a Campaign
             rounded-full border-2 border-[#91F2F9] 
             font-roboto font-bold text-base md:text-lg 
             text-[#91F2F9] transition-all duration-300"
            data-aos="fade-left"
            data-aos-duration="900"
            data-aos-delay="500"
          >
            <span className="block md:hidden">Donate Now</span>
            <span className="items-center hidden gap-2 md:flex">
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
              Donate Now
            </span>
          </button>
        </div>
      </div>

      {/* Right Shield Image (desktop only) */}
      <div className="hidden md:block">
        <img
          src={ShieldImg}
          alt="Hero Illustration"
          className="absolute right-[-6%] top-[60%] 
                     -translate-y-1/2 z-10 object-contain w-[900px] pointer-events-none"
        />
      </div>

      {/* Verification Section */}
      <div
        className="absolute z-20 flex flex-col items-center md:items-start gap-4
             top-[98%] md:top-[90%] 
             left-1/2 md:left-16 -translate-x-1/2 md:translate-x-0 
             text-center md:text-left w-full px-6
             mb-20 md:mb-0" // <-- Added mobile-only bottom margin
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="700"
      >
        {/* Avatars */}
        <div
          className="relative h-20 mb-0 overflow-hidden rounded-full w-30"
          data-aos="zoom-in"
          data-aos-duration="700"
          data-aos-delay="800"
        >
          <img
            src={Shielding2}
            alt="Verified users"
            className="object-contain w-full h-full top-[40%] flex"
          />
        </div>

        {/* Badges */}
        <div className="flex flex-row justify-between w-full max-w-[320px] md:max-w-none md:justify-start md:gap-6 -mt-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#91F2F9] rounded-full"></span>
            <span className="text-xs font-light text-white md:text-sm font-sora">
              Blockchain Verified
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#91F2F9] rounded-full"></span>
            <span className="text-xs font-medium text-white md:text-sm font-sora">
              Smart Contract Protected
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
