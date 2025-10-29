import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ShieldImg from "../../assets/SHIELDw.svg";
import Shielding2 from "../../assets/Bottomimg.svg";
import MobileHero from "../../assets/MobileHero.png";

const HeroSection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, offset: 50, duration: 700 });
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden text-white"
      data-aos="fade-up"
    >
      {isMobile && (
        <>
          <div
            className="absolute inset-0 z-0 bg-no-repeat bg-cover"
            style={{
              backgroundImage: `url(${MobileHero})`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="absolute inset-0 bg-[rgba(2,1,1,0.55)] z-10"></div>
        </>
      )}

      <div className="relative z-20 flex flex-col items-center justify-between w-full gap-6 px-6 pt-10 pb-0 sm:px-8 md:flex-row md:px-16 md:pt-32 md:pb-0 transform md:-translate-y-[10%]">
        <div
          className="flex flex-col items-center w-full gap-6 mt-5 text-center sm:mt-12 md:mt-0 md:w-1/2 md:items-start md:text-left"
          data-aos="fade-down"
        >
          <h1
            className="font-roboto font-semibold text-[2.2rem] leading-[1.3] md:text-[1.8rem] md:leading-[1.1] lg:text-[3rem] scale-y-[0.98] mt-35"
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
            className="font-sora font-medium max-w-[500px] text-[1rem] leading-[1.21] text-white md:text-lg"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Every donation traced, every beneficiary <br />
            verified. The future of crowdfunding is Zyra
          </h2>

          <div className="flex flex-col items-center gap-4 mt-0 sm:flex-row md:items-start">
            <button
              data-aos="slide-right"
              data-aos-duration="1000"
              className="px-10 py-5 min-w-[220px] rounded-full text-black font-roboto font-extrabold text-lg 
                         bg-gradient-to-r from-[#0A36F7] to-[#91F2F9]
                         shadow-[0_0_20px_rgba(145,242,249,0.5)]
                         hover:shadow-[0_0_35px_rgba(145,242,249,0.8)]
                         active:shadow-[inset_0_0_15px_rgba(145,242,249,0.6)]
                         transition-all duration-300 ease-out flex items-center justify-center cursor-pointer"
            >
              Donate Now
            </button>

            <button
              data-aos="slide-left"
              data-aos-duration="1000"
              onClick={() => navigate("/signup")}
              className="flex items-center justify-center gap-2 w-[166px] h-[42px] md:w-[220px] md:h-[70px] rounded-full border-2 border-[#91F2F9] font-roboto font-bold text-base md:text-lg text-[#91F2F9] shadow-[0_0_10px_rgba(145,242,249,0.4)] hover:shadow-[0_0_25px_rgba(145,242,249,0.7)] active:shadow-[inset_0_0_10px_rgba(145,242,249,0.6)] transition-all duration-300 ease-out cursor-pointer"
            >
              <span className="md:hidden">Start a Campaign</span>
              <span className="items-center hidden gap-2 md:flex">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300" />
                Start a Campaign
              </span>
            </button>
          </div>
        </div>

        <div className="hidden md:block">
          <img
            src={ShieldImg}
            alt="Hero Illustration"
            className="absolute right-[-1%] top-[55%] -translate-y-1/2 z-10 object-contain w-[350px] lg:w-[650px] pointer-events-none mt-30"
            fetchPriority="high"
          />
        </div>
      </div>

      <div
        className="relative z-20 flex flex-col items-center gap-4 px-6 pb-8 text-center md:items-start md:text-left md:px-16 md:pb-32"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="700"
      >
        <div
          className="flex flex-col items-center mt-6 md:items-start md:mt-14 lg:mt-16"
          data-aos="zoom-in"
          data-aos-duration="700"
          data-aos-delay="800"
        >
          <div className="relative h-20 mb-2 overflow-hidden rounded-full w-35 md:mb-1">
            <img
              src={Shielding2}
              alt="Verified users"
              className="object-contain w-full h-full"
              fetchPriority="high"
            />
          </div>

          <div className="flex flex-row justify-center md:justify-start w-full max-w-[320px] md:max-w-none gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#91F2F9] rounded-full"></span>
              <span className="text-xs font-medium text-white md:text-sm font-sora">
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
      </div>
    </section>
  );
};

export default HeroSection;
