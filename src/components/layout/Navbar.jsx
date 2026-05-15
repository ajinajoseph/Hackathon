/* eslint-disable react/prop-types */
import { Bell, Menu, Moon, Search, SunMedium, UserCircle2 } from 'lucide-react';

const Navbar = ({ onMenuClick, darkMode, setDarkMode }) => {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-xl transition dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 lg:hidden"
            onClick={onMenuClick}
          >
            <Menu size={18} />
          </button>
          <div className="relative hidden rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex sm:items-center">
            <Search className="mr-3 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search transactions"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setDarkMode((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Moon size={18} /> : <SunMedium size={18} />}
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <Bell size={18} />
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
            <UserCircle2 className="h-6 w-6 text-slate-500 dark:text-slate-400" />
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Avery</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Finance manager</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
