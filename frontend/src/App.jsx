import Navbar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import ExploreSection from './components/ExploreSection/ExploreSection';
import FAQSection from './components/FAQSection/FAQSection';
import FooterSection from './components/FooterSection/FooterSection';
import HowItWorksSection from './components/HowItWorksSection/HowItWorksSection';
import WhyChooseZyraSection from './components/WhyChooseZyraSection/WhyChooseZyraSection';

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ExploreSection />
      <HowItWorksSection />
      <WhyChooseZyraSection />
      <FAQSection />
      <FooterSection />
    </>
  );
}

export default App;
