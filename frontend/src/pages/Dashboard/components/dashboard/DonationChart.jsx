import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { chartData } from '../../constants/dashboardData';

export default function DonationChart() {
  return (
    <div className="lg:col-span-2 bg-[#0d0e1a] border border-gray-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-sm sm:text-lg font-semibold">Donation Monthly Summary</h3>
        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs">
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#0A36F7]" />
            <span className="text-gray-400">This</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#91F2F9]" />
            <span className="text-gray-400">Last</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200} className="sm:h-[300px]">
        <BarChart 
          data={chartData}
          margin={{ top: 10, right: 0, left: -20, bottom: 0 }}
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
            fill="#0A36F7" 
            radius={[4, 4, 0, 0]}
            barSize={16}
          />
          <Bar 
            dataKey="lastWeek" 
            fill="#91F2F9" 
            radius={[4, 4, 0, 0]}
            barSize={16}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}