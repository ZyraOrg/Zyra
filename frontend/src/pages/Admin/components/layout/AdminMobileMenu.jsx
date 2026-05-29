import { useLocation, useNavigate } from "react-router-dom";
import { X, LayoutDashboard, Users, Megaphone, BarChart3, ShieldCheck, Settings, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import useAdminStore from "../../../../store/useAdminStore";

const navItems = [
  { label: "Overview",   icon: LayoutDashboard, path: "/admin"            },
  { label: "Users",      icon: Users,           path: "/admin/users"      },
  { label: "Campaigns",  icon: Megaphone,       path: "/admin/campaigns"  },
  { label: "Analytics",  icon: BarChart3,       path: "/admin/analytics"  },
  { label: "Moderation", icon: ShieldCheck,     path: "/admin/moderation" },
  { label: "Settings",   icon: Settings,        path: "/admin/settings"   },
];

export default function AdminMobileMenu({ isOpen, onClose }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { adminLogout } = useAdminStore();

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

  return (
    <>
      {/* Backdrop with fade animation */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer with slide animation */}
      <div 
        className={`fixed left-0 top-0 h-full w-72 bg-[#010410] z-50 lg:hidden flex flex-col border-r border-gray-800 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-20 px-6 border-b border-gray-800">
          <p className="text-sm font-bold text-white">
            Zyra <span className="text-secondary">Admin</span>
          </p>
          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map(({ label, icon: Icon, path }) => {
            const isActive = activeLabel === label;
            return (
              <button
                key={label}
                onClick={() => { navigate(path); onClose(); }}
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
        </nav>

        {/* Logout */}
        <div className="px-4 pt-4 pb-6 border-t border-gray-800">
          <button
            onClick={() => { adminLogout(); toast.success("Logged out"); navigate("/admin/login", { replace: true }); onClose(); }}
            className="flex items-center w-full gap-3 px-4 py-3 text-gray-400 rounded-lg hover:bg-[#13131A] hover:text-white transition-colors"
          >
            <LogOut className="flex-shrink-0 w-5 h-5" />
            <span className="text-sm font-medium">Log out</span>
          </button>
        </div>
      </div>
    </>
  );
}