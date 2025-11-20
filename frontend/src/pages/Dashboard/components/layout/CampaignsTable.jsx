import { campaigns } from '../../constants/dashboardData';
import { formatCurrency, formatTime } from '../../utils/formatters';

export default function CampaignsTable() {
  return (
    <div className="bg-[#13131A] rounded-xl p-6 border border-[#1E1E2D]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">My Campaigns</h3>
        <button className="text-xs text-blue-400 transition-colors hover:text-blue-300">
          See all →
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E1E2D]">
              <th className="px-2 pb-3 text-xs font-medium text-left text-gray-400">ID</th>
              <th className="px-2 pb-3 text-xs font-medium text-left text-gray-400">Amt.</th>
              <th className="px-2 pb-3 text-xs font-medium text-left text-gray-400">Time</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr 
                key={`${campaign.id}-${index}`}
                className="border-b border-[#1E1E2D] last:border-0 hover:bg-[#0A0A0F] transition-colors"
              >
                <td className="px-2 py-4 text-sm">{campaign.id}</td>
                <td className="px-2 py-4 text-sm">{formatCurrency(campaign.amount)}</td>
                <td className="px-2 py-4 text-xs text-gray-400">{formatTime(campaign.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}