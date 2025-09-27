import logo from "../../assets/logo.png";
import React from "react";

const FooterSection = () => {
  return (
    <main className="px-7 md:px-30 pb-5 md:space-y-9">
      <div className="flex flex-col md:flex-row justify-between md:items-center md:max-w-6xl gap-5">
        <div className="flex flex-col justify-between">
          <img src={logo} alt="logo" className="w-32 h-32 object-cover" />
          <p className="text-left text-[12px] md:text-[16px] text-gray-400 font-semibold">
            Transparent blockchain <br className="hidden md:block" />
            crowdfunding for verified causes <br className="hidden md:block" />
            worldwide
          </p>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Platform</h1>
          <div className="text-md flex flex-col gap-2 text-gray-400 font-semibold">
            <a href="/">Home</a>
            <a href="/">Campaigns</a>
            <a href="/">Create</a>
            <a href="/">Explore</a>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-lg font-semibold">Legal</h1>
          <div className="text-md flex flex-col gap-2 text-gray-400 font-semibold">
            <a href="/">Terms</a>
            <a href="/">Privacy</a>
            <a href="/">Security</a>
            <a href="/">Litepaper</a>
          </div>
        </div>
      </div>
      <p className="text-center md:text-left text-[12px] md:text-[16px] text-gray-500 pt-5">
        2025 Zyra. All rights reserved. Built on Base
      </p>
    </main>
  );
};

export default FooterSection;
