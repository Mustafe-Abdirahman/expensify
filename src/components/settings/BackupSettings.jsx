import { useState } from 'react';
import { saveAs } from 'file-saver';
import { useApp } from '../../context/AppContext';
import { HiOutlineArchiveBox, HiOutlineArrowDownOnSquare, HiOutlineArrowUpOnSquare, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2';

export default function BackupSettings() {
  const { transactions, categories, replaceTransactions, replaceCategories } = useApp();
  const [restoreStatus, setRestoreStatus] = useState(null);

  const handleBackup = () => {
    const data = { transactions, categories };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, `expense-tracker-backup-${new Date().toISOString().split('T')[0]}.json`);
  };

  const handleRestore = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.transactions) replaceTransactions(data.transactions);
          if (data.categories) replaceCategories(data.categories);
          setRestoreStatus({ type: 'success', message: `Restored ${data.transactions?.length || 0} transactions and ${data.categories?.length || 0} categories.` });
        } catch {
          setRestoreStatus({ type: 'error', message: 'Invalid backup file.' });
        }
        setTimeout(() => setRestoreStatus(null), 5000);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0 dark:bg-amber-500/10">
          <HiOutlineArchiveBox className="w-6 h-6 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-900 mb-1 dark:text-slate-100">Backup & Restore</h3>
          <p className="text-sm text-slate-400 mb-4 dark:text-slate-400">
            Create a full JSON backup or restore from a previous backup
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleBackup}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 text-white text-sm font-semibold rounded-xl hover:from-amber-700 hover:to-amber-800 shadow-md shadow-amber-200/50 dark:shadow-amber-800/30 transition-all duration-200 active:scale-95"
            >
              <HiOutlineArrowDownOnSquare className="w-4 h-4" />
              Download Backup
            </button>
            <button
              onClick={handleRestore}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-700 text-sm font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 active:scale-95 dark:bg-slate-700 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-600"
            >
              <HiOutlineArrowUpOnSquare className="w-4 h-4" />
              Restore Backup
            </button>
          </div>
          {restoreStatus && (
            <div className={`mt-3 flex items-center gap-2 text-sm ${
              restoreStatus.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
            } animate-slide-up`}>
              {restoreStatus.type === 'success' ? <HiOutlineCheckCircle className="w-4 h-4" /> : <HiOutlineExclamationCircle className="w-4 h-4" />}
              {restoreStatus.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
