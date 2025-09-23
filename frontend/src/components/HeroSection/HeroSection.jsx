import React from "react";
import ShieldImg from "../../assets/shield.svg";
import Shield2Img from "../../assets/shield2.svg";
import DocumentImg from "../../assets/Document.svg";
import MulticulturalImg from "../../assets/Multicultural People.svg";
import Imaging2 from "../../assets/Ellipse 3.svg";
import Imaging3 from "../../assets/Ellipse 4.svg";
import Imaging4 from "../../assets/Ellipse 5.svg";
import Shieldimg1 from "../../assets/Ellipse 6.svg";
import Shielding2 from "../../assets/Ellipse 7.svg";
import Shielding3 from "../../assets/Ellipse 8.svg";
import { FaArrowRight } from "react-icons/fa";
import * as styles from "./HeroSection.styles";

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        {/* Left Text */}
        <div className={styles.leftContent}>
          <h1 className={styles.mainHeading}>
            RAISE VERIFIED <br />
            FUNDS WITH <br />
            <span className={styles.highlight}>TRANSPARENCY <br /> & TRUST</span>
          </h1>

          <h2 className={styles.subHeading}>
            Every donation traceable on-chain, every beneficiary <br />
            verified. The future of crowdfunding is here
          </h2>

          {/* Buttons */}
          <div className={styles.buttonGroup}>
            <button className={styles.primaryBtn}>Start a Campaign</button>
           <button className={styles.secondaryBtn}>
  Donate Now <FaArrowRight className={styles.arrowIcon} />
</button>


          </div>
        </div>

        {/* Right Image */}
<div className={styles.rightWrapper}>
  <img src={ShieldImg} alt="Hero Illustration" className={styles.shieldImg} />

  {/* Profile images at specific shield corners */}
  <div className={`${styles.profileImgWrapper} ${styles.topLeft}`}>
    <img src={Shieldimg1} alt="User 1" className={styles.profileImg} />
  </div>
  <div className={`${styles.profileImgWrapper} ${styles.topRight}`}>
    <img src={Shielding2} alt="User 2" className={styles.profileImg} />
  </div>
  <div className={`${styles.profileImgWrapper} ${styles.bottomLeft}`}>
    <img src={Shielding3} alt="User 3" className={styles.profileImg} />
  </div>
  <div className={`${styles.profileImgWrapper} ${styles.bottomRight}`}>
    <img src={Imaging3} alt="User 4" className={styles.profileImg} />
  </div>
</div>


        {/* Bottom verification */}
        <div className={styles.verificationWrapper}>
          {/* Small circular images */}
          <div className="flex -space-x-2">
            <div className={styles.smallProfileWrapper}>
              <img src={Shielding2} alt="Verified user 1" className={styles.profileImg} />
            </div>
            <div className={styles.smallProfileWrapper}>
              <img src={Imaging2} alt="Verified user 2" className={styles.profileImg} />
            </div>
            <div className={styles.smallProfileWrapper}>
              <img src={Imaging3} alt="Verified user 3" className={styles.profileImg} />
            </div>
            <div className={styles.smallProfileWrapper}>
              <img src={Imaging4} alt="Verified user 4" className={styles.profileImg} />
            </div>
          </div>

          {/* Verification badges */}
          <div className={styles.verificationContainer}>
            <div className={styles.badge}>
              <div className={styles.dot}></div>
              <span className={styles.badgeText}>Blockchain Verified</span>
            </div>
            <div className={styles.badge}>
              <div className={styles.dot}></div>
              <span className={styles.badgeText}>Smart Contract Protected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Zyra Section */}
      <section className={styles.whyChoose}>
        <h1 className={styles.whyHeading}>
          Why Choose<br /> <span className={styles.highlight}>Zyra?</span>
        </h1>
        <p className={styles.whySub}>
          Built on blockchain technology to ensure every<br />donation creates real, verifiable impact
        </p>

        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <img src={Shield2Img} alt="Verified Beneficiaries" className={styles.cardImage} />
            <h3 className={styles.cardTitle}>Verified Beneficiaries</h3>
            <p className={styles.cardText}>
              Every campaign creator undergoes rigorous identity verification and background checks.
            </p>
          </div>

          <div className={styles.card}>
            <img src={DocumentImg} alt="Blockchain Transparency" className={styles.cardImage} />
            <h3 className={styles.cardTitle}>Blockchain Transparency</h3>
            <p className={styles.cardText}>
              All transactions are recorded on-chain, providing immutable proof of every donation and fund allocation.
            </p>
          </div>

          <div className={styles.card}>
            <img src={MulticulturalImg} alt="Community Trust" className={styles.cardImage} />
            <h3 className={styles.cardTitle}>Community Trust</h3>
            <p className={styles.cardText}>
              Community-driven governance and reputation system ensures accountability and builds trust.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
