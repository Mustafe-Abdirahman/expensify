export default function EmptyState({ isFiltered }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-5 dark:bg-slate-700">
        <svg className="w-10 h-10 text-slate-300 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-slate-700 mb-1 dark:text-slate-300">
        {isFiltered ? 'No transactions found' : 'No transactions yet'}
      </h3>
      <p className="text-sm text-slate-400 text-center max-w-xs dark:text-slate-500">
        {isFiltered
          ? 'Try a different search or filter.'
          : 'Add your first transaction to start tracking your finances.'}
      </p>
    </div>
  );
}
