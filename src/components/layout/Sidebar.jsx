import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  PlusCircle,
  BarChart3,
  BrainCircuit,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "Add Expense",
      path: "/add-expense",
      icon: PlusCircle,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
    {
      name: "AI Insights",
      path: "/ai-insights",
      icon: BrainCircuit,
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-5">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-blue-600">
          Financially
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Smart Finance Tracker
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-10 rounded-2xl bg-slate-100 dark:bg-slate-800 p-4">
        <h2 className="font-semibold text-slate-800 dark:text-white">
          AI Powered
        </h2>

        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Track budgets, trends, and AI guidance in one place.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;