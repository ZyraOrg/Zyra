import { useState } from "react";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { formatCurrency } from "../../../Dashboard/utils/formatters";
import { adminApi } from "../../../../services/api";

const FILTERS = ["All", "Pending", "Approved", "Rejected"];

const STATUS_ICON = {
  Pending:  <Clock       size={13} className="text-yellow-400" />,
  Approved: <CheckCircle size={13} className="text-green-400"  />,
  Rejected: <XCircle     size={13} className="text-red-400"    />,
};

const STATUS_STYLES = {
  Pending:  "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Approved: "bg-green-500/10  text-green-400  border border-green-500/20",
  Rejected: "bg-red-500/10   text-red-400    border border-red-500/20",
};

export default function CampaignModeration() {
  const [filter, setFilter] = useState("All");
  const queryClient = useQueryClient();

  const apiFilter = filter === "All" ? "all" : filter.toLowerCase();
  const { data } = useQuery({
    queryKey: ["admin-campaigns", "recent", apiFilter],
    queryFn: () => adminApi.getCampaigns({ filter: apiFilter, limit: 5 }).then((r) => r.data),
  });

  const visible = data?.campaigns ?? [];

  const moderate = useMutation({
    mutationFn: ({ id, action }) =>
      action === "approve" ? adminApi.approveCampaign(id) : adminApi.rejectCampaign(id),
    onSuccess: (_res, { action }) => {
      toast.success(action === "approve" ? "Campaign approved" : "Campaign rejected");
      queryClient.invalidateQueries({ queryKey: ["admin-campaigns"] });
    },
    onError: (err) => toast.error(err.message || "Action failed"),
  });

  const approve = (id) => moderate.mutate({ id, action: "approve" });
  const reject  = (id) => moderate.mutate({ id, action: "reject" });

  return (
    <div className="bg-[#010410] rounded-xl border border-gray-800/50 overflow-hidden">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-gray-800/50">
        <h2 className="font-bold text-white">Campaign Moderation</h2>
        <div className="flex gap-1.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-150 ${
                filter === f
                  ? "bg-gradient-to-r from-primary to-secondary text-black"
                  : "bg-[#13131A] text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-800/30">
        {visible.length === 0 && (
          <p className="px-5 py-8 text-sm text-center text-gray-500">No campaigns found</p>
        )}
        {visible.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{c.title}</p>
              <p className="text-gray-500 text-xs mt-0.5">{c.organizer} · {formatCurrency(c.amount)}</p>
            </div>
            <div className="flex items-center gap-2 ml-4 shrink-0">
              <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[c.status]}`}>
                {STATUS_ICON[c.status]}
                {c.status}
              </span>
              {c.status === "Pending" && (
                <div className="flex gap-1.5">
                  <button
                    onClick={() => approve(c.id)}
                    disabled={moderate.isPending}
                    className="p-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors disabled:opacity-50"
                  >
                    <CheckCircle size={14} />
                  </button>
                  <button
                    onClick={() => reject(c.id)}
                    disabled={moderate.isPending}
                    className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800/50">
        <span className="text-xs text-gray-500">{visible.length} campaigns</span>
        <a href="/admin/campaigns" className="text-xs text-secondary hover:underline">See all ›</a>
      </div>
    </div>
  );
}