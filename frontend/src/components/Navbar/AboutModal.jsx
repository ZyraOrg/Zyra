import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutModal = ({ show, onClose }) => {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/40"
      data-aos="fade-in"
    >
      <div
        className="relative w-[90%] max-w-md p-5 sm:p-6 text-center rounded-2xl shadow-[0_0_25px_rgba(145,242,249,0.4)] border border-[#1a2b6b]"
        style={{ backgroundColor: "#00051b" }}
        data-aos="zoom-in"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute text-2xl text-gray-400 top-3 right-4 hover:text-[#91F2F9] transition-colors duration-300"
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="mb-3 text-xl sm:text-2xl font-bold text-[#91F2F9]">
          About Zyra
        </h2>

        {/* Description */}
        <p className="mb-4 text-sm font-semibold leading-relaxed text-gray-300 sm:text-base">
          Zyra is a blockchain-powered crowdfunding platform that ensures
          transparency, security, and trust in every donation. Every campaign is
          verified, and every fund is traceable - empowering communities to
          raise money with confidence.
        </p>

        {/* Litepaper link (with arrow) */}
        <a
          href="/Zyra-Litepaper-2025.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 font-medium text-[#91F2F9] hover:underline transition-all duration-300"
        >
          Visit our Litepaper →
        </a>
      </div>
    </div>
  );
};

export default AboutModal;
