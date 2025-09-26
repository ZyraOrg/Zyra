// import logo.png from "../../assets/logo.png"
import React from "react";

const FooterSection = () => {
  return (
    <main>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>
          <img src="logo.png" alt="logo" />
          <p>
            Transparent blockchain crowdfunding for verified causes worldwide
          </p>
        </div>
        <div>
          <h1>Platform</h1>
          <div className="text-md">
            <a href="/">Home</a>
            <a href="/">Campaigns</a>
            <a href="/">Create</a>
            <a href="/">Explore</a>
          </div>
        </div>
        <div>
          <h1>Legal</h1>
          <div className="text-md text-left">
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
