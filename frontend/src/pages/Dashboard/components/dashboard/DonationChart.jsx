import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { chartData } from '../../constants/dashboardData';

export default function DonationChart() {
  return (
    <div className="lg:col-span-2 bg-[#010410] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Donation Monthly Summary</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#2B25E0]" />
            <span className="text-gray-400">This week</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#18A0FB]" />
            <span className="text-gray-400">Last week</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart 
          data={chartData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#1E1E2D" vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke="#6B7280"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            tickLine={false}
            axisLine={{ stroke: '#1E1E2D' }}
          />
          <YAxis 
            stroke="#6B7280"
            tick={{ fill: '#6B7280', fontSize: 12 }}
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
  );
}