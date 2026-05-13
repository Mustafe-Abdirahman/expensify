import { formatCurrency } from '../utils/formatCurrency';

export default function BalanceCard({ balance, income, expenses }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-2xl p-6 md:p-8 text-white shadow-xl shadow-indigo-200/40 group">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000 ease-out" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000 delay-100 ease-out" />
      <div className="absolute top-1/3 right-16 w-20 h-20 bg-white/[0.02] rounded-full" />

      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <p className="text-indigo-200 text-xs font-semibold tracking-widest uppercase">Total Balance</p>
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m0 0v9m0 0V21" />
            </svg>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {formatCurrency(balance)}
        </h1>

        <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="text-indigo-200 text-[11px] font-medium uppercase tracking-wider">Income</p>
              <p className="text-emerald-300 font-bold text-sm">{formatCurrency(income)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </div>
            <div>
              <p className="text-indigo-200 text-[11px] font-medium uppercase tracking-wider">Expenses</p>
              <p className="text-rose-300 font-bold text-sm">{formatCurrency(expenses)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 opacity-[0.08] pointer-events-none">
        <svg width="200" height="90" viewBox="0 0 200 90" fill="none">
          <path d="M0 70 Q20 60 40 65 T80 50 T120 40 T160 35 T200 25" stroke="white" strokeWidth="2" />
          <path d="M0 70 Q20 60 40 65 T80 50 T120 40 T160 35 T200 25" stroke="url(#bg)" strokeWidth="3" />
          <defs>
            <linearGradient id="bg" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
