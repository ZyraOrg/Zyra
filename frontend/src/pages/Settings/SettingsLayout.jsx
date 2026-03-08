import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./SettingsSidebar";
import SettingsMobileMenu from "./SettingsMobileMenu";
import Header from "../Dashboard/components/layout/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function SettingsLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      try {
        await api.getUser();
        if (!cancelled) setIsCheckingAuth(false);
      } catch {
        if (cancelled) return;
        toast.error("Please log in to continue");
        navigate("/login", { replace: true });
      }
    }

    checkSession();
    return () => { cancelled = true; };
  }, [navigate]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#010415]">
        <LoadingSpinner message="Loading..." />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#010415] text-white">
      <Sidebar />

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
