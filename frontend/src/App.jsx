import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import ExploreSection from "./components/ExploreSection/ExploreSection";
import FAQSection from "./components/FAQSection/FAQSection";
import FooterSection from "./components/FooterSection/FooterSection";
import HowItWorksSection from "./components/HowItWorksSection/HowItWorksSection";
import WhyChooseZyraSection from "./components/WhyChooseZyraSection/WhyChooseZyraSection";
import Signup from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <WhyChooseZyraSection />
              <ExploreSection />
              <HowItWorksSection />
              <FAQSection />
              <FooterSection />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
