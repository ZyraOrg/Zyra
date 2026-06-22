import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { Toaster } from "react-hot-toast";
import { wagmiConfig } from "./config/appkit";
import NotFound from "./pages/NotFound";

import { Login } from "./pages/Login/Login";
import SignUp from "./pages/Signup/SignUp";
import AuthCallback from "./pages/AuthCallback";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateCampaign from "./pages/Dashboard/CreateCampaign";
import Campaigns from "./pages/Dashboard/Campaigns";
import ActiveCampaigns from "./pages/Dashboard/ActiveCampaigns";
import CampaignDetails from "./pages/Dashboard/CampaignDetails";
import Profile from "./pages/Dashboard/Profile";

import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import ExploreSection from "./components/ExploreSection/ExploreSection";
import FAQSection from "./components/FAQSection/FAQSection";
import FooterSection from "./components/FooterSection/FooterSection";
import HowItWorksSection from "./components/HowItWorksSection/HowItWorksSection";
import WhyChooseZyraSection from "./components/WhyChooseZyraSection/WhyChooseZyraSection";
import SettingsLayout from "./pages/Settings/SettingsLayout";
import AccountInfo from "./pages/Settings/pages/AccountInfo";
import WalletPayments from "./pages/Settings/pages/WalletPayments";
import Privacy from "./pages/Settings/pages/Privacy";
import Support from "./pages/Settings/pages/Support";
import { useUser } from "./hooks/useUser";
import ProtectedRoute from "./components/ProtectedRoute";

import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminHome from "./pages/Admin/AdminHome";
import Users from "./pages/Admin/pages/Users";
// Renamed this import to avoid the conflict with Dashboard's Campaigns
import AdminCampaigns from "./pages/Admin/pages/Campaigns";
import AdminCampaignDetail from "./pages/Admin/pages/CampaignDetail";
import Analytics from "./pages/Admin/pages/Analytics";
import Moderation from "./pages/Admin/pages/Moderation";
import AdminSettings from "./pages/Admin/pages/AdminSettings";

import PublicCampaigns from "./pages/Campaigns/PublicCampaigns";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function RouterContent() {
  useUser();

  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />}>
        <Route index                  element={<AdminHome />} />
        <Route path="users"           element={<Users />} />
        <Route path="campaigns"       element={<AdminCampaigns />} />
        <Route path="campaigns/:id"   element={<AdminCampaignDetail />} />
        <Route path="analytics"       element={<Analytics />} />
        <Route path="moderation"      element={<Moderation />} />
        <Route path="settings"        element={<AdminSettings />} />
      </Route>

      <Route path="/signup"        element={<SignUp />} />
      <Route path="/login"         element={<Login />} />
      <Route path="/auth/callback" element={<AuthCallback />} />

      {/* Public — anyone can browse active campaigns without logging in */}
      <Route path="/campaigns" element={<PublicCampaigns />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard"                      element={<Dashboard />} />
        <Route path="/dashboard/create-campaign"      element={<CreateCampaign />} />
        <Route path="/dashboard/campaigns"            element={<Campaigns />} />
        <Route path="/dashboard/campaigns/:id"        element={<CampaignDetails />} />
        <Route path="/dashboard/active-campaigns"     element={<ActiveCampaigns />} />
        <Route path="/dashboard/profile"              element={<Profile />} />

        <Route path="/settings" element={<SettingsLayout />}>
          <Route index         element={<AccountInfo />} />
          <Route path="wallet" element={<WalletPayments />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Route>

      
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

      {/* 404 — must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#010415",
              color:      "#fff",
              border:     "1px solid #0ea5e9",
            },
          }}
        />
        <BrowserRouter>
          <RouterContent />
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;