import { TrendingUp, Wallet, Layers } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';
import InsightCard from '../components/ui/InsightCard';

const insights = [
  { title: 'Category optimization', description: 'Overspending on food suggests a weekly meal plan could save up to 15%.', variant: 'bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100', icon: <TrendingUp size={20} /> },
  { title: 'Cash flow balance', description: 'Your monthly deposits outpace spending, so consider increasing savings rate.', variant: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200', icon: <Wallet size={20} /> },
  { title: 'Budget health', description: 'Utilities are stable. Watch entertainment and transport budgets during peak weeks.', variant: 'bg-cyan-100 text-cyan-900 dark:bg-cyan-900/20 dark:text-cyan-200', icon: <Layers size={20} /> },
];

const Analytics = () => {
  const { stats } = useExpenses();

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Insights</p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Advanced analytics</h1>
        </div>
        <div className="rounded-3xl bg-slate-100 px-5 py-4 text-slate-900 shadow-soft dark:bg-slate-900 dark:text-slate-100">
          <p className="text-sm">Weekly vs monthly</p>
          <p className="mt-1 text-lg font-semibold">$1,120 vs $4,850</p>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_0.6fr]">
        <BarChart data={stats.categoryDistribution.length ? stats.categoryDistribution : [{ name: 'No data', value: 1 }]} />
        <div className="space-y-6">
          {insights.map((item) => (
            <InsightCard key={item.title} title={item.title} description={item.description} variant={item.variant} icon={item.icon} />
          ))}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="glass-card rounded-3xl p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Trend comparison</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Month-over-month growth in spending trends for budget planning.</p>
            </div>
          </div>
          <div className="mt-6 h-72">
            <LineChart data={stats.monthlyTrends.length ? stats.monthlyTrends : [{ month: '2026-01', value: 0 }]} />
          </div>
        </div>
        <div className="glass-card rounded-3xl p-6 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-600 text-white">
              <Wallet size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Budget summary</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">High-value categories are highlighted for faster decision making.</p>
            </div>
          </div>
          <div className="mt-8 grid gap-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Food spending</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">32% of total budget.</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Transport budget</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Track weekly peaks for better mileage planning.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
