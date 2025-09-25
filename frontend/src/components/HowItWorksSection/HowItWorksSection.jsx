import { ArrowUpRight } from "lucide-react";
import React from "react";

const HowItWorksSection = () => {
  return (
    <main className="w-full overflow-hidden md:mt-10 px-5 md:px-10 flex flex-col justify-center items-center text-center">
      <div className="space-y-5 pb-5">
        <h1 className="text-2xl md:text-5xl font-semibold md:leading-15">
          How It <span className="text-secondary">Works</span>
        </h1>
        <p className="text-[11px] md:text-[16px] font-semibold">
          Four simple steps to transparent, blockchain-powered{" "}
          <br className="hidden md:block" />
          crowdfunding
        </p>
      </div>
      <div className="flex flex-col justify-center items-center pt-8 md:pt-12 text-center gap-10 md:gap-15">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:w-2xl gap-10">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="number-style">1</div>
            <p className="font-semibold text-xl">Create Campaign</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="number-style">2</div>
            <p className="font-semibold text-xl">Donate with Wallet</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row  justify-between items-center text-center md:w-4xl gap-10">
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="border-number-style">
              <div className="number-style">3</div>
            </div>
            <p className="font-semibold text-xl">Track Transparency</p>
          </div>
          <div className="flex flex-col justify-center items-center gap-5">
            <div className="number-style">4</div>
            <p className="font-semibold text-xl">Release by Milestones</p>
          </div>
        </div>
      </div>
      <button className="border-button-gradient mt-16 transition-transform duration-300 ease-in-out shadow-sm hover:scale-101">
        <div className="bg-[#00051b] flex justify-between items-center text-center gap-1 md:gap-3 rounded-2xl md:py-1 px-4 md:px-6 font-semibold text-[9px] md:text-sm">
          <p className="border-r md:pr-3 pr-1">Ready now ?</p>
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
