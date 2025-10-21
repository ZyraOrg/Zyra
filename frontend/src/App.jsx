import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import ExploreSection from "./components/ExploreSection/ExploreSection";
import FAQSection from "./components/FAQSection/FAQSection";
import FooterSection from "./components/FooterSection/FooterSection";
import HowItWorksSection from "./components/HowItWorksSection/HowItWorksSection";
import WhyChooseZyraSection from "./components/WhyChooseZyraSection/WhyChooseZyraSection";

function App() {
  return (
    <>
      {/* Navbar should always be full width */}
      <Navbar />

      {/* Wrap all page content inside a centered container */}
      <div className="app-container max-w-[1400px] w-full mx-auto px-4 md:px-6">
        <HeroSection />
        <WhyChooseZyraSection />
        <ExploreSection />
        <HowItWorksSection />
        <FAQSection />
        <FooterSection />
      </div>
    </>
  );
}

export default App;
