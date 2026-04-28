import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

/**
 * ActivityChart
 *
 * Bar chart showing weekly commit count over the past 12 weeks.
 * Built with Recharts — a composable chart library for React.
 *
 * Props:
 *  - data: Array<{ week: string, commits: number }>
 */
export default function ActivityChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-github-surface border border-github-border rounded-xl p-5">
        <h3 className="text-sm font-semibold text-github-muted mb-3">
          Commit Activity (last 12 weeks)
        </h3>
        <div className="h-48 flex items-center justify-center text-github-muted text-sm">
          No commit data available
        </div>
      </div>
    )
  }

  return (
    <div className="bg-github-surface border border-github-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-github-muted mb-3">
        Commit Activity (last 12 weeks)
      </h3>

      {/* ResponsiveContainer makes the chart fill its parent width */}
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#30363d" vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fill: '#8b949e', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#8b949e', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '8px',
              color: '#e6edf3',
              fontSize: '12px'
            }}
            cursor={{ fill: '#30363d' }}
            formatter={(value) => [`${value} commits`, 'Commits']}
          />
          <Bar dataKey="commits" fill="#238636" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
