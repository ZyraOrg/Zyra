import logo from "../../assets/logo.png";
import React from "react";

const FooterSection = () => {
  return (
    <main className="px-20">
      <div className="flex justify-center items-center text-center gap-20">
        <div className="text-left">
          <img src={logo} alt="logo" className="w-32" />
          <p>
            Transparent blockchain <br />
            crowdfunding for verified causes <br />
            worldwide
          </p>
        </div>
        <div className="space-y-3 text-left">
          <h1 className="text-lg font-semibold">Platform</h1>
          <div className="text-md flex flex-col gap-2">
            <a href="/">Home</a>
            <a href="/">Campaigns</a>
            <a href="/">Create</a>
            <a href="/">Explore</a>
          </div>
        </div>
        <div className="space-y-3 text-left">
          <h1 className="text-lg font-semibold">Legal</h1>
          <div className="text-md text-left flex flex-col gap-2">
            <a href="/">Terms</a>
            <a href="/">Privacy</a>
            <a href="/">Security</a>
            <a href="/">Litepaper</a>
          </div>
        </div>
      </div>
      <p className="text-left">2025 Zyra. All rights reserved. Built on Base</p>
    </main>
  );
};

export default FooterSection;
