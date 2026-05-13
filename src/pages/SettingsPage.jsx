import { useApp } from '../context/AppContext';
import DataManagement from '../components/settings/DataManagement';
import ProfileCard from '../components/settings/ProfileCard';
import { HiOutlineSun, HiOutlineMoon, HiOutlineComputerDesktop, HiOutlineUser } from 'react-icons/hi2';

function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center dark:from-indigo-500/20 dark:to-purple-500/20">
        <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500">{description}</p>
      </div>
    </div>
  );
}

function AppearanceCard() {
  const { darkMode, toggleDarkMode } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center dark:bg-slate-700">
            {darkMode ? (
              <HiOutlineMoon className="w-5 h-5 text-indigo-500" />
            ) : (
              <HiOutlineSun className="w-5 h-5 text-amber-500" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Dark Mode</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500">Switch between light and dark themes</p>
          </div>
        </div>
        <button
          onClick={toggleDarkMode}
          className={`relative w-12 h-6 rounded-full transition-colors duration-300 flex-shrink-0 ${
            darkMode ? 'bg-indigo-600' : 'bg-slate-200'
          }`}
        >
          <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ${
            darkMode ? 'translate-x-6' : 'translate-x-0'
          }`} />
        </button>
      </div>
    </div>
  );
}

function SystemCard() {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all duration-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 bg-slate-100 rounded-xl flex items-center justify-center dark:bg-slate-700">
          <HiOutlineComputerDesktop className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 mb-1 dark:text-slate-100">System</h4>
          <p className="text-xs text-slate-400 mb-3 dark:text-slate-500">App information</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 px-3 bg-slate-50 rounded-lg dark:bg-slate-700/50">
              <span className="text-slate-500 dark:text-slate-400">Version</span>
              <span className="text-slate-700 font-medium dark:text-slate-200">1.0.0</span>
            </div>
            <div className="flex justify-between py-2 px-3 bg-slate-50 rounded-lg dark:bg-slate-700/50">
              <span className="text-slate-500 dark:text-slate-400">Storage</span>
              <span className="text-slate-700 font-medium dark:text-slate-200">Local</span>
            </div>
            <div className="flex justify-between py-2 px-3 bg-slate-50 rounded-lg dark:bg-slate-700/50">
              <span className="text-slate-500 dark:text-slate-400">Framework</span>
              <span className="text-slate-700 font-medium dark:text-slate-200">React + Vite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center dark:from-indigo-500/20 dark:to-purple-500/20">
          <HiOutlineComputerDesktop className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Settings</h2>
          <p className="text-sm text-slate-400 dark:text-slate-500">Manage your app preferences and data</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-8">
          <section>
            <SectionHeader icon={HiOutlineComputerDesktop} title="Data Management" description="Export, import, and backup your data" />
            <DataManagement />
          </section>
        </div>

        <div className="space-y-8">
          <section>
            <SectionHeader icon={HiOutlineUser} title="Profile" description="Your name, email, and avatar" />
            <ProfileCard />
          </section>

          <section>
            <SectionHeader icon={HiOutlineSun} title="Appearance" description="Customize the look and feel" />
            <AppearanceCard />
          </section>

          <section>
            <SectionHeader icon={HiOutlineComputerDesktop} title="System" description="App information" />
            <SystemCard />
          </section>
        </div>
      </div>
    </div>
  );
}
