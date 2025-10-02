import React, { useState, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const faqs = [
    {
      question: "What is Zyra?",
      answer:
        "Zyra is a donations-facilitation platform built for Africa. It helps individuals and communities raise funds for medical, educational, or social needs, while enabling donors worldwide to give in crypto or fiat with full transparency.",
    },
    {
      question: "How does Zyra ensure transparency and trust?",
      answer:
        "Every campaign goes through digital and offline verification. All crypto donations are recorded on the blockchain and displayed on a public Transparency Dashboard, allowing donors to track every contribution and see exactly how funds are used.",
    },
    {
      question: "How can I donate?",
      answer:
        "You can give using crypto or stablecoins, and soon via local fiat gateways such as Naira. Web2 donors can pay with cards or bank transfers, while Web3 donors can contribute directly from their crypto wallets.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init({ once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div className="box-border flex flex-col items-center w-full px-8 text-white pt-25">
      {/* H1 */}
      <h1
        className="text-5xl max-[800px]:text-3xl font-semibold leading-tight max-[800px]:leading-snug text-center mb-9"
        data-aos="fade-up"
      >
        Frequently <span className="text-[#00C4FF]">Asked </span>
        <br />
        Questions
      </h1>

      <div className="flex flex-col w-full max-w-3xl gap-4">
        {faqs.map((faq, index) => {
          const durations = [500, 800, 1100];
          const delays = [0, 150, 300];

          return (
            <div
              key={index}
              data-aos="fade-left"
              data-aos-duration={durations[index]}
              data-aos-delay={delays[index]}
              className="rounded-[25px] p-[1px] bg-gradient-to-r from-[#91F2F9] to-[#0A36F7] overflow-hidden border-25px border-[#0A195C] 
                         max-[800px]:rounded-[20px]"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="bg-[#010410] rounded-[25px] p-6 flex flex-col justify-center cursor-pointer shadow-lg transition-all duration-500
                           max-[800px]:rounded-[20px] max-[800px]:p-3"
              >
                {/* Question */}
                <div className="flex items-center justify-between font-semibold text-white max-[800px]:gap-2">
                  <span className="text-lg max-[800px]:text-sm">
                    {faq.question}
                  </span>
                  <span
                    className={`text-xl transform transition-transform duration-500 max-[800px]:text-sm ${
                      openIndex === index ? "rotate-90" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>

                {/* Answer */}
                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                 className="overflow-hidden transition-max-height duration-500 mt-2 text-base max-[800px]:text-xs max-[800px]:font-semibold font-light text-[#91F2F9]"

                  style={{
                    maxHeight: openIndex === index ? "500px" : "0px",
                  }}
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQSection;
