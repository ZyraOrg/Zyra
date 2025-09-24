import React, { useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ArrowUpRight } from "lucide-react";

// ====== Assets ======
import ShieldImg from "../../assets/SHIELDw.svg";
import Shield2Img from "../../assets/shield2.svg";
import DocumentImg from "../../assets/Document.svg";
import MulticulturalImg from "../../assets/Multicultural People.svg";
import Shielding2 from "../../assets/Bottomimg.svg";

// ====== Styles ======
import "./HeroSection.css";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS, animate once
  }, []);

  return (
    <>
      {/* ================= Hero Section ================= */}
      <section className="heroSection" data-aos="fade-up" data-aos-delay="0">
        {/* -------- Left Text -------- */}
        <div className="leftContent" data-aos="fade-down" data-aos-delay="200">
          <h1 className="mainHeading" data-aos="fade-down" data-aos-delay="400">
            RAISE VERIFIED <br />
            FUNDS WITH <br />
            <span className="highlight">
              TRANSPARENCY <br /> & TRUST
            </span>
          </h1>

          <h2 className="subHeading" data-aos="fade-up" data-aos-delay="600">
            Every donation traceable on-chain, every beneficiary <br />
            verified. The future of crowdfunding is here
          </h2>

          {/* -------- Buttons -------- */}
          <div className="buttonGroup">
            <button className="primaryBtn" data-aos="slide-right" data-aos-delay="400">Start a Campaign</button>
            <button className="secondaryBtn" data-aos="slide-left" data-aos-delay="500">
              <ArrowUpRight className="arrowIcon" /> Donate Now
            </button>
          </div>
        </div>

        {/* -------- Right Image -------- */}
        <img src={ShieldImg} alt="Hero Illustration" className="shieldImg" />

        {/* -------- Bottom Verification -------- */}
        <div className="verificationWrapper" data-aos="fade-up" data-aos-delay="900">
          {/* Single combined SVG image */}
          <div className="singleProfileWrapper" data-aos="zoom-in" data-aos-delay="1000">
            <img src={Shielding2} alt="Verified users" className="profileImg" />
          </div>

          {/* Verification badges */}
          <div className="verificationContainer" data-aos="fade-right" data-aos-delay="800">
            <div className="badge" data-aos="fade-right" data-aos-delay="800">
              <div className="dot"></div>
              <span className="badgeText">Blockchain Verified</span>
            </div>
            <div className="badge" data-aos="fade-right" data-aos-delay="1000">
              <div className="dot"></div>
              <span className="badgeText">Smart Contract Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Why Choose Zyra Section ================= */}
      <section className="whyChoose" data-aos="fade-up" data-aos-delay="0">
        <h1 className="whyHeading" data-aos="fade-down" data-aos-delay="200">
          Why Choose <br /> <span className="highlight">Zyra?</span>
        </h1>
        <p className="whySub" data-aos="fade-up" data-aos-delay="400">
          Built on blockchain technology to ensure every <br />
          donation creates real, verifiable impact
        </p>

        <div className="cardGrid" data-aos="fade-up" data-aos-delay="600">
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

export default HeroSection;