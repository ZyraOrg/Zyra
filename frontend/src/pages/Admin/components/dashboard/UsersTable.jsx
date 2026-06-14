import { useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../../../../services/api";

const STATUS_STYLES = {
  Active:    "bg-green-500/10 text-green-400 border border-green-500/20",
  Suspended: "bg-red-500/10  text-red-400   border border-red-500/20",
};

// Stable numeric seed for the avatar gradient (users have uuid string ids).
const hueSeed = (id) =>
  String(id).split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

export default function UsersTable() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", "recent"],
    queryFn: () => adminApi.getUsers({ per_page: 5 }).then((r) => r.data),
  });

  const users = data?.users ?? [];
  const total = data?.total ?? users.length;

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#010410] rounded-xl border border-gray-800/50 overflow-hidden">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-800/50">
        <h2 className="font-bold text-white">Recent Users</h2>
        <div className="relative">
          <Search size={13} className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#13131A] text-white text-sm pl-8 pr-4 py-2 rounded-lg
                       border border-gray-700 focus:outline-none focus:border-secondary
                       placeholder:text-gray-600 w-44"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs tracking-wider text-gray-500 uppercase border-b border-gray-800/50">
              <th className="px-5 py-3 text-left">User</th>
              <th className="px-5 py-3 text-left">Role</th>
              <th className="px-5 py-3 text-left">Status</th>
              <th className="px-5 py-3 text-left">Joined</th>
              <th className="px-5 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/30">
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-sm text-center text-gray-500">
                  {isLoading ? "Loading…" : "No users found"}
                </td>
              </tr>
            )}
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center justify-center text-xs font-bold text-white rounded-full w-7 h-7 shrink-0"
                      style={{ background: `linear-gradient(135deg, hsl(${hueSeed(u.id) * 47 % 360},70%,55%), hsl(${hueSeed(u.id) * 91 % 360},70%,45%))` }}
                    >
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-tight text-white">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-gray-400">{u.role}</td>
                <td className="px-5 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[u.status]}`}>
                    {u.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-gray-400">{u.joined}</td>
                <td className="px-5 py-3">
                  <button className="text-gray-500 transition-colors hover:text-white">
                    <MoreVertical size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800/50">
        <span className="text-xs text-gray-500">{filtered.length} of {total} users</span>
        <a href="/admin/users" className="text-xs text-secondary hover:underline">See all ›</a>
      </div>
    </div>
  );
}