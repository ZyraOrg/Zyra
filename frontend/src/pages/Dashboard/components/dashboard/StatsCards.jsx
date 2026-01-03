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
          <div key={stat.title} className="bg-[#010410] rounded-xl p-2 lg:p-5 border lg:border-0 border-gray-800/30">
            {/* Mobile Layout: Icon Left, Text Right (Horizontal) */}
            <div className="flex items-center gap-2 lg:hidden">
              <div className={`w-6 h-6 rounded-md ${stat.iconColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold leading-tight truncate">{stat.value}</h3>
                <p className="text-[7px] font-medium text-gray-400 leading-tight line-clamp-2">{stat.title}</p>
              </div>
            </div>

            {/* Desktop Layout: Horizontal */}
            <div className="hidden lg:flex items-center gap-4">
              <div className={`w-12 h-12 rounded-lg ${stat.iconColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white [&_path]:fill-white [&_path]:stroke-white" />
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