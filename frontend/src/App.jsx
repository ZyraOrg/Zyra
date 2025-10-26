import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import { Login } from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";

import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import ExploreSection from "./components/ExploreSection/ExploreSection";
import FAQSection from "./components/FAQSection/FAQSection";
import FooterSection from "./components/FooterSection/FooterSection";
import HowItWorksSection from "./components/HowItWorksSection/HowItWorksSection";
import WhyChooseZyraSection from "./components/WhyChooseZyraSection/WhyChooseZyraSection";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#010415",
            color: "#fff",
            border: "1px solid #0ea5e9",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
