import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import CategoryManager from './components/CategoryManager';
import Dashboard from './pages/Dashboard';
import TransactionsPage from './pages/TransactionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

const pageComponents = {
  dashboard: Dashboard,
  transactions: TransactionsPage,
  analytics: AnalyticsPage,
  settings: SettingsPage,
};

const pageTitles = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  analytics: 'Analytics',
  settings: 'Settings',
};

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const handleNavigate = (page) => {
    if (page === 'categories') {
      setCategoryModalOpen(true);
      return;
    }
    setActivePage(page);
  };

  const Page = pageComponents[activePage] || Dashboard;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          pageTitle={pageTitles[activePage] || 'Dashboard'}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto">
          <Page />
        </main>
      </div>
      <CategoryManager
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
