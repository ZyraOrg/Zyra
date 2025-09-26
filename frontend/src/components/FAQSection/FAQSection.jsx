import React, { useState, useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  const faqs = [
    { question: "What is Zyra", answer: "Zyra is a platform that ..." },
    { question: "How does Zyra ensure transparency and trust", answer: "Zyra ensures transparency by ..." },
    { question: "How can I donate", answer: "You can donate via ..." },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    AOS.init({ once: true, easing: 'ease-in-out' });
  }, []);

  return (
    <div className="w-full min-h-[819px] pt-25 px-8 box-border flex flex-col items-center text-white">
      {/* H1 with responsive font size */}
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
              className="rounded-[25px] p-[1px] bg-gradient-to-r from-[#91F2F9] to-[#0A36F7] overflow-hidden border border-[#0A195C] 
                         max-[800px]:rounded-[50px] max-[800px]:w-[317px] max-[800px]:h-[42px]"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="bg-[#010410] rounded-[25px] p-6 flex flex-col justify-center h-[152px] cursor-pointer shadow-lg transition-all duration-300
                           max-[800px]:rounded-[50px] max-[800px]:h-[42px] max-[800px]:p-4"
              >
                <div className="flex items-center justify-between font-bold text-white max-[800px]:gap-2">
                  <span className="text-lg max-[800px]:text-sm">{faq.question}</span>
                  <span
                    className={`text-xl transform transition-transform duration-300 max-[800px]:text-sm ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  >
                    ▼
                  </span>
                </div>

                <div
                  ref={(el) => (contentRefs.current[index] = el)}
                  className="overflow-hidden transition-max-height duration-300 mt-2 text-gray-300 text-base max-[800px]:text-xs"
                  style={{
                    maxHeight: openIndex === index ? '500px' : '0px',
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
