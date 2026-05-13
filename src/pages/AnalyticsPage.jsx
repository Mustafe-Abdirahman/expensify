import { HiOutlineChartBar } from 'react-icons/hi2';

export default function AnalyticsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto">
      <div className="card flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
          <HiOutlineChartBar className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Analytics Coming Soon</h3>
        <p className="text-sm text-slate-400 max-w-sm">
          Visual charts and insights about your spending patterns will appear here.
        </p>
      </div>
    </div>
  );
}
