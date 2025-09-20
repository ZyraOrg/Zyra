import ExploreSection from "./components/ExploreSection/ExploreSection";
import HeroSection from "./components/HeroSection/HeroSection";
import "./index.css";

export default function App() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <ExploreSection />
    </main>
  );
}
