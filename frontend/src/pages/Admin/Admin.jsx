import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./components/layout/AdminSidebar";
import AdminMobileMenu from "./components/layout/AdminMobileMenu";
import useAdminStore from "../../store/useAdminStore";

export default function Admin() {
  const navigate = useNavigate();
  const { isAdmin } = useAdminStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin/login", { replace: true });
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) return null;

  return (
    <div className="flex h-screen bg-[#010415] text-white overflow-hidden">
      <AdminSidebar />
      <AdminMobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <div className="flex-1 h-screen overflow-y-auto lg:ml-64 relative">
        
        {/* --- HAMBURGER--- */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-[#010415] sticky top-0 z-30 lg:hidden">
          <span className="text-lg font-bold">Zyra Admin</span>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-gray-400 bg-gray-800/50 rounded-lg hover:text-white hover:bg-gray-800 transition-all duration-200 active:scale-95 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* */}

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}