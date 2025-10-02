import logo2 from "../../assets/logo.png";
import { BsTwitterX, BsTelegram, BsEnvelope } from "react-icons/bs";
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
      <div className="px-7 md:px-30">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center md:max-w-6xl">
          <div
            className="flex flex-col justify-between"
            data-aos="slide-left"
            data-aos-delay="100"
          >
            <img
              src={logo2}
              alt="logo"
             className="inline-block object-contain w-32 h-32 ml-[-26px]" 
            />
            <p
              className="text-left text-[12px] md:text-[16px] text-gray-400 font-semibold"
              data-aos="slide-left"
              data-aos-delay="200"
            >
              Transparent blockchain <br className="hidden md:block" />
              crowdfunding for verified cause <br className="hidden md:block" />
              worldwide
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
                href="/"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="800"
              >
                Terms
              </a>
              <a
                href="/"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="900"
              >
                Privacy
              </a>
              <a
                href="/"
                className="hover:text-gray-300"
                data-aos="slide-left"
                data-aos-delay="1000"
              >
                Security
              </a>
              <a
                href="/"
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
          <div className="flex gap-2 my-4">
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-primary/70 hover:bg-primary"
            >
              <BsTwitterX size={18} />
            </a>
            <a
              href={SOCIAL_LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-8 h-8 transition-colors rounded-full bg-primary/70 hover:bg-primary"
            >
              <BsTelegram size={18} />
            </a>
          </div>
        </div>
        <p
          className="text-center md:text-left text-[12px] md:text-[16px] text-gray-500 pt-5"
          data-aos="slide-left"
          data-aos-delay="1200"
          data-aos-offset="20"
        >
          2025 Zyra. All rights reserved. Built on Base
        </p>
      </div>
    </main>
  );
};

export default FooterSection;
