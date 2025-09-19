import { useState } from 'react'
import './App.css'

// Default logos (still here)
import reactLogo from './assets/logo/logo.png'
import viteLogo from '/vite.svg'

// PNG imports (excluding 20250... and logo*.png)
import donateCard4 from './assets/images/donate-card 4.png'
import donateCard5 from './assets/images/donate-card 5.png'
import donateCard6 from './assets/images/donate-card 6.png'
import donateCard1 from './assets/images/donate-card1.png'
import donateCard2 from './assets/images/donate-card2.png'
import donateCard3 from './assets/images/donate-card3.png'
import zyraLogo from './assets/images/zyra.png'

// SVG imports
import svg1 from './assets/images/1.svg'
import svg2 from './assets/images/2.svg'
import svg3 from './assets/images/3.svg'
import svg4 from './assets/images/4.svg'
import arrow1 from './assets/images/Arrow 1.svg'
import btIcon from './assets/images/BT.svg'
import ctIllustration from './assets/images/CT-illustration.svg'
import donPic from './assets/images/don pic.svg'
import ellipse5 from './assets/images/Ellipse 5.svg'
import ellipse6 from './assets/images/Ellipse 6.svg'
import ellipse7 from './assets/images/Ellipse 7.svg'
import ellipse8 from './assets/images/Ellipse 8.svg'
import hiw1 from './assets/images/HIW (1).svg'
import hiw2 from './assets/images/HIW (2).svg'
import hiw3 from './assets/images/HIW (3).svg'
import hiw4 from './assets/images/HIW (4).svg'
import polygon2 from './assets/images/Polygon 2.svg'
import protectGraphic from './assets/images/Protect-Graphic.svg'
import rectangle23 from './assets/images/Rectangle 23.svg'
import vbIcon from './assets/images/VB.svg'

import "./App.css";

function App() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Donate</a>
        <a href="#">Contact</a>
      </nav>

      {/* Hero Heading */}
      <h1 className="hero-heading">
        RAISE VERIFIED <br>
        </br>FUNDS WITH<br>
        </br>{" "}
        <span>TRANSPARENT <br>
        </br>& TRUST</span>
      </h1>

      {/* Additional content can be added here */}
      <h2 className="hero-subheading">
        Every donation traceble on-chain, every beneficiary
        verified. The future of crowdfunding is here
      </h2>

      {/* Buttons */}
      <div className="Button1">Start a Campaign</div>
      <div className="Button2">Donate Now</div>
    </>
  );
}

export default App;

