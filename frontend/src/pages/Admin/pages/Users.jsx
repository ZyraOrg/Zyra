import { useState } from "react";
import { Search, MoreVertical, UserPlus } from "lucide-react";

const ALL_USERS = [
  { id: 1, name: "Adaeze Okafor",  email: "adaeze@mail.com",  role: "Donor",     status: "Active",    joined: "Jan 12, 2025", donations: "$1,240" },
  { id: 2, name: "Emeka Nwosu",    email: "emeka@mail.com",   role: "Organizer", status: "Active",    joined: "Feb 3, 2025",  donations: "$8,400" },
  { id: 3, name: "Fatima Al-Amin", email: "fatima@mail.com",  role: "Donor",     status: "Suspended", joined: "Mar 18, 2025", donations: "$320"   },
  { id: 4, name: "Kwame Asante",   email: "kwame@mail.com",   role: "Organizer", status: "Active",    joined: "Apr 5, 2025",  donations: "$5,750" },
  { id: 5, name: "Ngozi Dike",     email: "ngozi@mail.com",   role: "Donor",     status: "Active",    joined: "Apr 22, 2025", donations: "$890"   },
  { id: 6, name: "Amara Osei",     email: "amara@mail.com",   role: "Donor",     status: "Active",    joined: "May 1, 2025",  donations: "$2,100" },
  { id: 7, name: "Chidi Okeke",    email: "chidi@mail.com",   role: "Organizer", status: "Active",    joined: "May 8, 2025",  donations: "$14,200"},
  { id: 8, name: "Yemi Adesanya",  email: "yemi@mail.com",    role: "Donor",     status: "Suspended", joined: "May 10, 2025", donations: "$0"     },
];

const STATUS_STYLES = {
  Active:    "bg-green-500/10 text-green-400 border border-green-500/20",
  Suspended: "bg-red-500/10  text-red-400   border border-red-500/20",
};

const ROLES    = ["All Roles",   "Donor", "Organizer"];
const STATUSES = ["All Status",  "Active", "Suspended"];

export default function Users() {
  const [search, setSearch] = useState("");
  const [role,   setRole]   = useState("All Roles");
  const [status, setStatus] = useState("All Status");

  const filtered = ALL_USERS.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = role   === "All Roles"  || u.role   === role;
    const matchStatus = status === "All Status" || u.status === status;
    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="space-y-6">

      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Users <span className="text-secondary">Management</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">{ALL_USERS.length} total registered users</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-secondary text-black rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <UserPlus size={15} /> Invite User
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#010410] text-white text-sm pl-9 pr-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:border-secondary placeholder:text-gray-600"
          />
        </div>
        <select value={role}   onChange={(e) => setRole(e.target.value)}   className="bg-[#010410] text-white text-sm px-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:border-secondary">
          {ROLES.map((r)    => <option key={r}>{r}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-[#010410] text-white text-sm px-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:border-secondary">
          {STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#010410] rounded-xl border border-gray-800/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs tracking-wider text-gray-500 uppercase border-b border-gray-800/50">
                <th className="px-5 py-4 text-left">User</th>
                <th className="px-5 py-4 text-left">Role</th>
                <th className="px-5 py-4 text-left">Status</th>
                <th className="px-5 py-4 text-left">Total Donated</th>
                <th className="px-5 py-4 text-left">Joined</th>
                <th className="px-5 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full shrink-0"
                        style={{ background: `linear-gradient(135deg, hsl(${u.id * 47 % 360},70%,55%), hsl(${u.id * 91 % 360},70%,45%))` }}
                      >
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-400">{u.role}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-medium text-white">{u.donations}</td>
                  <td className="px-5 py-4 text-gray-400">{u.joined}</td>
                  <td className="px-5 py-4">
                    <button className="text-gray-500 transition-colors hover:text-white">
                      <MoreVertical size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800/50">
          <span className="text-xs text-gray-500">Showing {filtered.length} of {ALL_USERS.length}</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">← Prev</button>
            <button className="px-3 py-1.5 text-xs border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}