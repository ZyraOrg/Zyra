import { transactions } from '../../constants/dashboardData';
import { formatCurrency, formatTime } from '../../utils/formatters';

export default function TransactionsList() {
  return (
    <div className="mt-4 sm:mt-6 bg-[#010410] rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest Transactions</h2>
        <span className="text-sm text-gray-400">To:</span>
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div 
            key={tx.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-[#0A0A0F]"
          >
            <img 
              src={tx.image} 
              alt={tx.title}
              className="flex-shrink-0 object-cover w-12 h-12 rounded-lg"
            />
            
            <div className="flex-1 min-w-0">
              <h4 className="mb-1 text-sm font-semibold">{tx.title}</h4>
              <p className="flex items-center gap-1 text-xs text-gray-400">
                <span className="w-4 h-4">👤</span>
                {tx.organization}
              </p>
            </div>

            <div className="flex flex-col items-start w-24 gap-1">
              <div className="text-xs text-gray-400">Amount</div>
              <div className="text-sm font-semibold">{formatCurrency(tx.amount)}</div>
            </div>

            <div className="flex-shrink-0 w-24 text-right">
              <div className="text-xs text-gray-400">{formatTime(tx.time)}</div>
            </div>

            <div className="flex-shrink-0 w-32 text-right">
              <p className="font-mono text-xs text-gray-400">{tx.recipient}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-6">
        <button className="w-8 h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors">
          ‹
        </button>
        <button className="flex items-center justify-center w-8 h-8 font-semibold text-white bg-blue-500 rounded-lg">
          1
        </button>
        <button className="w-8 h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors">
          2
        </button>
        <button className="w-8 h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors">
          3
        </button>
        <button className="w-8 h-8 rounded-lg bg-[#13131A] flex items-center justify-center text-gray-400 hover:bg-[#1A1A20] transition-colors">
          ›
        </button>
      </div>
    </div>
  );
}