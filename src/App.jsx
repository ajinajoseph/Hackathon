import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import Dashboard from './pages/Dashboard';
import AddExpense from './pages/AddExpense';
import Analytics from './pages/Analytics';
import AIInsights from './pages/AIInsights';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-surface text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <div className="relative flex lg:pl-72">
        <Sidebar mobileOpen={drawerOpen} onMobileClose={() => setDrawerOpen(false)} />
        <div className="flex-1">
          <Navbar onMenuClick={() => setDrawerOpen(true)} darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/add-expense" element={<AddExpense />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/ai-insights" element={<AIInsights />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
