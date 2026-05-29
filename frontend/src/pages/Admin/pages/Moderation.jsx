import { useState } from "react";
import { ShieldAlert, Eye, Trash2, CheckCircle } from "lucide-react";

const FLAGS = [
  { id: 1, title: "Suspicious withdrawal request", user: "@unknown_user", type: "Financial", severity: "High",   date: "May 10, 2025", resolved: false },
  { id: 2, title: "Duplicate campaign detected",   user: "@emeka2",       type: "Duplicate", severity: "Medium", date: "May 9, 2025",  resolved: false },
  { id: 3, title: "Misleading campaign title",     user: "@xyz123",       type: "Content",   severity: "Low",    date: "May 8, 2025",  resolved: false },
  { id: 4, title: "Unverified organizer",          user: "@newuser",      type: "Identity",  severity: "High",   date: "May 7, 2025",  resolved: false },
  { id: 5, title: "Spam donation pattern",         user: "@bot_acc",      type: "Fraud",     severity: "High",   date: "May 6, 2025",  resolved: false },
  { id: 6, title: "Inappropriate campaign image",  user: "@creative99",   type: "Content",   severity: "Medium", date: "May 5, 2025",  resolved: true  },
];

const SEV_STYLES = {
  High:   "bg-red-500/10    text-red-400    border border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  Low:    "bg-gray-500/10   text-gray-400   border border-gray-500/20",
};

const FILTERS = ["All", "High", "Medium", "Low", "Resolved"];

export default function Moderation() {
  const [filter, setFilter] = useState("All");
  const [items,  setItems]  = useState(FLAGS);

  const filtered = items.filter((f) => {
    if (filter === "Resolved") return f.resolved;
    if (filter === "All")      return !f.resolved;
    return !f.resolved && f.severity === filter;
  });

  function resolve(id) { setItems((p) => p.map((f) => f.id === id ? { ...f, resolved: true  } : f)); }
  function dismiss(id) { setItems((p) => p.filter((f) => f.id !== id)); }

  const highCount = items.filter((f) => !f.resolved && f.severity === "High").length;

  return (
    <div className="space-y-6">

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
            <ShieldAlert size={26} className="text-secondary" />
            Moderation <span className="text-secondary">Queue</span>
          </h1>
          <p className="mt-1 text-sm text-gray-400">
            {items.filter((f) => !f.resolved).length} active flags
          </p>
        </div>
        {highCount > 0 && (
          <span className="px-3 py-1.5 rounded-full text-sm font-medium bg-red-500/10 text-red-400 border border-red-500/20">
            {highCount} high severity
          </span>
        )}
      </div>

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

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-[#010410] border border-gray-800/50 rounded-xl p-16 text-center">
            <CheckCircle size={40} className="mx-auto mb-3 text-green-400" />
            <p className="font-semibold text-white">All clear</p>
            <p className="mt-1 text-sm text-gray-400">No flags in this category</p>
          </div>
        ) : (
          filtered.map((flag) => (
            <div key={flag.id} className="bg-[#010410] border border-gray-800/50 rounded-xl p-5 flex items-start justify-between gap-4 flex-wrap hover:border-gray-700 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-semibold text-white">{flag.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${SEV_STYLES[flag.severity]}`}>
                    {flag.severity}
                  </span>
                  {flag.resolved && (
                    <span className="px-2 py-1 text-xs font-medium text-green-400 border rounded-full bg-green-500/10 border-green-500/20">
                      Resolved
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <span>User: <span className="text-secondary">{flag.user}</span></span>
                  <span>Type: {flag.type}</span>
                  <span>Reported: {flag.date}</span>
                </div>
              </div>
              {!flag.resolved && (
                <div className="flex gap-2 shrink-0">
                  <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 text-gray-400 hover:text-white text-xs transition-colors">
                    <Eye size={13} /> Review
                  </button>
                  <button onClick={() => resolve(flag.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs transition-colors">
                    <CheckCircle size={13} /> Resolve
                  </button>
                  <button onClick={() => dismiss(flag.id)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-colors">
                    <Trash2 size={13} /> Dismiss
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}