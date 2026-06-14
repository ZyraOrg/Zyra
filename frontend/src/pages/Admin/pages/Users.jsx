import { useState } from "react";
import { Search, MoreVertical, Ban, CheckCircle, UserPlus } from "lucide-react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { formatCurrency } from "../../Dashboard/utils/formatters";
import { adminApi } from "../../../services/api";

const STATUS_STYLES = {
  Active:    "bg-green-500/10 text-green-400 border border-green-500/20",
  Suspended: "bg-red-500/10  text-red-400   border border-red-500/20",
};

const ROLES    = ["All Roles",   "Donor", "Organizer"];
const STATUSES = ["All Status",  "Active", "Suspended"];
const PER_PAGE = 10;

// Stable numeric seed for the avatar gradient (users have uuid string ids).
const hueSeed = (id) =>
  String(id).split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);

export default function Users() {
  const [search, setSearch] = useState("");
  const [role,   setRole]   = useState("All Roles");
  const [status, setStatus] = useState("All Status");
  const [page,   setPage]   = useState(1);
  const [menuFor, setMenuFor] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-users", { search, role, status, page }],
    queryFn: () =>
      adminApi
        .getUsers({ search, role, status, page, per_page: PER_PAGE })
        .then((r) => r.data),
    placeholderData: keepPreviousData,
  });

  const users   = data?.users ?? [];
  const total   = data?.total ?? 0;
  const hasMore = data?.hasMore ?? false;

  const toggleStatus = useMutation({
    mutationFn: ({ id, suspend }) =>
      suspend ? adminApi.suspendUser(id) : adminApi.activateUser(id),
    onSuccess: (_res, { suspend }) => {
      toast.success(suspend ? "User suspended" : "User activated");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      setMenuFor(null);
    },
    onError: (err) => toast.error(err.message || "Action failed"),
  });

  // The server paginates before filtering by search/role/status, so reset to
  // page 1 whenever a filter changes to avoid landing on an empty page.
  const onFilterChange = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">

      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Users <span className="text-secondary">Management</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">{total} total registered users</p>
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
            onChange={(e) => onFilterChange(setSearch)(e.target.value)}
            className="w-full bg-[#010410] text-white text-sm pl-9 pr-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:border-secondary placeholder:text-gray-600"
          />
        </div>
        <select value={role}   onChange={(e) => onFilterChange(setRole)(e.target.value)}   className="bg-[#010410] text-white text-sm px-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:border-secondary">
          {ROLES.map((r)    => <option key={r}>{r}</option>)}
        </select>
        <select value={status} onChange={(e) => onFilterChange(setStatus)(e.target.value)} className="bg-[#010410] text-white text-sm px-4 py-2.5 rounded-lg border border-gray-800 focus:outline-none focus:border-secondary">
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
              {users.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-gray-500">
                    {isLoading ? "Loading…" : "No users found"}
                  </td>
                </tr>
              )}
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex items-center justify-center w-8 h-8 text-xs font-bold text-white rounded-full shrink-0"
                        style={{ background: `linear-gradient(135deg, hsl(${hueSeed(u.id) * 47 % 360},70%,55%), hsl(${hueSeed(u.id) * 91 % 360},70%,45%))` }}
                      >
                        {u.name.charAt(0).toUpperCase()}
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
                  <td className="px-5 py-4 font-medium text-white">{formatCurrency(u.donations ?? 0)}</td>
                  <td className="px-5 py-4 text-gray-400">{u.joined}</td>
                  <td className="px-5 py-4">
                    <div className="relative flex justify-end">
                      <button
                        onClick={() => setMenuFor(menuFor === u.id ? null : u.id)}
                        className="text-gray-500 transition-colors hover:text-white"
                      >
                        <MoreVertical size={15} />
                      </button>
                      {menuFor === u.id && (
                        <div className="absolute right-0 z-10 mt-7 w-40 bg-[#0b0e1a] border border-gray-800 rounded-lg shadow-xl overflow-hidden">
                          {u.status === "Suspended" ? (
                            <button
                              onClick={() => toggleStatus.mutate({ id: u.id, suspend: false })}
                              disabled={toggleStatus.isPending}
                              className="flex items-center w-full gap-2 px-3 py-2.5 text-xs text-green-400 hover:bg-white/5 disabled:opacity-50"
                            >
                              <CheckCircle size={13} /> Activate user
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleStatus.mutate({ id: u.id, suspend: true })}
                              disabled={toggleStatus.isPending}
                              className="flex items-center w-full gap-2 px-3 py-2.5 text-xs text-red-400 hover:bg-white/5 disabled:opacity-50"
                            >
                              <Ban size={13} /> Suspend user
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800/50">
          <span className="text-xs text-gray-500">Showing {users.length} of {total}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1.5 text-xs border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
              className="px-3 py-1.5 text-xs border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
