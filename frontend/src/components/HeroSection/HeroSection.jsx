import React from "react";
import ShieldImg from "../../assets/shield.svg";
import Shield2Img from "../../assets/shield2.svg";
import DocumentImg from "../../assets/Document.svg";
import MulticulturalImg from "../../assets/Multicultural People.svg";
import Imaging from "../../assets/Ellipse 2.svg";
import Imaging2 from "../../assets/Ellipse 3.svg";
import Imaging3 from "../../assets/Ellipse 4.svg";
import Imaging4 from "../../assets/Ellipse 5.svg";
import Shieldimg1 from "../../assets/Ellipse 6.svg";
import Shielding2 from "../../assets/Ellipse 7.svg";
import Shielding3 from "../../assets/Ellipse 8.svg";
const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row justify-between items-center gap-8 px-6 md:px-16 pt-20 md:pt-32 text-white relative min-h-[90vh]">
        {/* Left content */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2 z-10">
          <h1 className="font-roboto font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-white">
            RAISE VERIFIED <br />
            FUNDS WITH <br />
            <span className="text-[#91F2F9]">TRANSPARENCY <br /> & TRUST</span>
          </h1>

          <h2 className="max-w-[500px] font-sora font-semibold text-lg md:text-xl leading-[150%] text-white">
            Every donation traceable on-chain, every beneficiary <br />
            verified. The future of crowdfunding is here
          </h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="px-8 py-4 bg-gradient-to-r from-[#0A36F7] to-[#91F2F9] rounded-lg shadow-[0_0_20px_rgba(145,242,249,0.6)] font-roboto font-bold text-lg text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(145,242,249,0.8)] hover:-translate-y-1 min-w-[200px]">
              Start a Campaign
            </button>
            <button className="px-8 py-4 border-2 border-[#91F2F9] rounded-lg font-roboto font-bold text-lg text-[#91F2F9] transition-all duration-300 hover:shadow-[0_0_30px_rgba(145,242,249,0.8)] hover:-translate-y-1 min-w-[200px] bg-transparent">
              Donate Now
            </button>
          </div>
        </div>

        {/* Right side - Shield with floating profiles */}
<div className="w-1000px lg:w flex justify-center items-center relative min-h-[700px]">
  <img
    src={ShieldImg}
    alt="Hero Illustration"
    className="max-w-full w-full h-auto object-contain relative z-10"
  />
  
  {/* Floating profile images around the shield */}
  {/* Top left position */}
  <div className="absolute top-12 left-16 lg:left-20 w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-[#91F2F9] shadow-lg z-20">
    <img src={Shieldimg1} alt="User 1" className="w-full h-full object-cover" />
  </div>
  
  {/* Top right position */}
  <div className="absolute top-12 right-16 lg:right-20 w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-[#91F2F9] shadow-lg z-20">
    <img src={Shielding2} alt="User 2" className="w-full h-full object-cover" />
  </div>
  
  {/* Bottom left position */}
  <div className="absolute bottom-16 left-16 lg:left-20 w-16 h-16 lg:w-18 lg:h-18 rounded-full overflow-hidden border-2 border-[#91F2F9] shadow-lg z-20">
    <img src={Shielding3} alt="User 3" className="w-full h-full object-cover" />
  </div>
  
  {/* Bottom right position */}
  <div className="absolute bottom-16 right-16 lg:right-20 w-16 h-16 lg:w-20 lg:h-20 rounded-full overflow-hidden border-2 border-[#91F2F9] shadow-lg z-20">
    <img src={Shielding3} alt="User 4" className="w-full h-full object-cover" />
  </div>
</div>

        {/* Bottom verification section */}
        <div className="absolute bottom-8 left-6 md:left-16 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
          {/* Small circular images */}
          <div className="flex -space-x-2">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#91F2F9] bg-gray-800">
              <img src={ShieldImg} alt="Verified user 1" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#91F2F9] bg-gray-800">
              <img src={Imaging2} alt="Verified user 2" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#91F2F9] bg-gray-800">
              <img src={Imaging3} alt="Verified user 3" className="w-full h-full object-cover" />
            </div>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#91F2F9] bg-gray-800">
              <img src={Imaging4} alt="Verified user 4" className="w-full h-full object-cover" />
            </div>
          </div>
          
          {/* Verification badges */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#91F2F9] rounded-full"></div>
              <span className="text-white font-sora font-medium">Blockchain Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#91F2F9] rounded-full"></div>
              <span className="text-white font-sora font-medium">Smart Contract Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Zyra Section */}
      <section className="flex flex-col items-center py-20 px-6 md:px-16 text-white">
        <h1 className="font-roboto font-semibold text-3xl md:text-5xl lg:text-6xl leading-[120%] text-center mb-6">
          Why Choose<br /> <span className="text-[#91F2F9]">Zyra?</span>
        </h1>
        <p className="mt-4 max-w-[600px] font-sora font-medium text-lg md:text-xl leading-[150%] text-center text-white mb-16">
          Built on blockchain technology to ensure every<br />donation creates real, verifiable impact
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
          <div className="w-full max-w-[476px] mx-auto bg-[#0A0F1E] border border-[#1E293B] rounded-[20px] flex flex-col items-center p-8 hover:border-[#91F2F9] transition-colors duration-300 min-h-[320px]">
            <img
              src={Shield2Img}
              alt="Verified Beneficiaries Icon"
              className="w-16 h-16 mb-6"
            />
            <h3 className="font-roboto font-bold text-[22px] text-white mb-4 text-center">Verified Beneficiaries</h3>
            <p className="font-sora text-[15px] leading-[150%] text-gray-400 text-center">
              Every campaign creator undergoes rigorous identity verification and background checks.
            </p>
          </div>
          
          <div className="w-full max-w-[476px] mx-auto bg-[#0A0F1E] border border-[#1E293B] rounded-[20px] flex flex-col items-center p-8 hover:border-[#91F2F9] transition-colors duration-300 min-h-[320px]">
            <img
              src={DocumentImg}
              alt="Blockchain Transparency Icon"
              className="w-16 h-16 mb-6"
            />
            <h3 className="font-roboto font-bold text-[22px] text-white mb-4 text-center">Blockchain Transparency</h3>
            <p className="font-sora text-[15px] leading-[150%] text-gray-400 text-center">
              All transactions are recorded on-chain, providing immutable proof of every donation and fund allocation.
            </p>
          </div>
          
          <div className="w-full max-w-[476px] mx-auto bg-[#0A0F1E] border border-[#1E293B] rounded-[20px] flex flex-col items-center p-8 hover:border-[#91F2F9] transition-colors duration-300 min-h-[320px] md:col-span-2 lg:col-span-1">
            <img
              src={MulticulturalImg}
              alt="Community Trust Icon"
              className="w-16 h-16 mb-6"
            />
            <h3 className="font-roboto font-bold text-[22px] text-white mb-4 text-center">Community Trust</h3>
            <p className="font-sora text-[15px] leading-[150%] text-gray-400 text-center">
              Community-driven governance and reputation system ensures accountability and builds trust.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;