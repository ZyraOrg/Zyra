import { campaigns } from '../../constants/dashboardData';
import { formatCurrency, formatTime } from '../../utils/formatters';

export default function CampaignsTable() {
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
            {campaigns.map((campaign, index) => (
              <tr 
                key={`${campaign.id}-${index}`}
                className="border-b border-[#1E1E2D] last:border-0"
              >
                <td className="py-3 lg:py-4 text-xs lg:text-sm">{campaign.id}</td>
                <td className="py-3 lg:py-4 text-xs lg:text-sm">{formatCurrency(campaign.amount)}</td>
                <td className="py-3 lg:py-4 text-[10px] lg:text-xs text-gray-400">{formatTime(campaign.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-3 lg:mt-4">
        <button className="flex items-center gap-1 text-xs lg:text-sm transition-colors text-cyan-400 hover:text-cyan-300">
          See all <span>›</span>
        </button>
      </div>
    </div>
  );
}