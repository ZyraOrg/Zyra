import React from "react";

export default function Dialog({ setShowDialog }) {
  // change to your actual path
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#010410]/70 backdrop-blur-sm overflow-y-auto"
        onClick={() => setShowDialog(false)}
      ></div>

      <div
        className={`relative bg-[#010410] rounded-[30px] flex flex-col items-center z-50 
        ${isMobile ? "w-[90%] p-6" : "w-[450px] p-8"}`}
        data-aos="zoom-in"
        data-aos-duration="700"
        data-aos-easing="ease-out"
      >
        <h3 className="mb-3 text-xl font-semibold text-center text-white font-roboto">
          🚧 Still under development
        </h3>
        <p className="mb-6 text-center text-gray-300">
          Join our community to stay updated — or download our Litepaper to
          learn more.
        </p>

        <div className="flex flex-col justify-center w-full gap-4 sm:flex-row">
          <a
            href="https://t.me/zyraApp"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 text-center rounded-full bg-gradient-to-r from-[#91F2F9] to-[#0A36F7]
                       font-bold text-black
                       shadow-[0_0_15px_rgba(145,242,249,0.5)]
                       hover:shadow-[0_0_30px_rgba(145,242,249,0.8)]
                       active:shadow-[inset_0_0_12px_rgba(145,242,249,0.6)]
                       transition-all duration-300 ease-out"
          >
            Join Community
          </a>

          <a
            href="/Zyra-Litepaper-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 font-bold text-white border border-gray-500 rounded-full
                       bg-white/10
                       shadow-[0_0_10px_rgba(255,255,255,0.2)]
                       hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]
                       active:shadow-[inset_0_0_10px_rgba(255,255,255,0.4)]
                       transition-all duration-300 ease-out"
          >
            Download Litepaper
          </a>
        </div>
      </div>
    </div>
  );
}
