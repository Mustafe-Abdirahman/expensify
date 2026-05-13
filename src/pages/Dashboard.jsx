import { useApp } from '../context/AppContext';
import { useTransactionFilters } from '../hooks/useTransactionFilters';
import BalanceCard from '../components/BalanceCard';
import SummaryCards from '../components/SummaryCards';
import TransactionForm from '../components/TransactionForm';
import FilterTabs from '../components/FilterTabs';
import TransactionList from '../components/TransactionList';

export default function Dashboard() {
  const { transactions, stats, addTransaction, deleteTransaction } = useApp();
  const { filtered, activeFilter, setActiveFilter, searchQuery, setSearchQuery, sortBy, setSortBy } =
    useTransactionFilters(transactions);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-6 max-w-6xl mx-auto">
      <BalanceCard balance={stats.balance} income={stats.income} expenses={stats.expenses} />
      <SummaryCards stats={stats} />
      <TransactionForm onSubmit={addTransaction} />
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
