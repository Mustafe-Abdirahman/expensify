import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HiOutlineTag } from 'react-icons/hi2';

export default function TransactionForm({ onSubmit }) {
  const { categories } = useApp();
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense',
  });
  const [errors, setErrors] = useState({});
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (!form.amount) newErrors.amount = 'Amount is required';
    else if (isNaN(form.amount) || Number(form.amount) <= 0) newErrors.amount = 'Must be positive';
    if (!form.category) newErrors.category = 'Select a category';
    if (!form.date) newErrors.date = 'Date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      id: Date.now().toString(36) + Math.random().toString(36).substring(2, 9),
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      type: form.type,
    });
    setForm((prev) => ({
      title: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      type: prev.type,
    }));
    setErrors({});
    titleRef.current?.focus();
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-indigo-200/50">
          <HiOutlineTag className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Add Transaction</h2>
          <p className="text-xs text-slate-400">Record a new income or expense</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4">
        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Title</label>
          <input
            ref={titleRef}
            type="text"
            placeholder="e.g. Grocery shopping"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
              errors.title
                ? 'border-rose-200 focus:border-rose-400 focus:ring-rose-500/20'
                : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/20'
            }`}
          />
          {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
            <input
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
              className={`w-full pl-7 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                errors.amount
                  ? 'border-rose-200 focus:border-rose-400 focus:ring-rose-500/20'
                  : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/20'
              }`}
            />
          </div>
          {errors.amount && <p className="text-xs text-rose-500 mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Category</label>
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
              errors.category
                ? 'border-rose-200 focus:border-rose-400 focus:ring-rose-500/20'
                : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/20'
            }`}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-rose-500 mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 transition-all ${
              errors.date
                ? 'border-rose-200 focus:border-rose-400 focus:ring-rose-500/20'
                : 'border-slate-200 focus:border-indigo-400 focus:ring-indigo-500/20'
            }`}
          />
          {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Type</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => handleChange('type', 'expense')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                form.type === 'expense'
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-200/50'
                  : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-rose-200 hover:text-rose-600'
              }`}
            >
              Expense
            </button>
            <button
              type="button"
              onClick={() => handleChange('type', 'income')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                form.type === 'income'
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200/50'
                  : 'bg-slate-50 text-slate-500 border border-slate-200 hover:border-emerald-200 hover:text-emerald-600'
              }`}
            >
              Income
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-semibold py-3 rounded-xl hover:from-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-200/50 transition-all duration-200 active:scale-[0.98]"
      >
        Add Transaction
      </button>
    </form>
  );
}
