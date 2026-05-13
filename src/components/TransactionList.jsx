import TransactionItem from './TransactionItem';
import EmptyState from './EmptyState';

export default function TransactionList({ transactions, onDelete }) {
  if (transactions.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between px-1 mb-3">
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider dark:text-slate-500">
          {transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'}
        </p>
      </div>
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} onDelete={onDelete} />
      ))}
    </div>
  );
}
