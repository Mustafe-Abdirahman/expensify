import { formatCurrency } from '../utils/formatCurrency';
import { useApp } from '../context/AppContext';

export default function TransactionItem({ transaction, onDelete }) {
  const { categories } = useApp();
  const isIncome = transaction.type === 'income';
  const category = categories.find((c) => c.name === transaction.category);
  const catColor = category?.color || '#94a3b8';

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 animate-slide-up group">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
        isIncome ? 'bg-emerald-50' : 'bg-rose-50'
      }`}>
        {isIncome ? (
          <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-semibold text-slate-800 truncate">{transaction.title}</h4>
          <span
            className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: catColor + '18',
              color: catColor,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catColor }} />
            {transaction.category}
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          {new Date(transaction.date).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
          })}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className={`text-sm font-bold ${isIncome ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </p>
      </div>

      <button
        onClick={() => onDelete(transaction.id)}
        className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
        title="Delete"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
