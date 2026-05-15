import { useState } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseForm from '../components/expenses/ExpenseForm';

const AddExpense = () => {
  const { addExpense, loading } = useExpenses();
  const [status, setStatus] = useState(null);

  const handleSubmit = async (payload) => {
    const result = await addExpense(payload);
    setStatus(result.success ? 'success' : 'error');
    return result;
  };

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">Create entry</p>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Add new expense</h1>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[0.9fr_0.7fr]">
        <ExpenseForm onSubmit={handleSubmit} loading={loading} />
        <div className="glass-card rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-soft dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Smart guidance</h2>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">Add your expense and the dashboard will automatically update your spending insights.</p>
          <div className="mt-8 space-y-4">
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Instant validation</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Form input checks ensure every expense is complete before saving.</p>
            </div>
            <div className="rounded-3xl bg-white p-5 shadow-sm dark:bg-slate-950">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Auto sync</p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Expenses are pushed to your financial backend with a fallback mock experience.</p>
            </div>
          </div>
          {status === 'success' && <p className="mt-6 rounded-3xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200">Your expense has been added.</p>}
        </div>
      </div>
    </section>
  );
};

export default AddExpense;
