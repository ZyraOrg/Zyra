import { transactions } from '../../constants/dashboardData';
import { formatCurrency, formatTime } from '../../utils/formatters';

export default function TransactionsList() {
  return (
    <div className="mt-4 sm:mt-6 bg-[#0d0e1a] border border-gray-800/50 rounded-lg sm:rounded-xl p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-sm sm:text-2xl font-bold">Latest Transactions</h2>
        <span className="text-[10px] sm:text-sm text-gray-400">Amount</span>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {transactions.slice(0, 3).map((tx) => (
          <div 
            key={tx.id}
            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-[#010410]"
          >
            <img 
              src={tx.image} 
              alt={tx.title}
              className="flex-shrink-0 object-cover w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="mb-0.5 sm:mb-1 text-xs sm:text-sm font-semibold line-clamp-1">{tx.title}</h4>
              <p className="text-[10px] sm:text-xs text-gray-400 line-clamp-1">
                {tx.organization}
              </p>
            </div>

            <div className="flex-shrink-0 text-right">
              <div className="text-sm sm:text-base font-semibold text-green-500">{formatCurrency(tx.amount)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6">
        <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors text-xs sm:text-sm">
          ‹
        </button>
        <button className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center font-semibold text-white bg-blue-500 rounded-lg text-xs sm:text-sm">
          1
        </button>
        <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors text-xs sm:text-sm">
          2
        </button>
        <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors text-xs sm:text-sm">
          3
        </button>
        <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors text-xs sm:text-sm">
          ›
        </button>
      </div>
    </div>
  );
}