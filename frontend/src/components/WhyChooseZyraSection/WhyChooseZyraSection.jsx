import React, { useEffect, useRef } from 'react';
import Shield2Img from "../../assets/shield2.svg";
import DocumentImg from "../../assets/Document.svg";
import MulticulturalImg from "../../assets/Multicultural People.svg";
import "./WhyChooseZyra.css";

const WhyChooseZyraSection = () => {
  const cardGridRef = useRef(null);

  useEffect(() => {
    const cardGrid = cardGridRef.current;
    if (window.innerWidth <= 800) { 
      const cards = cardGrid.querySelectorAll('.card');
      const dotsContainer = document.createElement('div');
      dotsContainer.classList.add('slider-dots');
      cardGrid.after(dotsContainer);

      cards.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
          cards[index].scrollIntoView({ behavior: 'smooth', inline: 'start' });
          document.querySelector('.dot.active')?.classList.remove('active');
          dot.classList.add('active');
        });
        dotsContainer.appendChild(dot);
      });

      cards[0].scrollIntoView({ behavior: 'smooth', inline: 'start' });
      dotsContainer.firstChild.classList.add('active');

      cardGrid.addEventListener('scroll', () => {
        const scrollPosition = cardGrid.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 16; // 16px margin-right
        const activeIndex = Math.round(scrollPosition / cardWidth);
        document.querySelector('.dot.active')?.classList.remove('active');
        dotsContainer.children[activeIndex].classList.add('active');
      });

      // Cleanup event listener
      return () => cardGrid.removeEventListener('scroll', () => {});
    }
  }, []);

  return (
    <>
      {/* ================= Why Choose Zyra Section ================= */}
      <section className="whyChoose" data-aos="fade-up" data-aos-delay="0">
        <h1 className="whyHeading" data-aos="fade-down" data-aos-delay="200">
          Why Choose <br /> <span className="highlight">Zyra?</span>
        </h1>
        <p className="whySub" data-aos="fade-up" data-aos-delay="400">
          Built on blockchain technology to ensure every <br />
          donation creates real, verifiable impact
        </p>

        <div className="cardGrid" ref={cardGridRef} data-aos="fade-up" data-aos-delay="600">
          <div className="card" data-aos="fade-up" data-aos-delay="800">
            <img
              src={Shield2Img}
              alt="Verified Beneficiaries"
              className="cardImage"
            />
            <h3 className="cardTitle">Verified Beneficiaries</h3>
            <p className="cardText">
              Every campaign creator undergoes rigorous identity verification
              and background checks.
            </p>
          </div>

          <div className="card" data-aos="fade-up" data-aos-delay="1000">
            <img
              src={DocumentImg}
              alt="Blockchain Transparency"
              className="cardImage"
            />
            <h3 className="cardTitle">Blockchain <br />Transparency</h3>
            <p className="cardText">
              All transactions are recorded on-chain, providing immutable proof
              of every donation and fund allocation.
            </p>
          </div>

          <div className="card" data-aos="fade-up" data-aos-delay="1200">
            <img
              src={MulticulturalImg}
              alt="Community Trust"
              className="cardImage"
            />
            <h3 className="cardTitle">Community Trust</h3>
            <p className="cardText">
              Community-driven governance and reputation system ensures
              accountability and builds trust.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseZyraSection;