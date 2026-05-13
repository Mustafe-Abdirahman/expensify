import { formatCurrency } from '../utils/formatCurrency';

function MiniChart({ type }) {
  if (type === 'up') {
    return (
      <svg className="w-full h-8" viewBox="0 0 120 32" fill="none">
        <path d="M0 28 Q15 24 30 26 T60 18 T90 12 T120 8" stroke="#10b981" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M0 28 Q15 24 30 26 T60 18 T90 12 T120 8" stroke="#10b981" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }
  if (type === 'down') {
    return (
      <svg className="w-full h-8" viewBox="0 0 120 32" fill="none">
        <path d="M0 4 Q15 8 30 6 T60 14 T90 20 T120 24" stroke="#f43f5e" strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M0 4 Q15 8 30 6 T60 14 T90 20 T120 24" stroke="#f43f5e" strokeWidth="1.5" fill="none" />
      </svg>
    );
  }
  return (
    <svg className="w-full h-8" viewBox="0 0 120 32" fill="none">
      <path d="M0 16 Q15 12 30 14 T60 18 T90 10 T120 16" stroke="#6366f1" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M0 16 Q15 12 30 14 T60 18 T90 10 T120 16" stroke="#6366f1" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

const cards = [
  {
    label: 'Total Income',
    key: 'income',
    chart: 'up',
    light: 'bg-emerald-50',
    darkBg: 'dark:bg-emerald-500/10',
    iconBg: 'text-emerald-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    label: 'Total Expenses',
    key: 'expenses',
    chart: 'down',
    light: 'bg-rose-50',
    darkBg: 'dark:bg-rose-500/10',
    iconBg: 'text-rose-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
      </svg>
    ),
  },
  {
    label: 'Transactions',
    key: 'count',
    chart: 'neutral',
    light: 'bg-indigo-50',
    darkBg: 'dark:bg-indigo-500/10',
    iconBg: 'text-indigo-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    label: 'Balance',
    key: 'balance',
    chart: 'up',
    light: 'bg-violet-50',
    darkBg: 'dark:bg-violet-500/10',
    iconBg: 'text-violet-600',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function SummaryCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const value = card.key === 'count' ? stats[card.key] : formatCurrency(stats[card.key]);
        return (
          <div
            key={card.key}
            className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300 group dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">{card.label}</p>
              <div className={`w-9 h-9 rounded-xl ${card.light} ${card.darkBg} flex items-center justify-center ${card.iconBg} group-hover:scale-110 transition-transform duration-300`}>
                {card.icon}
              </div>
            </div>
            <p className="text-xl font-bold text-slate-900 mb-2 dark:text-slate-100">{value}</p>
            <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <MiniChart type={card.chart} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
