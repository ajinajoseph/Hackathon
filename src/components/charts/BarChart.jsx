import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const BarChart = ({ data }) => {
  return (
    <div className="glass-card min-h-[320px] overflow-hidden rounded-3xl p-5 shadow-soft">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Spending by category</h2>
      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart data={data} margin={{ top: 10, right: 0, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
            <Bar dataKey="value" fill="#14B8A6" radius={[12, 12, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;
