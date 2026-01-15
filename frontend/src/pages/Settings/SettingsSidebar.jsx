import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { settingsnavItems } from "../Dashboard/constants/dashboardData";
import Logo from "../../assets/logo.png";
import supabase from "../../lib/supabaseClient";
import useAuthStore from "../../store/useAuthStore";

export default function SettingsSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const username = user?.name || user?.username || user?.email || "User";

  const handleNav = (item) => {
    if (item.href) {
      navigate(item.href);
    }
  };

  const activeItem = (() => {
    const path = location?.pathname || "";
    if (path === "/settings/wallet") return "Wallet & Payments";

    if (path === "/settings/privacy") return "Privacy & Security";
    if (path === "/settings/support") return "Support & Legal";
    if (path === "/settings") return "Account Info";
    return "";
  })();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      useAuthStore.getState().logout();
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      toast.error(err?.message || "Failed to log out");
    }
  };

  return (
    <aside className="hidden lg:flex w-64 h-screen bg-[#010410] fixed left-0 top-0 flex-col z-20">
      {/* Logo */}
      <div className="flex items-center h-20 px-4">
        <img src={Logo} alt="ZYRA Logo" className="w-auto h-40 -ml-8" />
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {settingsnavItems
          .filter(
            (item) =>
              item.label !== "Privacy & Security" &&
              item.label !== "Support & Legal"
          )
          .map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;

            return (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                  isActive
                    ? "bg-[#13131A] text-white"
                    : "text-gray-400 hover:bg-[#13131A]"
                }`}
              >
                <Icon className="flex-shrink-0 w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
      </nav>

      {/* Privacy & Support */}
      <div className="flex-1 px-4 space-y-2">
        {settingsnavItems
          .filter(
            (item) =>
              item.label === "Privacy & Security" ||
              item.label === "Support & Legal"
          )
          .map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;

            return (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                  isActive
                    ? "bg-[#13131A] text-white"
                    : "text-gray-400 hover:bg-[#13131A]"
                }`}
              >
                <Icon className="flex-shrink-0 w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
      </div>

      {/* Logout */}
      <div className="mt-5 px-4 py-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 text-red-400 transition-colors rounded-lg hover:bg-[#13131A]"
        >
          <LogOut className="flex-shrink-0 w-5 h-5" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
}
