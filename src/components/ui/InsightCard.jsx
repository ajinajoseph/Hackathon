const InsightCard = ({ title, description, variant = 'bg-slate-100 text-slate-900', icon }) => {
  return (
    <div className={`glass-card overflow-hidden rounded-3xl p-6 shadow-soft ${variant}`}>
      <div className="flex items-center gap-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-primary shadow-sm dark:bg-slate-900/80">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
