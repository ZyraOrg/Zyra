import { useState } from "react";
import { CheckCircle, XCircle, Clock, Search } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { formatCurrency } from "../../Dashboard/utils/formatters";
import { adminApi } from "../../../services/api";

const FILTERS = ["All", "Pending", "Approved", "Rejected"];
const PER_PAGE = 20;

const STATUS_STYLES = {
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Approved: "bg-green-500/10  text-green-400  border border-green-500/20",
  Rejected: "bg-red-500/10   text-red-400    border border-red-500/20",
};

const STATUS_ICON = {
  Pending: <Clock size={13} className="text-yellow-400" />,
  Approved: <CheckCircle size={13} className="text-green-400" />,
  Rejected: <XCircle size={13} className="text-red-400" />,
};

export default function Campaigns() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const apiFilter = filter === "All" ? "all" : filter.toLowerCase();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-campaigns", { filter: apiFilter, search }],
    queryFn: () =>
      adminApi
        .getCampaigns({ filter: apiFilter, search, limit: PER_PAGE })
        .then((r) => r.data),
    placeholderData: keepPreviousData,
  });

  const items = data?.campaigns ?? [];
  const total = data?.total ?? items.length;
  const pending = items.filter((c) => c.status === "Pending").length;

  const moderate = useMutation({
    mutationFn: ({ id, action }) =>
      action === "approve"
        ? adminApi.approveCampaign(id)
        : adminApi.rejectCampaign(id),
    onSuccess: (_res, { action }) => {
      toast.success(
        action === "approve" ? "Campaign approved" : "Campaign rejected",
      );
      queryClient.invalidateQueries({ queryKey: ["admin-campaigns"] });
    },
    onError: (err) => toast.error(err.message || "Action failed"),
  });

  const approve = (id) => moderate.mutate({ id, action: "approve" });
  const reject = (id) => moderate.mutate({ id, action: "reject" });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Campaigns <span className="text-secondary">Moderation</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {pending} pending review · {total} total
          </p>
        </div>
        {pending > 0 && (
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            {pending} pending review
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-primary to-secondary text-black"
                  : "bg-[#010410] border border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search
            size={13}
            className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2"
          />
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#010410] text-white text-sm pl-9 pr-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-secondary placeholder:text-gray-600 w-48"
          />
        </div>
      </div>

      <div className="space-y-3">
        {items.length === 0 && (
          <div className="bg-[#010410] border border-gray-800/50 rounded-xl p-16 text-center text-gray-500">
            {isLoading ? "Loading…" : "No campaigns found"}
          </div>
        )}
        {items.map((c) => {
          const raised = Number(c.amount) || 0;
          const goal = Number(c.goal) || 0;
          const pct = goal
            ? Math.min(100, Math.round((raised / goal) * 100))
            : 0;
          return (
            <div
              key={c.id}
              className="bg-[#010410] border border-gray-800/50 rounded-xl p-5 flex items-center justify-between flex-wrap gap-4 hover:border-gray-700 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-semibold text-white">{c.title}</h3>
                  <span
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[c.status]}`}
                  >
                    {STATUS_ICON[c.status]} {c.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-400">
                  <span>
                    Organizer:{" "}
                    <span className="text-secondary">{c.organizer}</span>
                  </span>
                  <span>
                    Raised:{" "}
                    <span className="font-medium text-white">
                      {formatCurrency(raised)}
                    </span>
                  </span>
                  <span>Goal: {formatCurrency(goal)}</span>
                  <span>Submitted: {c.date}</span>
                </div>
                <div className="flex items-center max-w-xs gap-2">
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{pct}%</span>
                </div>
              </div>
              {c.status === "Pending" && (
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => approve(c.id)}
                    disabled={moderate.isPending}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <CheckCircle size={15} /> Approve
                  </button>
                  <button
                    onClick={() => reject(c.id)}
                    disabled={moderate.isPending}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10  text-red-400  hover:bg-red-500/20  text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    <XCircle size={15} /> Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
