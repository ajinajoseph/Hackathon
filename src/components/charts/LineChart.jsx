import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const LineChart = ({ data }) => {
  return (
    <div className="glass-card min-h-[320px] overflow-hidden rounded-3xl p-5 shadow-soft">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Monthly spending trend</h2>
      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ReLineChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
            <XAxis dataKey="month" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']} />
            <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={4} dot={{ r: 3 }} activeDot={{ r: 6 }} />
          </ReLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;
