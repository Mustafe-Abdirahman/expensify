import {
  HiOutlineSquares2X2,
  HiOutlineWallet,
  HiOutlineChartBar,
  HiOutlineTag,
  HiOutlineCog,
  HiOutlineXMark,
} from 'react-icons/hi2';

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  const navItems = [
    { label: 'Dashboard', icon: HiOutlineSquares2X2, value: 'dashboard' },
    { label: 'Transactions', icon: HiOutlineWallet, value: 'transactions' },
    { label: 'Analytics', icon: HiOutlineChartBar, value: 'analytics' },
    { label: 'Categories', icon: HiOutlineTag, value: 'categories' },
    { label: 'Settings', icon: HiOutlineCog, value: 'settings' },
  ];
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-slate-900 z-50 flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-base font-bold text-white">Expense</h1>
              <p className="text-[10px] font-medium text-slate-400 -mt-0.5">Tracker</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors">
            <HiOutlineXMark className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.value;
            return (
              <button
                key={item.value}
                onClick={() => { onNavigate(item.value); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-slate-800">
          <p className="text-xs text-slate-500">© 2026 Expense Tracker</p>
        </div>
      </aside>
    </>
  );
}
