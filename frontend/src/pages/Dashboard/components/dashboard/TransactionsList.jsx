import { transactions } from '../../constants/dashboardData';
import { formatCurrency, formatTime } from '../../utils/formatters';

export default function TransactionsList() {
  return (
    <div className="mt-4 sm:mt-6 bg-[#010410] rounded-xl p-4 lg:p-6 border lg:border-0 border-gray-800/30">
      <div className="flex items-center justify-between mb-4 lg:mb-6">
        <h2 className="text-sm lg:text-2xl font-bold">Latest Transactions</h2>
        <span className="text-[10px] lg:text-sm text-gray-400">Amount</span>
      </div>

      <div className="space-y-3 lg:space-y-4">
        {/* Mobile: Show only 3, Desktop: Show all */}
        {transactions.slice(0, window.innerWidth < 1024 ? 3 : transactions.length).map((tx) => (
          <div 
            key={tx.id}
            className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 rounded-lg bg-[#0A0A0F]"
          >
            <img 
              src={tx.image} 
              alt={tx.title}
              className="flex-shrink-0 object-cover w-10 h-10 lg:w-12 lg:h-12 rounded-lg"
            />
            
            {/* Mobile Layout: Compact */}
            <div className="flex-1 min-w-0 lg:hidden">
              <h4 className="mb-1 text-xs font-semibold line-clamp-1">{tx.title}</h4>
              <p className="text-[10px] text-gray-400 line-clamp-1">
                {tx.organization}
              </p>
            </div>

            {/* Desktop Layout: Your Original */}
            <div className="hidden lg:block flex-1 min-w-0">
              <h4 className="mb-1 text-sm font-semibold">{tx.title}</h4>
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <span className="w-4 h-4">👤</span>
                {tx.organization}
              </p>
            </div>

            {/* Mobile: Right side amount */}
            <div className="flex-shrink-0 text-right lg:hidden">
              <div className="text-sm font-semibold text-green-500">{formatCurrency(tx.amount)}</div>
            </div>

            {/* Desktop: Your Original Layout */}
            <div className="hidden lg:flex flex-col items-start w-24 gap-1">
              <div className="text-xs text-gray-400">Amount</div>
              <div className="text-sm font-semibold">{formatCurrency(tx.amount)}</div>
            </div>

            <div className="hidden lg:block flex-shrink-0 w-24 text-right">
              <div className="text-xs text-gray-400">{formatTime(tx.time)}</div>
            </div>

            <div className="hidden lg:block flex-shrink-0 w-32 text-right">
              <p className="font-mono text-xs text-gray-400">{tx.recipient}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-4 lg:mt-6">
        <button className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors text-xs">
          ‹
        </button>
        <button className="w-6 h-6 lg:w-8 lg:h-8 flex items-center justify-center font-semibold text-white bg-blue-500 rounded-lg text-xs">
          1
        </button>
        <button className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors text-xs">
          2
        </button>
        <button className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors text-xs">
          3
        </button>
        <button className="w-6 h-6 lg:w-8 lg:h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors text-xs">
          ›
        </button>
      </div>
    </div>
  );
}