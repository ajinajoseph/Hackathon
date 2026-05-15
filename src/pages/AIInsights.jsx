import { useEffect, useState } from 'react';
import { MessageCircle, ShieldCheck, Sparkles } from 'lucide-react';
import InsightCard from '../components/ui/InsightCard';
import { getInsights } from '../services/api';

const fallbackInsights = [
  { title: 'Spending habits', description: 'You tend to spend more on weekends. Try capping dining out at two meals per week.', icon: <Sparkles size={20} /> },
  { title: 'Savings suggestions', description: 'Automate 10% of your income each month to reach your savings goal faster.', icon: <ShieldCheck size={20} /> },
  { title: 'Budget warnings', description: 'Entertainment costs are trending higher than planned. Consider a temporary limit.', icon: <MessageCircle size={20} /> },
];

const typeStyles = {
  warning: 'bg-rose-50 text-rose-900 dark:bg-rose-900/20 dark:text-rose-200',
  recommendation: 'bg-primary/10 text-slate-900 dark:bg-primary/20 dark:text-white',
  tip: 'bg-emerald-50 text-emerald-900 dark:bg-emerald-900/20 dark:text-emerald-200',
};

const typeIcons = {
  warning: <MessageCircle size={20} />,
  recommendation: <Sparkles size={20} />,
  tip: <ShieldCheck size={20} />,
};

const AIInsights = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInsights = async () => {
      setLoading(true);
      try {
        const data = await getInsights();
        if (Array.isArray(data) && data.length) {
          setInsights(data);
        } else {
          setInsights(fallbackInsights);
        }
      } catch (err) {
        setError(err.message);
        setInsights(fallbackInsights);
      } finally {
        setLoading(false);
      }
    };
    loadInsights();
  }, []);

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">AI guided</p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">AI-driven insights</h1>
        </div>
        <div className="rounded-3xl bg-slate-100 px-5 py-4 text-slate-900 shadow-soft dark:bg-slate-900 dark:text-slate-100">
          <p className="text-sm">Personalized finance coaching</p>
          <p className="mt-1 text-lg font-semibold">Actionable recommendations</p>
        </div>
      </div>
      {error && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200">
          {error}
        </div>
      )}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {(loading ? fallbackInsights : insights).map((item, index) => (
          <InsightCard
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon || typeIcons[item.type] || <Sparkles size={20} />}
            variant={typeStyles[item.type] || "bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-100"}
          />
        ))}
      </div>
    </section>
  );
};

export default AIInsights;
