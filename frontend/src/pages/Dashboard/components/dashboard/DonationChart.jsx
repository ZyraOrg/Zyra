import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { chartData } from '../../constants/dashboardData';

export default function DonationChart() {
  return (
    <div className="lg:col-span-2 bg-[#010410] rounded-xl p-4 lg:p-6 border lg:border-0 border-gray-800/30">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-sm lg:text-lg font-semibold">Donation Monthly Summary</h3>
        <div className="flex items-center gap-2 lg:gap-4 text-[10px] lg:text-xs">
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#2B25E0]" />
            <span className="text-gray-400">This week</span>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-[#18A0FB]" />
            <span className="text-gray-400">Last week</span>
          </div>
        </div>
      </div>
      
      {/* Mobile: 180px height, Desktop: Your original 300px */}
      <div className="h-[180px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2D" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: '#1E1E2D' }}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fill: '#6B7280', fontSize: 10 }}
              tickLine={false}
              axisLine={{ stroke: '#1E1E2D' }}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              domain={[0, 60]}
            />
            <Bar 
              dataKey="thisWeek" 
              fill="#2B25E0" 
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Bar 
              dataKey="lastWeek" 
              fill="#18A0FB" 
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}