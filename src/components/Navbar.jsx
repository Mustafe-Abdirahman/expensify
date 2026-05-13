import { useApp } from '../context/AppContext';
import { HiOutlineBars3, HiOutlineBell } from 'react-icons/hi2';

export default function Navbar({ onMenuClick, pageTitle }) {
  const { userProfile } = useApp();
  const initials = (userProfile?.name || 'U').charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 dark:bg-slate-900/80 dark:border-slate-700/60">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800"
          >
            <HiOutlineBars3 className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{pageTitle || 'Dashboard'}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800">
            <HiOutlineBell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-200/50 dark:shadow-indigo-800/30 overflow-hidden">
            {userProfile?.avatar ? (
              <img src={userProfile.avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              initials
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
