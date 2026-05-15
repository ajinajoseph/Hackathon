import { Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

const badgeClasses = {
  Food: 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-200',
  Utilities: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-200',
  Transport: 'bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-200',
  Entertainment: 'bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-200',
  Savings: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-200',
  Other: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200',
};

const TransactionList = ({ transactions, onDelete, loading }) => {
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const paginated = useMemo(() => {
    const start = (page - 1) * pageSize;
    return transactions.slice(start, start + pageSize);
  }, [page, transactions]);

  const pageCount = Math.ceil(transactions.length / pageSize) || 1;

  return (
    <div className="glass-card overflow-hidden rounded-3xl shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5 dark:border-slate-800">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">Recent transactions</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Manage entries and remove old spending items.</p>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item) => (
              <tr key={item.id} className="border-b border-slate-200 dark:border-slate-800">
                <td className="px-6 py-4 text-slate-900 dark:text-slate-100">{item.title}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClasses[item.category] || badgeClasses.Other}`}>
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{item.date}</td>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-100">${Number(item.amount).toFixed(2)}</td>
                <td className="px-6 py-4">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => onDelete(item.id)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 transition hover:border-rose-400 hover:text-rose-500 dark:border-slate-700 dark:text-slate-300 dark:hover:border-rose-400 dark:hover:text-rose-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-6 py-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>{transactions.length} transactions total</span>
        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Previous
          </button>
          <span>
            {page} / {pageCount}
          </span>
          <button
            type="button"
            onClick={() => setPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={page === pageCount}
            className="rounded-2xl border border-slate-200 px-4 py-2 text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
