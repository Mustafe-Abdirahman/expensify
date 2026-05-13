import { createContext, useContext, useMemo, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const defaultCategories = [
  { id: '1', name: 'Food', color: '#f97316' },
  { id: '2', name: 'Shopping', color: '#8b5cf6' },
  { id: '3', name: 'Transport', color: '#06b6d4' },
  { id: '4', name: 'Bills', color: '#ef4444' },
  { id: '5', name: 'Salary', color: '#10b981' },
  { id: '6', name: 'Freelance', color: '#3b82f6' },
  { id: '7', name: 'Entertainment', color: '#ec4899' },
];

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [categories, setCategories] = useLocalStorage('categories', defaultCategories);

  const addTransaction = useCallback((t) => {
    setTransactions((prev) => [t, ...prev]);
  }, [setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, [setTransactions]);

  const addCategory = useCallback((cat) => {
    setCategories((prev) => [...prev, cat]);
  }, [setCategories]);

  const deleteCategory = useCallback((id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }, [setCategories]);

  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((s, t) => s + t.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((s, t) => s + t.amount, 0);
    return { balance: income - expenses, income, expenses, count: transactions.length };
  }, [transactions]);

  const value = useMemo(() => ({
    transactions, categories, stats,
    addTransaction, deleteTransaction, addCategory, deleteCategory,
  }), [transactions, categories, stats, addTransaction, deleteTransaction, addCategory, deleteCategory]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
