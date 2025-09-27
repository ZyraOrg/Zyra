import { ArrowUpRight } from "lucide-react";
import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const HowItWorksSection = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full px-5 overflow-x-hidden text-center md:mt-10 md:px-10">
      <div className="pb-5 space-y-5">
        <h1 className="text-2xl font-semibold md:text-5xl md:leading-15" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-delay="600">
          How It <span className="text-secondary">Works</span>
        </h1>
        <p className="text-[11px] md:text-[16px] font-semibold" data-aos="zoom-in" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-delay="800">
          Four simple steps to transparent, blockchain-powered{" "}
          <br className="hidden md:block" />
          crowdfunding
        </p>
      </div>
     <div className="flex flex-col items-center justify-center gap-10 pt-8 text-center md:pt-12 md:gap-15">
  <div className="flex flex-col items-center justify-between gap-10 text-center md:flex-row md:w-2xl">
    <div className="flex flex-col items-center justify-center gap-5" data-aos="fade-right">
      <div className="number-style">1</div>
      <p className="text-xl font-semibold">Create Campaign</p>
    </div>
    <div className="flex flex-col items-center justify-center gap-5" data-aos="fade-left">
      <div className="number-style">2</div>
      <p className="text-xl font-semibold">Donate with Wallet</p>
    </div>
  </div>
  <div className="flex flex-col items-center justify-between gap-10 text-center md:flex-row md:w-4xl">
    <div className="flex flex-col items-center justify-center gap-5" data-aos="fade-right">
      <div className="border-number-style">
        <div className="number-style">3</div>
      </div>
      <p className="text-xl font-semibold">Track Transparency</p>
    </div>
    <div className="flex flex-col items-center justify-center gap-5" data-aos="fade-left">
      <div className="number-style">4</div>
      <p className="text-xl font-semibold">Release by Milestones</p>
    </div>
  </div>
</div>
      <button className="mt-16 transition-transform duration-300 ease-in-out shadow-sm border-button-gradient hover:scale-101" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-in-out" data-aos-delay="600">
        <div className="bg-[#00051b] flex justify-between items-center text-center gap-1 md:gap-3 rounded-2xl md:py-1 px-4 md:px-6 font-semibold text-[9px] md:text-sm">
          <p className="pr-1 border-r md:pr-3">Ready now ?</p>
          <p className="flex items-center text-secondary">
            Launch your campaign in minutes
            <span>
              <ArrowUpRight size={20} />
            </span>
          </p>
        </div>
      </button>
    </main>
  );
};

export default HowItWorksSection;
