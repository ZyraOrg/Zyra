import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./components/layout/AdminSidebar";
import AdminMobileMenu from "./components/layout/AdminMobileMenu";
import Header from "../Dashboard/components/layout/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import api from "../../services/api";
import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";

export default function Admin() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(!user);

  useEffect(() => {
    if (user) return;
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
  }, [navigate, user]);

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#010415]">
        <LoadingSpinner message="Loading admin panel..." />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#010415] text-white overflow-hidden">
      <AdminSidebar />
      <AdminMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="flex-1 h-screen overflow-y-auto lg:ml-64">
        <Header setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}