import { useMemo, useState } from 'react';

const categories = ['Food', 'Utilities', 'Transport', 'Entertainment', 'Savings', 'Other'];

const ExpenseForm = ({ onSubmit, loading }) => {
  const [formState, setFormState] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().slice(0, 10),
    notes: '',
  });
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = useMemo(() => {
    const next = {};
    if (!formState.title.trim()) next.title = 'Add a title';
    if (!formState.amount || Number(formState.amount) <= 0) next.amount = 'Enter a valid amount';
    if (!formState.date) next.date = 'Pick a date';
    return next;
  }, [formState]);

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(validate).length > 0) {
      setErrors(validate);
      return;
    }

    const payload = {
      title: formState.title,
      amount: Number(formState.amount),
      category: formState.category,
      date: formState.date,
      notes: formState.notes,
    };

    const result = await onSubmit(payload);
    if (result?.success) {
      setMessage('Expense added successfully.');
      setFormState({ title: '', amount: '', category: 'Food', date: new Date().toISOString().slice(0, 10), notes: '' });
      setErrors({});
      window.setTimeout(() => setMessage(null), 3200);
    } else {
      setMessage(result?.message || 'Unable to add expense.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl border border-slate-200 p-8 shadow-soft dark:border-slate-800">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Add a new expense</h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Log your latest expense and keep your budget on track.</p>
        </div>

        {message && (
          <div className="rounded-3xl border border-slate-200 bg-white/90 px-4 py-3 text-sm text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100">
            {message}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Title
            <input
              value={formState.title}
              onChange={(event) => handleChange('title', event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="e.g. Grocery shopping"
            />
            {errors.title && <p className="text-xs text-rose-500">{errors.title}</p>}
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Amount
            <input
              type="number"
              step="0.01"
              value={formState.amount}
              onChange={(event) => handleChange('amount', event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="0.00"
            />
            {errors.amount && <p className="text-xs text-rose-500">{errors.amount}</p>}
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Category
            <select
              value={formState.category}
              onChange={(event) => handleChange('category', event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              {categories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Date
            <input
              type="date"
              value={formState.date}
              onChange={(event) => handleChange('date', event.target.value)}
              className="w-full rounded-3xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
            {errors.date && <p className="text-xs text-rose-500">{errors.date}</p>}
          </label>
        </div>

        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Notes
          <textarea
            value={formState.notes}
            onChange={(event) => handleChange('notes', event.target.value)}
            rows="4"
            className="w-full rounded-3xl border border-slate-200 bg-white p-3 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            placeholder="Add optional notes about this expense"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {loading ? 'Saving...' : 'Save expense'}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
