import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SettingsSidebar";
import SettingsMobileMenu from "./SettingsMobileMenu";
import Header from "../Dashboard/components/layout/Header";
import useAuthStore from "../../store/useAuthStore";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function SettingsLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    let cancelled = false;

    const performAuthCheck = async () => {
      await checkAuth(navigate);
    };

    performAuthCheck();

    return () => {
      cancelled = true;
    };
  }, [navigate, checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#010415]">
        <LoadingSpinner message="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#010415] text-white">
      {/* Desktop Sidebar - Always visible on lg+ */}
      <Sidebar />

      {/* Mobile Menu - Only toggles on mobile/tablet */}
      <SettingsMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex-1 lg:ml-64 overflow-y-auto h-screen">
        <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />

        <main className="px-2 py-4 sm:py-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
