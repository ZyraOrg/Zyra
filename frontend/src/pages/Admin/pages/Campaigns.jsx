import { useState } from "react";
import { CheckCircle, XCircle, Clock, Search } from "lucide-react";

const ALL_CAMPAIGNS = [
  { id: 1, title: "Medical Aid for Ade",     organizer: "@emeka",  amount: "$4,200",  goal: "$10,000", status: "Pending",  date: "May 1, 2025"  },
  { id: 2, title: "School Supplies Drive",   organizer: "@kwame",  amount: "$1,800",  goal: "$5,000",  status: "Approved", date: "Apr 28, 2025" },
  { id: 3, title: "Flood Relief Lagos",      organizer: "@ngozi",  amount: "$12,500", goal: "$20,000", status: "Pending",  date: "May 5, 2025"  },
  { id: 4, title: "Tech Skills for Youth",   organizer: "@fatima", amount: "$3,000",  goal: "$8,000",  status: "Rejected", date: "Apr 20, 2025" },
  { id: 5, title: "Community Water Project", organizer: "@adaeze", amount: "$8,750",  goal: "$15,000", status: "Approved", date: "Apr 15, 2025" },
  { id: 6, title: "Maternal Health Fund",    organizer: "@yemi",   amount: "$2,100",  goal: "$6,000",  status: "Pending",  date: "May 8, 2025"  },
];

const FILTERS = ["All", "Pending", "Approved", "Rejected"];

const STATUS_STYLES = {
  Pending:  "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Approved: "bg-green-500/10  text-green-400  border border-green-500/20",
  Rejected: "bg-red-500/10   text-red-400    border border-red-500/20",
};

const STATUS_ICON = {
  Pending:  <Clock       size={13} className="text-yellow-400" />,
  Approved: <CheckCircle size={13} className="text-green-400"  />,
  Rejected: <XCircle     size={13} className="text-red-400"    />,
};

export default function Campaigns() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [items,  setItems]  = useState(ALL_CAMPAIGNS);

  const filtered = items.filter((c) => {
    const matchFilter = filter === "All" || c.status === filter;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.organizer.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  function approve(id) { setItems((p) => p.map((c) => c.id === id ? { ...c, status: "Approved" } : c)); }
  function reject(id)  { setItems((p) => p.map((c) => c.id === id ? { ...c, status: "Rejected" } : c)); }

  const pending = items.filter((c) => c.status === "Pending").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            Campaigns <span className="text-secondary">Moderation</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">{pending} pending review · {items.length} total</p>
        </div>
        {pending > 0 && (
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
            {pending} need review
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-primary to-secondary text-black"
                  : "bg-[#010410] border border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={13} className="absolute text-gray-500 -translate-y-1/2 left-3 top-1/2" />
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#010410] text-white text-sm pl-9 pr-4 py-2 rounded-lg border border-gray-800 focus:outline-none focus:border-secondary placeholder:text-gray-600 w-48"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((c) => {
          const raised = parseFloat(c.amount.replace(/\D/g, ""));
          const goal   = parseFloat(c.goal.replace(/\D/g, ""));
          const pct    = Math.min(100, Math.round((raised / goal) * 100));
          return (
            <div key={c.id} className="bg-[#010410] border border-gray-800/50 rounded-xl p-5 flex items-center justify-between flex-wrap gap-4 hover:border-gray-700 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="font-semibold text-white">{c.title}</h3>
                  <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${STATUS_STYLES[c.status]}`}>
                    {STATUS_ICON[c.status]} {c.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-4 mb-2 text-sm text-gray-400">
                  <span>Organizer: <span className="text-secondary">{c.organizer}</span></span>
                  <span>Raised: <span className="font-medium text-white">{c.amount}</span></span>
                  <span>Goal: {c.goal}</span>
                  <span>Submitted: {c.date}</span>
                </div>
                <div className="flex items-center max-w-xs gap-2">
                  <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{pct}%</span>
                </div>
              </div>
              {c.status === "Pending" && (
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => approve(c.id)} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-sm font-medium transition-colors">
                    <CheckCircle size={15} /> Approve
                  </button>
                  <button onClick={() => reject(c.id)}  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-500/10  text-red-400  hover:bg-red-500/20  text-sm font-medium transition-colors">
                    <XCircle    size={15} /> Reject
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}