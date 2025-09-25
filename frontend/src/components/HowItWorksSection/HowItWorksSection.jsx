import React from "react";

const HowItWorksSection = () => {
  return (
    <main className="w-full overflow-hidden my-10 px-5 flex flex-col justify-center items-center text-center">
      <div className="space-y-5 pb-5">
        <h1 className="text-2xl md:text-5xl font-semibold md:leading-15">
          How It <span className="text-secondary">Works</span>
        </h1>
        <p className="text-md font-semibold">
          Four simple steps to transparent, blockchain-powered{" "}
          <br className="hidden md:block" />
          crowdfundi
        </p>
      </div>
    </main>
  );
};

export default HowItWorksSection;
