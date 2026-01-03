import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { chartData } from '../../constants/dashboardData';

export default function DonationChart() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="lg:col-span-2 bg-[#010410] rounded-xl p-4 lg:p-6 border lg:border-0 border-gray-800/30">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h3 className="text-sm lg:text-lg font-semibold">Donation Monthly Summary</h3>
        
        {/* Legend - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:flex items-center gap-4 text-xs">
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
      
      {/* Mobile: 180px height, Desktop: 300px */}
      <div className="h-[180px] lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            barGap={isMobile ? 2 : 4}
            barCategoryGap={isMobile ? '20%' : '10%'}
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
              barSize={isMobile ? 10 : 24}
            />
            <Bar 
              dataKey="lastWeek" 
              fill="#18A0FB" 
              radius={[4, 4, 0, 0]}
              barSize={isMobile ? 10 : 24}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}