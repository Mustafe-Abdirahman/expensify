import { HiOutlineMagnifyingGlass, HiOutlineFunnel } from 'react-icons/hi2';

const sortOptions = [
  { label: 'Latest', value: 'latest' },
  { label: 'Highest Amount', value: 'highest' },
  { label: 'Lowest Amount', value: 'lowest' },
];

export default function FilterTabs({
  activeFilter, onFilterChange,
  searchQuery, onSearchChange,
  sortBy, onSortChange,
}) {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit dark:bg-slate-700">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeFilter === f.value
                ? 'bg-white text-indigo-600 shadow-sm shadow-slate-200 dark:bg-slate-800 dark:text-indigo-400 dark:shadow-slate-900'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative flex-1 sm:flex-none">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full sm:w-52 pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all dark:bg-slate-700/50 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-500"
          />
        </div>

        <div className="relative">
          <HiOutlineFunnel className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all appearance-none cursor-pointer dark:bg-slate-700/50 dark:border-slate-600 dark:text-slate-100"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
