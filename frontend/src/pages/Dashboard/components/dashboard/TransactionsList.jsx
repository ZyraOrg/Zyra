import { transactions } from '../../constants/dashboardData';
import { formatCurrency, formatTime } from '../../utils/formatters';

export default function TransactionsList() {
  return (
    <div className="mt-4 sm:mt-6 bg-[#13131A] rounded-xl p-6 border border-[#1E1E2D]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Latest Transactions</h3>
        <span className="text-xs text-gray-400">To:</span>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div 
            key={tx.id}
            className="flex items-start gap-4 p-4 rounded-lg bg-[#0A0A0F] border border-[#1E1E2D] hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <span className="text-sm font-semibold text-white">
                {tx.organization.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="mb-1 text-sm font-semibold truncate">{tx.title}</h4>
              <p className="mb-2 text-xs text-gray-400">— from {tx.organization}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <span className="font-semibold text-green-400">Amount</span>
                  <span className="font-bold text-white">{formatCurrency(tx.amount)}</span>
                </span>
                <span>{formatTime(tx.time)}</span>
              </div>
            </div>
            <div className="flex-shrink-0 hidden text-right sm:block">
              <p className="font-mono text-xs text-gray-500">{tx.recipient}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button className="w-8 h-8 rounded-lg bg-[#0A0A0F] border border-[#1E1E2D] flex items-center justify-center text-gray-400 hover:border-gray-600 transition-colors">
          1
        </button>
        <button className="flex items-center justify-center w-8 h-8 font-semibold text-white bg-blue-500 rounded-lg">
          2
        </button>
        <button className="w-8 h-8 rounded-lg bg-[#0A0A0F] border border-[#1E1E2D] flex items-center justify-center text-gray-400 hover:border-gray-600 transition-colors">
          3
        </button>
        <button className="w-8 h-8 rounded-lg bg-[#0A0A0F] border border-[#1E1E2D] flex items-center justify-center text-gray-400 hover:border-gray-600 transition-colors">
          ...
        </button>
      </div>
    </div>
  );
}