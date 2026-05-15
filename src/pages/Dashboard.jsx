import { ArrowUpRight, CalendarDays, CreditCard, ShieldCheck } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';
import StatCard from '../components/ui/StatCard';
import TransactionList from '../components/expenses/TransactionList';

const statData = [
  { title: 'Total expenses', key: 'total', icon: <CreditCard size={24} />, variant: 'bg-primary', change: '+12% this month' },
  { title: 'Monthly spending', key: 'monthly', icon: <ArrowUpRight size={24} />, variant: 'bg-emerald-500', change: 'Steady compared to last month' },
  { title: 'Savings estimate', key: 'savings', icon: <ShieldCheck size={24} />, variant: 'bg-slate-900', change: 'Projected goal in progress' },
  { title: 'Recent activity', key: 'activity', icon: <CalendarDays size={24} />, variant: 'bg-cyan-600', change: 'Updated automatically' },
];

const Dashboard = () => {
  const { expenses, loading, error, deleteExpense, stats } = useExpenses();

  const statsWithValues = statData.map((item) => {
    let value = 'Active';
    if (item.key === 'total') {
      value = `$${stats.total}`;
    } else if (item.key === 'monthly') {
      value = `$${stats.monthly}`;
    } else if (item.key === 'savings') {
      value = `$${stats.savings}`;
    }
    return { ...item, value };
  });

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Welcome back</p>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Financially dashboard</h1>
          </div>
          <div className="rounded-3xl bg-primary/10 px-5 py-4 text-slate-900 shadow-soft dark:bg-primary/15 dark:text-white">
            <p className="text-sm">Your insights are ready</p>
            <p className="mt-1 text-lg font-semibold">Review spending performance</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
          {error}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statsWithValues.map((item) => (
          <StatCard key={item.title} title={item.title} value={item.value} change={item.change} icon={item.icon} variant={item.variant} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="grid gap-6">
          <LineChart data={stats.monthlyTrends.length ? stats.monthlyTrends : [{ month: '2026-01', value: 0 }]} />
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="glass-card rounded-3xl p-6 shadow-soft">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Spending goal</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">${stats.monthly}</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">You have used 72% of your monthly budget.</p>
            </div>
            <div className="glass-card rounded-3xl p-6 shadow-soft">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">Projected savings</p>
              <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">${stats.savings}</h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Keep your subscriptions and meals optimized.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <PieChart data={stats.categoryDistribution.length ? stats.categoryDistribution : [{ name: 'No data', value: 1, color: '#E2E8F0' }]} />
          <TransactionList transactions={expenses} onDelete={deleteExpense} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
