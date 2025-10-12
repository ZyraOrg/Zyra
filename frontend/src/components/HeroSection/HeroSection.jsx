import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight } from "lucide-react";
import ShieldImg from "../../assets/SHIELDw.svg";
import Shielding2 from "../../assets/Bottomimg.svg";
import MobileHero from "../../assets/MobileHero.png";

const litepaper = "/litepaper.pdf";

const HeroSection = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 50,
    });

    const checkViewport = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkViewport();
    window.addEventListener("resize", checkViewport);

    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = litepaper;
    link.download = "Zyra LitePaper 2025.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowDialog(false);
  };

  return (
    <section
      className="relative w-full overflow-hidden text-white"
      data-aos="fade-up"
    >
      {/* Mobile Background */}
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

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center justify-between w-full gap-6 px-6 pt-4 pb-0 sm:px-8 md:flex-row md:px-16 md:pt-32 md:pb-0">
        {/* Left Content */}
        <div
          className="flex flex-col items-center w-full gap-6 mt-2 text-center sm:mt-12 md:mt-0 md:w-1/2 md:items-start md:text-left"
          data-aos="fade-down"
        >
          <h1
            className="font-roboto font-semibold text-[2.2rem] leading-[1.3] md:text-[2rem] md:leading-[1.1] lg:text-[3.5rem] scale-y-[0.98] mt-40"
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

          {/* Buttons */}
          <div className="flex flex-col items-center gap-4 mt-0 sm:flex-row md:items-start">
            {/* Donate Now (works on both mobile & desktop) */}
            <button
              onClick={() => setShowDialog(true)}
              className="px-10 py-5 min-w-[220px] rounded-full text-black font-roboto font-extrabold text-lg shadow-[0_0_20px_rgba(145,242,249,0.6)] transition-all duration-300 bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] hover:shadow-[0_0_30px_rgba(145,242,249,0.8)] flex items-center justify-center"
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-delay="400"
            >
              Donate Now
            </button>

            {/* Start Campaign button */}
            <button
              className="flex items-center justify-center gap-2 w-[166px] h-[42px] md:w-[220px] md:h-[70px] rounded-full border-2 border-[#91F2F9] font-roboto font-bold text-base md:text-lg text-[#91F2F9] transition-all duration-300"
              data-aos="fade-left"
              data-aos-duration="900"
              data-aos-delay="500"
            >
              <span className="md:hidden">Start a Campaign</span>
              <span className="items-center hidden gap-2 md:flex">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                Start a Campaign
              </span>
            </button>
          </div>
        </div>

        {/* Right Shield Image (desktop only) */}
        <div className="hidden md:block">
          <img
            src={ShieldImg}
            alt="Hero Illustration"
            className="absolute right-[-4%] top-[60%] 
                     -translate-y-1/2 z-10 object-contain w-[600px] lg:w-[750px]
                     pointer-events-none mt-30"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* Verification Section */}
      <div
        className="relative z-20 flex flex-col items-center gap-4 px-6 pb-8 text-center md:items-start md:text-left md:px-16 md:pb-32"
        data-aos="fade-up"
        data-aos-duration="600"
        data-aos-delay="700"
      >
        <div
          className="flex flex-col items-center md:items-start mt-6 md:mt-14 lg:mt-16"
          data-aos="zoom-in"
          data-aos-duration="700"
          data-aos-delay="800"
        >
          {/* Avatar */}
          <div className="relative h-20 w-35 overflow-hidden rounded-full mb-2 md:mb-1">
            <img
              src={Shielding2}
              alt="Verified users"
              className="object-contain w-full h-full"
              fetchPriority="high"
            />
          </div>

          {/* Badges */}
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

      {/* Dialog (works on both desktop and mobile) */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowDialog(false)}
          ></div>

          {/* Dialog Box */}
          <div
            className={`relative bg-[#010410] rounded-[30px] flex flex-col items-center z-50 shadow-lg ${
              isMobile ? "w-[90%] p-6" : "w-[450px] p-8"
            }`}
          >
            <h3 className="mb-3 text-xl font-semibold text-center text-white font-roboto">
              🚧 Still under development
            </h3>
            <p className="mb-6 text-center text-gray-300">
              Join our community to stay updated — or download our Litepaper to learn more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              {/* Join Community Button */}
              <a
                href="https://t.me/zyraApp"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-center rounded-full bg-gradient-to-r from-[#91F2F9] to-[#0A36F7] font-bold text-black shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                Join Community
              </a>

              {/* Download Litepaper Button */}
              <button
                onClick={handleDownload}
                className="px-6 py-3 rounded-full bg-white/10 border border-gray-500 font-bold text-white shadow-md transition-all duration-300 hover:bg-white/20"
              >
                Download Litepaper
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;