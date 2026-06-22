import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LogOut, LayoutDashboard, Users, Megaphone, BarChart3, ShieldCheck, Settings } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "../../../../assets/logo.png";
import useAdminStore from "../../../../store/useAdminStore";
import { adminApi } from "../../../../services/api";

const navItems = [
  { label: "Overview",   icon: LayoutDashboard, path: "/admin"            },
  { label: "Users",      icon: Users,           path: "/admin/users"      },
  { label: "Campaigns",  icon: Megaphone,       path: "/admin/campaigns"  },
  { label: "Analytics",  icon: BarChart3,       path: "/admin/analytics"  },
  { label: "Moderation", icon: ShieldCheck,     path: "/admin/moderation" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogout, adminEmail } = useAdminStore();
  const username = adminEmail || "Admin";

  const { data: pendingData } = useQuery({
    queryKey: ["admin-campaigns", "pending-count"],
    queryFn: () =>
      adminApi.getCampaigns({ filter: "pending", limit: 1 }).then((r) => r.data),
  });
  const pendingCount = pendingData?.total ?? 0;

  const activeLabel = (() => {
    const path = location?.pathname || "";
    if (path === "/admin")                    return "Overview";
    if (path.startsWith("/admin/users"))      return "Users";
    if (path.startsWith("/admin/campaigns"))  return "Campaigns";
    if (path.startsWith("/admin/analytics"))  return "Analytics";
    if (path.startsWith("/admin/moderation")) return "Moderation";
    if (path.startsWith("/admin/settings"))   return "Settings";
    return "Overview";
  })();

  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out");
    navigate("/admin/login", { replace: true });
  };

  return (
    <aside className="hidden lg:flex w-64 h-screen bg-[#010410] fixed left-0 top-0 flex-col z-20">

      {/* Logo — identical to Dashboard */}
      <div className="flex items-center h-20 px-4">
        <img src={Logo} alt="ZYRA Logo" className="w-auto h-40 -ml-8" />
      </div>

      {/* Admin badge under logo */}
      <div className="px-4 mb-2 -mt-2">
        <span className="text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded bg-gradient-to-r from-primary/20 to-secondary/20 text-secondary border border-secondary/20">
          Admin Panel
        </span>
      </div>

      {/* User profile — same as Dashboard */}
      <div className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
            <span className="text-sm font-semibold text-white">
              {username.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{username}</p>
            <p className="text-xs text-gray-400 truncate">Administrator</p>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        {navItems.map(({ label, icon: Icon, path }) => {
          const isActive = activeLabel === label;
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                isActive
                  ? "bg-[#13131A] text-white"
                  : "text-gray-400 hover:bg-[#13131A] hover:text-white"
              }`}
            >
              <Icon className="flex-shrink-0 w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
              {label === "Moderation" && pendingCount > 0 && (
                <span className="ml-auto text-[10px] font-bold bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded-full">
                  {pendingCount}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Settings + Logout — same as Dashboard */}
      <div className="px-4 pb-4 space-y-2">
        {bottomItems.map(({ label, icon: Icon, path }) => {
          const isActive = activeLabel === label;
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors w-full ${
                isActive
                  ? "bg-[#13131A] text-white"
                  : "text-gray-400 hover:bg-[#13131A] hover:text-white"
              }`}
            >
              <Icon className="flex-shrink-0 w-5 h-5" />
              <span className="text-sm font-medium">{label}</span>
            </button>
          );
        })}

        <button
          onClick={handleLogout}
          className="flex items-center w-full gap-3 px-4 py-3 text-gray-400 transition-colors rounded-lg hover:bg-[#13131A] hover:text-white"
        >
          <LogOut className="flex-shrink-0 w-5 h-5" />
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );
}