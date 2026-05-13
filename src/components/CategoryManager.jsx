import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HiOutlineXMark, HiOutlinePlus, HiOutlineExclamationCircle } from 'react-icons/hi2';

const presetColors = [
  '#f97316', '#8b5cf6', '#06b6d4', '#ef4444', '#10b981', '#3b82f6',
  '#ec4899', '#f59e0b', '#6366f1', '#14b8a6', '#84cc16', '#d946ef',
];

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substring(2, 7);

export default function CategoryManager({ isOpen, onClose }) {
  const { categories, addCategory, deleteCategory } = useApp();
  const [name, setName] = useState('');
  const [color, setColor] = useState(presetColors[0]);
  const [error, setError] = useState('');

  const handleAdd = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Name is required');
      return;
    }
    if (categories.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('Category already exists');
      return;
    }
    addCategory({ id: generateId(), name: trimmed, color });
    setName('');
    setColor(presetColors[0]);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden animate-scale-in">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">Manage Categories</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(85vh - 65px)' }}>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="New category name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
            />
            <button
              onClick={handleAdd}
              className="px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white text-sm font-medium rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-md shadow-indigo-200/50 active:scale-95"
            >
              <HiOutlinePlus className="w-4 h-4" />
            </button>
          </div>
          {error && (
            <p className="flex items-center gap-1 text-xs text-rose-500 mb-3">
              <HiOutlineExclamationCircle className="w-3.5 h-3.5" />
              {error}
            </p>
          )}

          <div className="flex flex-wrap gap-2 mb-5">
            {presetColors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-7 h-7 rounded-full border-2 transition-all duration-200 ${
                  color === c ? 'border-slate-800 scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="space-y-0.5">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full ring-2 ring-white shadow-sm" style={{ backgroundColor: cat.color }} />
                  <span className="text-sm font-medium text-slate-700">{cat.name}</span>
                </div>
                <button
                  onClick={() => deleteCategory(cat.id)}
                  className="p-1 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all rounded-lg hover:bg-rose-50"
                >
                  <HiOutlineXMark className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
