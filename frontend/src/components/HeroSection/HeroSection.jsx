import React from "react";
import { FaArrowRight } from "react-icons/fa";

// ====== Assets ======
import ShieldImg from "../../assets/SHIELDw.svg";
import Shield2Img from "../../assets/shield2.svg";
import DocumentImg from "../../assets/Document.svg";
import MulticulturalImg from "../../assets/Multicultural People.svg";
import Shielding2 from "../../assets/Bottomimg.svg";

// ====== Styles ======
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <>
      {/* ================= Hero Section ================= */}
      <section className="heroSection">
        {/* -------- Left Text -------- */}
        <div className="leftContent">
          <h1 className="mainHeading">
            RAISE VERIFIED <br />
            FUNDS WITH <br />
            <span className="highlight">
              TRANSPARENCY <br /> & TRUST
            </span>
          </h1>

          <h2 className="subHeading">
            Every donation traceable on-chain, every beneficiary <br />
            verified. The future of crowdfunding is here
          </h2>

          {/* -------- Buttons -------- */}
          <div className="buttonGroup">
            <button className="primaryBtn">Start a Campaign</button>
            <button className="secondaryBtn">
              Donate Now <FaArrowRight className="arrowIcon" />
            </button>
          </div>
        </div>

        {/* -------- Right Image -------- */}
        <img src={ShieldImg} alt="Hero Illustration" className="shieldImg" />

        {/* -------- Bottom Verification -------- */}
        <div className="verificationWrapper">
          {/* Single combined SVG image */}
          <div className="singleProfileWrapper">
            <img src={Shielding2} alt="Verified users" className="profileImg" />
          </div>

          {/* Verification badges */}
          <div className="verificationContainer">
            <div className="badge">
              <div className="dot"></div>
              <span className="badgeText">Blockchain Verified</span>
            </div>
            <div className="badge">
              <div className="dot"></div>
              <span className="badgeText">Smart Contract Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Why Choose Zyra Section ================= */}
      <section className="whyChoose">
        <h1 className="whyHeading">
          Why Choose <br /> <span className="highlight">Zyra?</span>
        </h1>
        <p className="whySub">
          Built on blockchain technology to ensure every <br />
          donation creates real, verifiable impact
        </p>

        <div className="cardGrid">
          <div className="card">
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

          <div className="card">
            <img
              src={DocumentImg}
              alt="Blockchain Transparency"
              className="cardImage"
            />
            <h3 className="cardTitle">Blockchain Transparency</h3>
            <p className="cardText">
              All transactions are recorded on-chain, providing immutable proof
              of every donation and fund allocation.
            </p>
          </div>

          <div className="card">
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
