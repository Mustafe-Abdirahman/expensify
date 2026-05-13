import { useState, useRef, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { useApp } from '../../context/AppContext';
import { HiOutlineArrowUpTray, HiOutlineXMark, HiOutlineCheckCircle, HiOutlineExclamationCircle } from 'react-icons/hi2';

export default function ImportDataCard() {
  const { transactions, categories, replaceTransactions, replaceCategories, mergeTransactions } = useApp();
  const [dragOver, setDragOver] = useState(false);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const [mergeMode, setMergeMode] = useState('replace');
  const fileRef = useRef(null);

  const resetResult = () => {
    setTimeout(() => setResult(null), 5000);
  };

  const processFile = useCallback((file) => {
    if (!file) return;
    setImporting(true);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const wb = XLSX.read(data, { type: 'array' });

        const errors = [];
        let importedTxns = [];
        let importedCats = [];

        const txnSheet = wb.Sheets['Transactions'];
        const catSheet = wb.Sheets['Categories'];

        if (txnSheet) {
          const raw = XLSX.utils.sheet_to_json(txnSheet, { defval: '' });
          importedTxns = raw
            .map((row, i) => {
              const title = String(row.Title || '').trim();
              const amount = Number(row.Amount);
              const category = String(row.Category || '').trim();
              const type = String(row.Type || '').trim().toLowerCase();
              const date = String(row.Date || '').trim();

              const rowErrors = [];
              if (!title) rowErrors.push(`Row ${i + 2}: missing Title`);
              if (!amount || isNaN(amount) || amount <= 0) rowErrors.push(`Row ${i + 2}: invalid Amount`);
              if (!category) rowErrors.push(`Row ${i + 2}: missing Category`);
              if (!['income', 'expense'].includes(type)) rowErrors.push(`Row ${i + 2}: Type must be 'income' or 'expense'`);
              if (!date) rowErrors.push(`Row ${i + 2}: missing Date`);

              if (rowErrors.length > 0) {
                errors.push(...rowErrors);
                return null;
              }

              return {
                id: Date.now().toString(36) + Math.random().toString(36).substring(2, 9) + i,
                title,
                amount,
                category,
                type,
                date,
              };
            })
            .filter(Boolean);
        }

        if (catSheet) {
          const raw = XLSX.utils.sheet_to_json(catSheet, { defval: '' });
          importedCats = raw
            .map((row, i) => {
              const name = String(row.Name || '').trim();
              const color = String(row.Color || '#94a3b8').trim();
              if (!name) return null;
              return { id: `imported-${i}`, name, color };
            })
            .filter(Boolean);
        }

        if (mergeMode === 'replace') {
          if (importedTxns.length) replaceTransactions(importedTxns);
          if (importedCats.length) replaceCategories(importedCats);
        } else {
          if (importedTxns.length) mergeTransactions(importedTxns);
          if (importedCats.length) {
            const merged = [...importedCats, ...categories];
            replaceCategories(merged);
          }
        }

        setResult({
          type: errors.length > 0 ? 'warning' : 'success',
          message: `Imported ${importedTxns.length} transactions, ${importedCats.length} categories.`,
          errors: errors.length > 0 ? errors : null,
        });
      } catch (err) {
        setResult({ type: 'error', message: 'Failed to parse file. Make sure it is a valid .xlsx or .csv file.', errors: null });
      }
      setImporting(false);
      resetResult();
    };
    reader.readAsArrayBuffer(file);
  }, [replaceTransactions, replaceCategories, mergeTransactions, categories, mergeMode]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  }, [processFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
    e.target.value = '';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600">
      <div className="flex items-start gap-4 mb-5">
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center flex-shrink-0 dark:bg-indigo-500/10">
          <HiOutlineArrowUpTray className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-900 mb-1 dark:text-slate-100">Import from Excel</h3>
          <p className="text-sm text-slate-400 dark:text-slate-400">Upload .xlsx or .csv files to restore data</p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMergeMode('replace')}
          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
            mergeMode === 'replace'
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'
          }`}
        >
          Replace
        </button>
        <button
          onClick={() => setMergeMode('merge')}
          className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${
            mergeMode === 'merge'
              ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300'
              : 'bg-slate-50 text-slate-500 hover:bg-slate-100 dark:bg-slate-700 dark:text-slate-400 dark:hover:bg-slate-600'
          }`}
        >
          Merge
        </button>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? 'border-indigo-400 bg-indigo-50/50 dark:bg-indigo-500/10'
            : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:border-indigo-400 dark:hover:bg-slate-700/30'
        }`}
      >
        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
          className="hidden"
        />
        {importing ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-500">Importing...</p>
          </div>
        ) : (
          <>
            <HiOutlineArrowUpTray className="w-8 h-8 text-slate-300 mx-auto mb-2 dark:text-slate-600" />
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Drop file here or click to browse</p>
          <p className="text-xs text-slate-400 mt-1 dark:text-slate-500">Supports .xlsx and .csv files</p>
          </>
        )}
      </div>

      {result && (
        <div className={`mt-4 p-4 rounded-xl text-sm animate-slide-up ${
          result.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20' :
          result.type === 'warning' ? 'bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20' :
          'bg-rose-50 text-rose-700 border border-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:border-rose-500/20'
        }`}>
          <div className="flex items-center gap-2 mb-1">
            {result.type === 'success' ? <HiOutlineCheckCircle className="w-4 h-4" /> :
             result.type === 'warning' ? <HiOutlineExclamationCircle className="w-4 h-4" /> :
             <HiOutlineExclamationCircle className="w-4 h-4" />}
            <span className="font-medium">{result.message}</span>
          </div>
          {result.errors && (
            <ul className="mt-2 space-y-0.5 text-xs opacity-80">
              {result.errors.slice(0, 10).map((err, i) => <li key={i}>{err}</li>)}
              {result.errors.length > 10 && <li>...and {result.errors.length - 10} more errors</li>}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
