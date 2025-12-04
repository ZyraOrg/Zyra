import { campaigns } from '../../constants/dashboardData';
import { formatCurrency, formatTime } from '../../utils/formatters';

export default function CampaignsTable() {
  return (
    <div className="bg-[#0d0e1a] border border-gray-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6">
      <h3 className="mb-4 sm:mb-6 text-sm sm:text-lg font-semibold">My Campaigns</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="pb-2 sm:pb-3 text-[10px] sm:text-xs font-medium text-left text-gray-400">ID</th>
              <th className="pb-2 sm:pb-3 text-[10px] sm:text-xs font-medium text-left text-gray-400">Amt.</th>
              <th className="pb-2 sm:pb-3 text-[10px] sm:text-xs font-medium text-left text-gray-400">Time</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr 
                key={`${campaign.id}-${index}`}
                className="border-b border-gray-800 last:border-0"
              >
                <td className="py-3 sm:py-4 text-xs sm:text-sm">{campaign.id}</td>
                <td className="py-3 sm:py-4 text-xs sm:text-sm">{formatCurrency(campaign.amount)}</td>
                <td className="py-3 sm:py-4 text-[10px] sm:text-xs text-gray-400">{formatTime(campaign.time)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-3 sm:mt-4">
        <button className="flex items-center gap-1 text-xs sm:text-sm transition-colors text-cyan-400 hover:text-cyan-300">
          See all <span>›</span>
        </button>
      </div>
    </div>
  );
}