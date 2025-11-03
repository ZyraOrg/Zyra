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
    AOS.init({ duration: 800, once: true, easing: "ease-in-out", offset: 20 });
  }, []);

  const handleDotClick = (idx) => {
    const card = cardRefs.current[idx];
    if (!card) return;
    card.scrollIntoView({ behavior: "smooth", inline: "center" });
    setActiveIndex(idx);
  };

  return (
    <section className="relative flex flex-col items-center px-0 pt-20 pb-40 md:pt-20 md:pb-30">
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
        className="relative flex md:grid md:grid-cols-3 md:justify-between gap-4 md:gap-10 
             overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth touch-pan-x 
             w-full max-w-[1148px] mx-auto px-4 md:px-0 pb-16 md:pb-24"
        style={{
          scrollbarWidth: "non",
          msOverflowStyle: "none",
        }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => (cardRefs.current[idx] = el)}
            data-aos="zoom-in"
            data-aos-delay={idx * 100}
            className="snap-center flex-shrink-0 w-[80vw] md:w-[340px] max-w-[560px] transition-transform duration-300"
          >
            <div
              className="relative z-10 p-[1px] rounded-[25px] bg-gradient-to-l from-primary to-secondary 
                      shadow-md hover:shadow-[0_0_25px_#91F2F9] transition-shadow duration-300"
            >
              <div
                className="flex flex-col items-center p-6 md:p-8 
                        min-h-[300px] md:min-h-[370px] w-full bg-[#010411] rounded-[25px] 
                        border border-[#0a195c] border-t-[#7df0ffbd] border-b-[#1d3dc7b9] 
                        hover:border-[#06103d] transition-colors duration-300"
              >
                {/* Gradient wrapper for image */}
                <div className="p-[2px] rounded-[20px] md:rounded-[25px] bg-gradient-to-r from-primary to-secondary mb-10 md:mb-16">
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-14 h-14 md:w-[4.5rem] md:h-[4.5rem] pt-2 rounded-[18px] md:rounded-[23px] object-contain bg-[#010411]"
                  />
                </div>

                <h3 className="font-roboto font-bold text-lg md:text-[1.6rem] text-center mb-2 whitespace-pre-line">
                  {card.title}
                </h3>
                <p className="font-sora font-medium text-sm md:text-lg leading-[1.3] md:leading-[1.2] text-center text-secondary">
                  {card.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="relative flex gap-2 justify-center mt-6 md:hidden">
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

      <style jsx>{`
        /* Hide scrollbars */
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseZyraSection;
