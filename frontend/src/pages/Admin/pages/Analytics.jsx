import { TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatCurrency } from "../../Dashboard/utils/formatters";
import { adminApi } from "../../../services/api";

// Backend returns { monthly: { "2025-01": { donations, count }, ... } }.
// Turn it into a chronologically sorted array with display labels.
function toSeries(monthly = {}) {
  return Object.entries(monthly)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => {
      const [year, month] = key.split("-");
      const label = new Date(Number(year), Number(month) - 1, 1).toLocaleDateString("en-US", {
        month: "short",
      });
      return {
        key,
        label,
        year,
        donations: Number(value.donations || 0),
        count: Number(value.count || 0),
      };
    });
}

function lastSixMonths() {
  const out = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    out.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-US", { month: "short" }),
      year: String(d.getFullYear()),
      donations: 0,
      count: 0,
    });
  }
  return out;
}

export default function Analytics() {
  const { data } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: () => adminApi.getAnalytics().then((r) => r.data),
  });

  const series = toSeries(data?.monthly);

  const totalDonations = series.reduce((sum, m) => sum + m.donations, 0);
  const totalCount     = series.reduce((sum, m) => sum + m.count, 0);
  const avgDonation    = totalCount ? totalDonations / totalCount : 0;

  const METRICS = [
    { label: "Avg donation",     value: formatCurrency(avgDonation), delta: null, up: true },
    { label: "Conversion rate",  value: "—", delta: null, up: true  },
    { label: "Crypto donations", value: "—", delta: null, up: true  },
    { label: "Fiat donations",   value: "—", delta: null, up: true  },
    { label: "Refund rate",      value: "—", delta: null, up: true  },
    { label: "Active wallets",   value: "—", delta: null, up: true  },
  ];

  const chartData = series.length ? series : lastSixMonths();
  const maxD = Math.max(1, ...chartData.map((m) => m.donations));

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
            {m.delta !== null ? (
              <p className={`text-xs mt-1 flex items-center gap-1 font-medium ${m.up ? "text-green-400" : "text-red-400"}`}>
                {m.up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {m.delta}
              </p>
            ) : (
              <p className="mt-1 text-xs text-gray-600">—</p>
            )}
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
            {chartData.map((m) => (
              <div key={m.key} className="flex flex-col items-center flex-1 gap-1">
                <span className="text-gray-500 text-[10px]">${(m.donations / 1000).toFixed(0)}k</span>
                <div
                  className="w-full transition-opacity cursor-pointer rounded-t-md bg-gradient-to-t from-primary to-secondary opacity-80 hover:opacity-100"
                  style={{ height: `${(m.donations / maxD) * 100}%` }}
                  title={formatCurrency(m.donations)}
                />
                <span className="text-gray-500 text-[10px]">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#010410] border border-gray-800/50 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-5">
            <Users size={16} className="text-secondary" />
            <h2 className="text-sm font-semibold text-white">User Growth</h2>
          </div>
          {/* No user-growth data from the backend yet — bars render empty with "—" labels. */}
          <div className="flex items-end h-48 gap-2">
            {chartData.map((m) => (
              <div key={m.key} className="flex flex-col items-center flex-1 gap-1">
                <span className="text-gray-500 text-[10px]">—</span>
                <div
                  className="w-full transition-opacity rounded-t-md bg-gradient-to-t from-cyan-600 to-cyan-400 opacity-30"
                  style={{ height: "0%" }}
                />
                <span className="text-gray-500 text-[10px]">{m.label}</span>
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
              {series.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-gray-500">
                    No earnings yet
                  </td>
                </tr>
              ) : series.map((m, i) => {
                const prev   = series[i - 1];
                const growth = prev && prev.donations
                  ? (((m.donations - prev.donations) / prev.donations) * 100).toFixed(1)
                  : null;
                return (
                  <tr key={m.key} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3 font-medium text-white">{m.label} {m.year}</td>
                    <td className="px-5 py-3 text-white">{formatCurrency(m.donations)}</td>
                    <td className="px-5 py-3 text-gray-600">—</td>
                    <td className="px-5 py-3 font-medium text-secondary">{formatCurrency(m.donations * 0.03)}</td>
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
