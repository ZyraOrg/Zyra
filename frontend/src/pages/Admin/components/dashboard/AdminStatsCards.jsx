import { Users, Megaphone, DollarSign, TrendingUp } from "lucide-react";

const statsConfig = [
  {
    title:     "Total Users",
    value:     "12,430",
    iconColor: "bg-blue-500",
    icon:      Users,
  },
  {
    title:     "Total Donations",
    value:     "$2.4M",
    iconColor: "bg-cyan-500",
    icon:      DollarSign,
  },
  {
    title:     "Total Campaigns",
    value:     "1,284",
    iconColor: "bg-purple-500",
    icon:      Megaphone,
  },
  {
    title:     "Platform Fees",
    value:     "$72.4K",
    iconColor: "bg-pink-500",
    icon:      TrendingUp,
  },
];

export default function AdminStatsCards() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
      {statsConfig.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-[#010410] rounded-xl p-2 lg:p-5 border lg:border-0 border-gray-800/30"
          >
            {/* Mobile layout — same pattern as StatsCards */}
            <div className="flex items-center gap-2 lg:hidden">
              <div
                className={`w-6 h-6 rounded-md ${stat.iconColor} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="w-3 h-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold leading-tight truncate mb-[1px]">
                  {stat.value}
                </h3>
                <p className="text-[7px] font-medium text-gray-400 line-clamp-1">
                  {stat.title}
                </p>
              </div>
            </div>

            {/* Desktop layout — same pattern as StatsCards */}
            <div className="items-center hidden gap-4 lg:flex">
              <div
                className={`w-12 h-12 rounded-lg ${stat.iconColor} flex items-center justify-center flex-shrink-0`}
              >
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