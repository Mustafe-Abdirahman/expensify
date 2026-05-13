import { useState, useMemo } from 'react';

export function useTransactionFilters(transactions) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const filtered = useMemo(() => {
    let result = [...transactions];
    if (activeFilter !== 'all') {
      result = result.filter((t) => t.type === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.title.toLowerCase().includes(q));
    }
    if (sortBy === 'highest') {
      result.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'lowest') {
      result.sort((a, b) => a.amount - b.amount);
    } else {
      result.sort((a, b) => b.id.localeCompare(a.id));
    }
    return result;
  }, [transactions, activeFilter, searchQuery, sortBy]);

  return { filtered, activeFilter, setActiveFilter, searchQuery, setSearchQuery, sortBy, setSortBy };
}
