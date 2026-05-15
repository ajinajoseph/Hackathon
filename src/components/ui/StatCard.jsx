const StatCard = ({ title, value, change, icon, variant = 'bg-primary' }) => {
  return (
    <div className="glass-card overflow-hidden rounded-3xl p-6 shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${variant} text-white`}>
          {icon}
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">{change}</p>
    </div>
  );
};

export default StatCard;
