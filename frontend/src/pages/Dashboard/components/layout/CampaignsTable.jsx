import { campaigns } from '../../constants/dashboardData';
import { formatCurrency, formatTime } from '../../utils/formatters';

export default function CampaignsTable() {
  return (
    <div className="bg-[#010410] rounded-xl p-6">
      <h3 className="mb-6 text-lg font-semibold">My Campaigns</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#1E1E2D]">
              <th className="pb-3 text-xs font-medium text-left text-gray-400">ID</th>
              <th className="pb-3 text-xs font-medium text-left text-gray-400">Amt.</th>
              <th className="pb-3 text-xs font-medium text-left text-gray-400">Time</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr 
                key={`${campaign.id}-${index}`}
                className="border-b border-[#1E1E2D] last:border-0"
              >
                <td className="py-4 text-sm">{campaign.id}</td>
                <td className="py-4 text-sm">{formatCurrency(campaign.amount)}</td>
                <td className="py-4 text-xs text-gray-400">{formatTime(campaign.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <button className="flex items-center gap-1 text-sm transition-colors text-cyan-400 hover:text-cyan-300">
          See all <span>›</span>
        </button>
      </div>
    </div>
  );
}