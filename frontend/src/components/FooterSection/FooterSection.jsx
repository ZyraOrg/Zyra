import logo4 from "../../assets/logo4.png";
import { BsTwitterX, BsTelegram } from "react-icons/bs";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SOCIAL_LINKS = {
  twitter: "https://x.com/zyraapp?s=21",
  telegram: "https://t.me/zyraApp",
};

const FooterSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      offset: 20,
    });
  }, []);

  return (
    <main className="pb-5 md:space-y-9 pt-15 md:pt-20">
      <div className="w-full h-1 border border-primary"></div>
      <div className="px-5 md:px-30 pt-7">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:max-w-6xl">
          <div
            className="flex flex-col"
            data-aos="slide-left"
            data-aos-delay="100"
          >
            <div>
              <img
                src={logo4}
                alt="Zyra Logo"
                className="w-20 h-full cursor-pointer"
              />
            </div>
            <p
              className="text-left text-[12px] md:text-[16px] text-gray-400 font-semibold pt-2"
              data-aos="slide-left"
              data-aos-delay="200"
            >
              Transparent blockchain <br className="hidden md:block" />
              crowdfunding for verified cause <br className="hidden md:block" />
              worldwide.
            </p>
          </div>
          <div className="space-y-2" data-aos="slide-left" data-aos-delay="200">
            <h1 className="text-lg font-semibold">Platform</h1>
            <div className="flex flex-col gap-2 font-semibold text-gray-400 text-md">
              <a
                href="#home"
                data-aos="slide-left"
                data-aos-delay="300"
                className="hover:text-gray-300"
              >
                Home
              </a>
              <a
                href="#campaigns"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="400"
              >
                Campaigns
              </a>
              <a
                href="#create"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="500"
              >
                Create
              </a>
              <a
                href="#about"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="600"
              >
                Explore
              </a>
            </div>
          </div>
          <div className="space-y-2" data-aos="slide-left" data-aos-delay="700">
            <h1 className="text-lg font-semibold">Legal</h1>
            <div className="flex flex-col gap-2 font-semibold text-gray-400 text-md">
              <a
                href="/Terms.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="800"
              >
                Terms of Service
              </a>
              <a
                href="/privacy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="900"
              >
                Privacy Policy
              </a>
              <a
                href="/security.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="1000"
              >
                Security
              </a>
              <a
                href="/Zyra-Litepaper-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="1100"
              >
                Litepaper
              </a>
            </div>
          </div>
        </div>
        <div>
          <div
            className="flex gap-2 mt-4"
            data-aos="fade-up"
            data-aos-delay="1000"
            data-aos-offset="20"
          >
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-colors rounded-full w-7 h-7 md:w-8 md:h-8 bg-primary/70 hover:bg-primary"
            >
              <BsTwitterX size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center transition-colors rounded-full w-7 h-7 md:w-h md:h-8 bg-primary/70 hover:bg-primary"
            >
              <BsTelegram size={18} />
            </a>
          </div>
        </div>
        <p
          className="text-center md:text-left text-[12px] md:text-[16px] text-gray-500 pt-2"
          data-aos="fade-up"
          data-aos-delay="1000"
          data-aos-offset="20"
        >
          2025 Zyra. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default FooterSection;
