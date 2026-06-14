import { Users, DollarSign, Hash, Receipt } from "lucide-react";
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

export default function Analytics() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: () => adminApi.getAnalytics().then((r) => r.data),
  });

  const series = toSeries(data?.monthly);

  const totalDonations = series.reduce((sum, m) => sum + m.donations, 0);
  const totalCount     = series.reduce((sum, m) => sum + m.count, 0);
  const avgDonation    = totalCount ? totalDonations / totalCount : 0;
  const platformFees   = totalDonations * 0.03;

  const metrics = [
    { label: "Total donations", value: formatCurrency(totalDonations), icon: DollarSign },
    { label: "Transactions",    value: totalCount.toLocaleString(),    icon: Hash },
    { label: "Avg donation",    value: formatCurrency(avgDonation),    icon: Users },
    { label: "Platform fees",   value: formatCurrency(platformFees),   icon: Receipt },
  ];

  const maxD = Math.max(1, ...series.map((m) => m.donations));
  const maxC = Math.max(1, ...series.map((m) => m.count));

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Platform <span className="text-secondary">Analytics</span>
        </h1>
        <p className="mt-1 text-sm text-gray-400">Donation activity overview</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-[#010410] border border-gray-800/50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-gray-400">
                <Icon size={13} className="text-secondary" />
                <p className="text-xs">{m.label}</p>
              </div>
              <p className="mt-2 text-xl font-bold text-white">{m.value}</p>
            </div>
          );
        })}
      </div>

      {series.length === 0 ? (
        <div className="bg-[#010410] border border-gray-800/50 rounded-xl p-16 text-center text-gray-500">
          {isLoading ? "Loading…" : "No donation data yet"}
        </div>
      ) : (
        <>
          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            <div className="bg-[#010410] border border-gray-800/50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <DollarSign size={16} className="text-secondary" />
                <h2 className="text-sm font-semibold text-white">Monthly Donations</h2>
              </div>
              <div className="flex items-end h-48 gap-2">
                {series.map((m) => (
                  <div key={m.key} className="flex flex-col items-center flex-1 gap-1">
                    <span className="text-gray-500 text-[10px]">${(m.donations / 1000).toFixed(1)}k</span>
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
                <Hash size={16} className="text-secondary" />
                <h2 className="text-sm font-semibold text-white">Donations Count</h2>
              </div>
              <div className="flex items-end h-48 gap-2">
                {series.map((m) => (
                  <div key={m.key} className="flex flex-col items-center flex-1 gap-1">
                    <span className="text-gray-500 text-[10px]">{m.count.toLocaleString()}</span>
                    <div
                      className="w-full transition-opacity cursor-pointer rounded-t-md bg-gradient-to-t from-cyan-600 to-cyan-400 opacity-80 hover:opacity-100"
                      style={{ height: `${(m.count / maxC) * 100}%` }}
                      title={`${m.count} donations`}
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
                    <th className="px-5 py-3 text-left">Transactions</th>
                    <th className="px-5 py-3 text-left">Fees (3%)</th>
                    <th className="px-5 py-3 text-left">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/30">
                  {series.map((m, i) => {
                    const prev   = series[i - 1];
                    const growth = prev && prev.donations
                      ? (((m.donations - prev.donations) / prev.donations) * 100).toFixed(1)
                      : null;
                    return (
                      <tr key={m.key} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3 font-medium text-white">{m.label} {m.year}</td>
                        <td className="px-5 py-3 text-white">{formatCurrency(m.donations)}</td>
                        <td className="px-5 py-3 text-white">{m.count.toLocaleString()}</td>
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
        </>
      )}

    </div>
  );
}
