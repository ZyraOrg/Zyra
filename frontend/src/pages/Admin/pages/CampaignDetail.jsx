import { ArrowLeft, CheckCircle, XCircle, FileText } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { formatCurrency } from "../../Dashboard/utils/formatters";
import { adminApi } from "../../../services/api";

const STATUS_STYLES = {
  Pending: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Approved: "bg-green-500/10 text-green-400 border border-green-500/20",
  Rejected: "bg-red-500/10 text-red-400 border border-red-500/20",
};

const isImage = (url = "") => /\.(jpe?g|png|gif|webp|svg|avif)(\?|$)/i.test(url);
const cap = (s = "") => s.charAt(0).toUpperCase() + s.slice(1);

export default function CampaignDetail() {
  const { id: campaignId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-campaign", campaignId],
    queryFn: () => adminApi.getCampaign(campaignId).then((r) => r.data),
    enabled: !!campaignId,
  });

  const campaign = data?.campaign;

  const moderate = useMutation({
    mutationFn: ({ action }) =>
      action === "approve"
        ? adminApi.approveCampaign(campaignId)
        : adminApi.rejectCampaign(campaignId),
    onSuccess: (_res, { action }) => {
      toast.success(action === "approve" ? "Campaign approved" : "Campaign rejected");
      queryClient.invalidateQueries({ queryKey: ["admin-campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["admin-campaign", campaignId] });
    },
    onError: (err) => toast.error(err.message || "Action failed"),
  });

  const status = cap(campaign?.moderation_status || "pending");
  const raised = Number(campaign?.raised || 0);
  const goal = Number(campaign?.goal_amount || 0);
  const pct = goal ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
  const organizer =
    campaign?.profile?.foundation_name || campaign?.profile?.name || "Unknown";
  const payoutWallet = campaign?.profile?.receiving_wallet_address;
  const documents = campaign?.documents || [];

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <button
        onClick={() => navigate("/admin/campaigns")}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft size={18} /> Back to campaigns
      </button>

      {isLoading && (
        <div className="bg-[#010410] border border-gray-800 rounded-2xl p-16 text-center text-gray-400">
          Loading…
        </div>
      )}
      {isError && (
        <div className="bg-[#010410] border border-gray-800 rounded-2xl p-16 text-center text-gray-400">
          Failed to load campaign.
        </div>
      )}

      {campaign && (
        <div className="bg-[#010410] rounded-2xl border border-gray-800 overflow-hidden">
          {campaign.cover_url ? (
            <img
              src={campaign.cover_url}
              alt={campaign.name}
              className="w-full h-56 object-cover"
            />
          ) : (
            <div className="w-full h-56 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-gray-500">
              No cover photo
            </div>
          )}

          <div className="p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-white">{campaign.name}</h2>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[status] || STATUS_STYLES.Pending}`}
              >
                {status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Organizer</p>
                <p className="text-white">{organizer}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Email</p>
                <p className="text-white break-all">{campaign.organizer_email || "—"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Country</p>
                <p className="text-white">{campaign.profile?.country || "—"}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Phone</p>
                <p className="text-white">{campaign.profile?.phone || "—"}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 text-xs">Payout wallet</p>
                <p className="text-white break-all font-mono text-xs">{payoutWallet || "—"}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-xs mb-1">Objective</p>
              <p className="text-sm text-gray-200 whitespace-pre-wrap">{campaign.objective}</p>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-400">
                  Raised <span className="text-white font-medium">{formatCurrency(raised)}</span>
                </span>
                <span className="text-gray-400">Goal {formatCurrency(goal)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{pct}%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Created</p>
                <p className="text-white">
                  {campaign.created_at ? new Date(campaign.created_at).toLocaleDateString() : "—"}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">End date</p>
                <p className="text-white">
                  {campaign.end_date ? new Date(campaign.end_date).toLocaleDateString() : "—"}
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-500 text-xs mb-2">Documents ({documents.length})</p>
              {documents.length === 0 ? (
                <p className="text-sm text-gray-500">No documents uploaded</p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {documents.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg border border-gray-800 overflow-hidden hover:border-secondary transition-colors"
                    >
                      {isImage(doc.url) ? (
                        <img src={doc.url} alt={doc.name} className="w-full h-20 object-cover" />
                      ) : (
                        <div className="h-20 flex flex-col items-center justify-center gap-1 text-gray-400 p-1">
                          <FileText size={20} />
                          <span className="text-[10px] truncate w-full text-center">{doc.name}</span>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {status === "Pending" && (
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => moderate.mutate({ action: "approve" })}
                  disabled={moderate.isPending}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <CheckCircle size={16} /> Approve
                </button>
                <button
                  onClick={() => moderate.mutate({ action: "reject" })}
                  disabled={moderate.isPending}
                  className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-medium transition-colors disabled:opacity-50"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
