import { TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";

const MONTHLY = [
  { month: "Jan", donations: 180000, users: 8200  },
  { month: "Feb", donations: 210000, users: 9100  },
  { month: "Mar", donations: 195000, users: 9800  },
  { month: "Apr", donations: 240000, users: 10500 },
  { month: "May", donations: 280000, users: 11200 },
  { month: "Jun", donations: 320000, users: 12430 },
];

const METRICS = [
  { label: "Avg donation",     value: "$194",  delta: "+12.4%", up: true  },
  { label: "Conversion rate",  value: "68%",   delta: "+4.1%",  up: true  },
  { label: "Crypto donations", value: "42%",   delta: "-2.1%",  up: false },
  { label: "Fiat donations",   value: "58%",   delta: "+2.1%",  up: true  },
  { label: "Refund rate",      value: "0.8%",  delta: "-0.3%",  up: true  },
  { label: "Active wallets",   value: "3,241", delta: "+18.2%", up: true  },
];

const maxD = Math.max(...MONTHLY.map((m) => m.donations));
const maxU = Math.max(...MONTHLY.map((m) => m.users));

export default function Analytics() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Platform <span className="text-secondary">Analytics</span>
        </h1>
        <p className="mt-1 text-sm text-gray-400">Last 6 months overview</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {METRICS.map((m) => (
          <div key={m.label} className="bg-[#010410] border border-gray-800/50 rounded-xl p-4">
            <p className="text-xs text-gray-400">{m.label}</p>
            <p className="mt-1 text-xl font-bold text-white">{m.value}</p>
            <p className={`text-xs mt-1 flex items-center gap-1 font-medium ${m.up ? "text-green-400" : "text-red-400"}`}>
              {m.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {m.delta}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <div className="bg-[#010410] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <DollarSign size={16} className="text-secondary" />
            <h2 className="text-sm font-semibold text-white">Monthly Donations</h2>
          </div>
          <div className="flex items-end h-48 gap-2">
            {MONTHLY.map((m) => (
              <div key={m.month} className="flex flex-col items-center flex-1 gap-1">
                <span className="text-gray-500 text-[10px]">${(m.donations / 1000).toFixed(0)}k</span>
                <div
                  className="w-full transition-opacity cursor-pointer rounded-t-md bg-gradient-to-t from-primary to-secondary opacity-80 hover:opacity-100"
                  style={{ height: `${(m.donations / maxD) * 100}%` }}
                  title={`$${m.donations.toLocaleString()}`}
                />
                <span className="text-gray-500 text-[10px]">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#010410] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <Users size={16} className="text-secondary" />
            <h2 className="text-sm font-semibold text-white">User Growth</h2>
          </div>
          <div className="flex items-end h-48 gap-2">
            {MONTHLY.map((m) => (
              <div key={m.month} className="flex flex-col items-center flex-1 gap-1">
                <span className="text-gray-500 text-[10px]">{(m.users / 1000).toFixed(1)}k</span>
                <div
                  className="w-full transition-opacity cursor-pointer rounded-t-md bg-gradient-to-t from-cyan-600 to-cyan-400 opacity-80 hover:opacity-100"
                  style={{ height: `${(m.users / maxU) * 100}%` }}
                  title={m.users.toLocaleString()}
                />
                <span className="text-gray-500 text-[10px]">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Monthly table */}
      <div className="bg-[#010410] border border-gray-800/50 rounded-xl overflow-hidden">
        <div className="px-5 py-4 text-sm font-semibold text-white border-b border-gray-800/50">
          Monthly Breakdown
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs tracking-wider text-gray-500 uppercase border-b border-gray-800/50">
                <th className="px-5 py-3 text-left">Month</th>
                <th className="px-5 py-3 text-left">Donations</th>
                <th className="px-5 py-3 text-left">Users</th>
                <th className="px-5 py-3 text-left">Fees (3%)</th>
                <th className="px-5 py-3 text-left">Growth</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30">
              {MONTHLY.map((m, i) => {
                const prev   = MONTHLY[i - 1];
                const growth = prev ? (((m.donations - prev.donations) / prev.donations) * 100).toFixed(1) : null;
                return (
                  <tr key={m.month} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 font-medium text-white">{m.month} 2025</td>
                    <td className="px-5 py-3 text-white">${m.donations.toLocaleString()}</td>
                    <td className="px-5 py-3 text-white">{m.users.toLocaleString()}</td>
                    <td className="px-5 py-3 font-medium text-secondary">${(m.donations * 0.03).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      {growth !== null ? (
                        <span className={`text-xs font-medium ${parseFloat(growth) >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {parseFloat(growth) >= 0 ? "+" : ""}{growth}%
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}