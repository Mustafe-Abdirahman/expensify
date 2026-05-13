import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { useApp } from '../../context/AppContext';
import { HiOutlineArrowDownTray } from 'react-icons/hi2';

export default function ExportDataCard() {
  const { transactions, categories } = useApp();

  const handleExport = () => {
    const txnData = transactions.map((t) => ({
      Title: t.title,
      Amount: t.amount,
      Category: t.category,
      Type: t.type,
      Date: t.date,
    }));

    const catData = categories.map((c) => ({
      Name: c.name,
      Color: c.color,
    }));

    const wb = XLSX.utils.book_new();

    const txnSheet = XLSX.utils.json_to_sheet(txnData);
    if (txnData.length > 0) {
      const txnCols = Object.keys(txnData[0]);
      const txnHeader = txnCols.map((h, i) => {
        const ref = XLSX.utils.encode_cell({ r: 0, c: i });
        txnSheet[ref] = { v: h, t: 's' };
        txnSheet['!ref'] = XLSX.utils.encode_range({ s: { r: 0, c: 0 }, e: { r: txnData.length, c: txnCols.length - 1 } });
      });
    }
    XLSX.utils.book_append_sheet(wb, txnSheet, 'Transactions');

    const catSheet = XLSX.utils.json_to_sheet(catData);
    XLSX.utils.book_append_sheet(wb, catSheet, 'Categories');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, `expense-tracker-${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 dark:bg-emerald-500/10">
          <HiOutlineArrowDownTray className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-slate-900 mb-1 dark:text-slate-100">Export to Excel</h3>
          <p className="text-sm text-slate-400 mb-4 dark:text-slate-400">
            Download all transactions and categories as an Excel file
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 dark:text-slate-500">
            <span className="px-2 py-0.5 bg-slate-100 rounded-md dark:bg-slate-700 dark:text-slate-400">{transactions.length} transactions</span>
            <span className="px-2 py-0.5 bg-slate-100 rounded-md dark:bg-slate-700 dark:text-slate-400">{categories.length} categories</span>
          </div>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-semibold rounded-xl hover:from-emerald-700 hover:to-emerald-800 shadow-md shadow-emerald-200/50 dark:shadow-emerald-800/30 transition-all duration-200 active:scale-95"
          >
            <HiOutlineArrowDownTray className="w-4 h-4" />
            Export to Excel
          </button>
        </div>
      </div>
    </div>
  );
}
