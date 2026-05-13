import { useApp } from '../context/AppContext';
import { useTransactionFilters } from '../hooks/useTransactionFilters';
import FilterTabs from '../components/FilterTabs';
import TransactionList from '../components/TransactionList';

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useApp();
  const { filtered, activeFilter, setActiveFilter, searchQuery, setSearchQuery, sortBy, setSortBy } =
    useTransactionFilters(transactions);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">All Transactions</h3>
        <p className="text-sm text-slate-400 dark:text-slate-500">{transactions.length} total transactions</p>
      </div>
      <div className="space-y-4">
        <FilterTabs
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <TransactionList transactions={filtered} onDelete={deleteTransaction} />
      </div>
    </div>
  );
}
