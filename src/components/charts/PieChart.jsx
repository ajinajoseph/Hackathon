import { PieChart as RePieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const PieChart = ({ data }) => {
  return (
    <div className="glass-card min-h-[320px] overflow-hidden rounded-3xl p-5 shadow-soft">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Category distribution</h2>
      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={64} outerRadius={96} paddingAngle={6} stroke="none">
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color || '#2563EB'} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
            <Legend verticalAlign="bottom" height={48} />
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieChart;
