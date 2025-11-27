import { statsConfig } from '../../constants/dashboardData';
import { formatCurrency } from '../../utils/formatters';

export default function StatsCards() {
  const stats = statsConfig.map(stat => ({
    ...stat,
    value: typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value
  }));

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.title} className="bg-[#010410] rounded-xl p-5">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.iconColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6" />
              </div>

              <div className="flex-1">
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-400">{stat.title}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}