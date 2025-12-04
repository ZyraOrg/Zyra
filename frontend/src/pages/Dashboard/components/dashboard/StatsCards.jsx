import { statsConfig } from '../../constants/dashboardData';
import { formatCurrency } from '../../utils/formatters';

export default function StatsCards() {
  const stats = statsConfig.map(stat => ({
    ...stat,
    value: typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value
  }));

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div key={stat.title} className="bg-[#010410] rounded-xl p-3 lg:p-5 border lg:border-0 border-gray-800/30">
            {/* Mobile Layout: Vertical Stack */}
            <div className="flex flex-col gap-2 lg:hidden">
              <div className={`w-8 h-8 rounded-lg ${stat.iconColor} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{stat.value}</h3>
                <p className="text-[10px] font-medium text-gray-400 leading-tight">{stat.title}</p>
              </div>
            </div>

            {/* Desktop Layout: Your Original Horizontal */}
            <div className="hidden lg:flex items-center gap-4">
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