import { HiOutlineBars3, HiOutlineBell } from 'react-icons/hi2';

export default function Navbar({ onMenuClick, pageTitle }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <HiOutlineBars3 className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-slate-900">{pageTitle || 'Dashboard'}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors">
            <HiOutlineBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-200/50">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
