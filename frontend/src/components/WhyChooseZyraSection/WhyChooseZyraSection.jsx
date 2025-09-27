import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Shield2Img from "../../assets/shield2.svg";
import DocumentImg from "../../assets/Document.svg";
import MulticulturalImg from "../../assets/Multicultural People.svg";

const WhyChooseZyraSection = () => {
  const cardGridRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const cards = [
    {
      img: Shield2Img,
      title: "Verified Beneficiaries",
      text: "Every campaign creator undergoes rigorous identity verification and background checks.",
    },
    {
      img: DocumentImg,
      title: "Blockchain\nTransparency",
      text: "All transactions are recorded on-chain, providing immutable proof of every donation and fund allocation.",
    },
    {
      img: MulticulturalImg,
      title: "Community Trust",
      text: "Community-driven governance and reputation system ensures accountability and builds trust.",
    },
  ];

  useEffect(() => {
    const container = cardGridRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      cardRefs.current.forEach((card, idx) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });
      setActiveIndex(closestIdx);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
  }, []);

  const handleDotClick = (idx) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "center" });
    setActiveIndex(idx);
  };

  return (
    <section className="relative flex flex-col items-center px-0 pt-40 pb-40 md:pt-30 md:pb-30">
      {/* H1 */}
      <h1
        data-aos="fade-up"
        className="font-roboto font-semibold bold text-[2rem] md:text-[3.4rem] leading-[1.2] text-center mb-6"
      >
        Why Choose <br />
        <span className="text-[#91F2F9]">Zyra?</span>
      </h1>

      {/* Subtitle */}
      <p
        data-aos="fade-in"
        className="mt-2 max-w-[600px] font-sora font-small text-sm md:text-base md:font-semibold leading-[1.5] text-center text-white mb-8 md:mb-16"
      >
        Built on blockchain technology to ensure every <br />
        donation creates real, verifiable impact
      </p>

      {/* Card container */}
      <div
        ref={cardGridRef}
        className="flex md:grid md:grid-cols-3 md:justify-between gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth touch-pan-x w-full max-w-[1148px] mx-auto px-4 md:px-0"
        style={{ scrollbarWidth: "none" }}
      >
        {/* <style>{`::-webkit-scrollbar { display: none; }`}</style> */}

        {cards.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            data-aos="zoom-in"
            data-aos-delay={idx * 100} // stagger cards
            className="snap-center flex-shrink-0 w-[90vw] md:w-[360px] max-w-[586px]"
          >
            <div className="p-[1px] rounded-[30px] bg-gradient-to-l from-primary to-secondary shadow-md">
              <div className="relative flex flex-col items-center p-8 min-h-[350px] md:min-h-[390px] h-full w-full bg-[#010411] rounded-[30px] border border-[#0a195c] border-t-[#7df0ffbd] border-b-[#1d3dc7b9] hover:border-[#06103d] transition-colors duration-300">
                {/* Gradient wrapper for image */}
                <div className="p-[2px] rounded-[20px] md:rounded-[25px] bg-gradient-to-r from-primary to-secondary mb-12 md:mb-20">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-16 h-16 md:w-[4.7rem] md:h-[4.5rem] pt-2 rounded-[18px] md:rounded-[23px] object-contain bg-[#010411]"
                  />
                </div>

                <h3 className="font-roboto font-bold text-xl md:text-[1.7rem] text-center mb-2 whitespace-pre-line">
                  {card.title}
                </h3>
                <p className="font-sora font-medium text-base md:text-lg leading-[1.3] md:leading-[1.2] text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {card.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile dots indicator */}
      <div className="absolute flex gap-2 pt-40 pb-40 transform -translate-x-1/2 bottom-7 top-140 md:hidden left-1/2">
        {cards.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            onClick={() => handleDotClick(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ease-in-out ${
              activeIndex === idx
                ? "bg-[#91F2F9] scale-125 shadow-[0_0_8px_#91F2F9]"
                : "bg-white opacity-50 scale-90"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default WhyChooseZyraSection;
