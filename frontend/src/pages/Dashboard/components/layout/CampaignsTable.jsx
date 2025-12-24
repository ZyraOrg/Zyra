import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../services/api';
import { formatCurrency } from '../../utils/formatters';

function formatTimeLeft(endDate) {
  if (!endDate) return '-';
  const end = new Date(endDate);
  if (Number.isNaN(end.getTime())) return '-';

  const diffInMinutes = Math.floor((end.getTime() - Date.now()) / 60000);
  if (diffInMinutes <= 0) return 'Ended';
  if (diffInMinutes < 60) return `${diffInMinutes} mins left`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours left`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days left`;
}

export default function CampaignsTable() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setIsLoading(true);
        const { data } = await api.getMyCampaigns({ limit: 4, offset: 0 });
        if (cancelled) return;
        setCampaigns(Array.isArray(data?.campaigns) ? data.campaigns : []);
      } catch (err) {
        if (cancelled) return;
        setCampaigns([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-[#010410] rounded-xl p-4 lg:p-6 border lg:border-0 border-gray-800/30">
      <h3 className="mb-4 lg:mb-6 text-sm lg:text-lg font-semibold">My Campaigns</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E1E2D]">
              <th className="pb-2 lg:pb-3 text-[10px] lg:text-xs font-medium text-left text-gray-400">ID</th>
              <th className="pb-2 lg:pb-3 text-[10px] lg:text-xs font-medium text-left text-gray-400">Amt.</th>
              <th className="pb-2 lg:pb-3 text-[10px] lg:text-xs font-medium text-left text-gray-400">Time</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="border-b border-[#1E1E2D] last:border-0">
                <td className="py-3 lg:py-4 text-xs lg:text-sm text-gray-400" colSpan={3}>
                  Loading...
                </td>
              </tr>
            ) : campaigns.length === 0 ? (
              <tr className="border-b border-[#1E1E2D] last:border-0">
                <td className="py-3 lg:py-4 text-xs lg:text-sm text-gray-400" colSpan={3}>
                  No campaigns yet
                </td>
              </tr>
            ) : (
              campaigns.map((campaign) => (
                <tr
                  key={campaign.id}
                  className="border-b border-[#1E1E2D] last:border-0"
                >
                  <td className="py-3 lg:py-4 text-xs lg:text-sm">
                    <button
                      type="button"
                      onClick={() => navigate(`/dashboard/campaigns/${campaign.id}`)}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                      title="View campaign"
                    >
                      {campaign.id}
                    </button>
                  </td>
                  <td className="py-3 lg:py-4 text-xs lg:text-sm">
                    {formatCurrency(Number(campaign.goal_amount || 0))}
                  </td>
                  <td className="py-3 lg:py-4 text-[10px] lg:text-xs text-gray-400">
                    {formatTimeLeft(campaign.end_date)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-3 lg:mt-4">
        <button
          type="button"
          onClick={() => navigate('/dashboard/campaigns')}
          className="flex items-center gap-1 text-xs lg:text-sm transition-colors text-cyan-400 hover:text-cyan-300"
        >
          See all <span>›</span>
        </button>
      </div>
    </div>
  );
}