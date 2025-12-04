import { statsConfig } from '../../constants/dashboardData';
import { formatCurrency } from '../../utils/formatters';

export default function StatsCards() {
  const stats = statsConfig.map(stat => ({
    ...stat,
    value: typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value
  }));

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.title} className="bg-[#0d0e1a] border border-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg ${stat.iconColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl sm:text-3xl font-bold">{stat.value}</h3>
                <p className="text-[10px] sm:text-sm font-medium text-gray-400 leading-tight">{stat.title}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}