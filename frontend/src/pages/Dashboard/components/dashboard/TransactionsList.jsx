import { useQuery } from '@tanstack/react-query';
import { ArrowDownLeft } from 'lucide-react';
import { formatCurrency, formatTime } from '../../utils/formatters';
import api from '../../../../services/api';

export default function TransactionsList() {
  const { data, isLoading } = useQuery({
    queryKey: ['transactions'],
    queryFn: () => api.getTransactions({ limit: 10 }).then((r) => r.data),
  });

  const transactions = data?.transactions ?? [];

  return (
    <div className="mt-4 sm:mt-6 bg-[#010410] rounded-xl p-4 lg:p-6 border lg:border-0 border-gray-800/30">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-sm lg:text-2xl font-bold">Latest Transactions</h2>
        <span className="text-[10px] lg:text-sm text-gray-400">Amount</span>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {isLoading ? (
          <p className="text-xs text-gray-400">Loading...</p>
        ) : transactions.length === 0 ? (
          <p className="text-xs text-gray-400">No transactions yet</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-lg bg-[#0A0A0F]"
            >
              <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                <ArrowDownLeft className="w-5 h-5 text-green-500" />
              </div>

              {/* Mobile */}
              <div className="flex-1 min-w-0 lg:hidden">
                <h4 className="mb-1 text-xs font-semibold line-clamp-1">
                  {tx.campaigns?.name || 'Unknown campaign'}
                </h4>
                <p className="text-[10px] text-gray-400 font-mono truncate">
                  {tx.tx_hash ? `${tx.tx_hash.slice(0, 16)}…` : '—'}
                </p>
              </div>

              {/* Desktop */}
              <div className="hidden lg:block flex-1 min-w-0">
                <h4 className="mb-1 text-sm font-semibold">
                  {tx.campaigns?.name || 'Unknown campaign'}
                </h4>
                <p className="text-xs text-gray-400 font-mono truncate">
                  {tx.tx_hash || '—'}
                </p>
              </div>

              {/* Mobile amount */}
              <div className="flex-shrink-0 text-right lg:hidden">
                <div className="text-sm font-semibold text-green-500">
                  {formatCurrency(Number(tx.amount || 0))}
                </div>
              </div>

              {/* Desktop amount */}
              <div className="hidden lg:flex flex-col items-start w-24 gap-1">
                <div className="text-xs text-gray-400">Amount</div>
                <div className="text-sm font-semibold text-green-500">
                  {formatCurrency(Number(tx.amount || 0))}
                </div>
              </div>

              <div className="hidden lg:block flex-shrink-0 w-24 text-right">
                <div className="text-xs text-gray-400">{formatTime(tx.created_at)}</div>
              </div>

              <div className="hidden lg:block flex-shrink-0 w-20 text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tx.status === 'completed' ? 'bg-green-500/10 text-green-400' :
                  tx.status === 'failed' ? 'bg-red-500/10 text-red-400' :
                  'bg-yellow-500/10 text-yellow-400'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
