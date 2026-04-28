/**
 * StreakChart
 *
 * Displays a user's commit streak stats and a 30-day activity heatmap.
 *
 * Props:
 *  - streak:       { current: number, longest: number }
 *  - dailyActivity: Array<{ date: string, count: number }> — last 30 days
 */
export default function StreakChart({ streak, dailyActivity }) {
  if (!streak) return null

  // Build a dense array for exactly the last 30 days so empty days render too
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const activityMap = {}
  if (dailyActivity) {
    dailyActivity.forEach(({ date, count }) => {
      activityMap[date] = count
    })
  }

  const days = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(today.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    days.push({ date: dateStr, count: activityMap[dateStr] || 0 })
  }

  const maxCount = Math.max(...days.map((d) => d.count), 1)

  /**
   * Returns a GitHub-style green colour based on commit intensity.
   * @param {number} count
   * @returns {string} hex colour
   */
  function getHeatColor(count) {
    if (count === 0) return '#161b22'          // empty — github-surface
    const ratio = count / maxCount
    if (ratio < 0.25) return '#0e4429'         // darkest green
    if (ratio < 0.5)  return '#006d32'
    if (ratio < 0.75) return '#26a641'
    return '#39d353'                            // brightest green
  }

  return (
    <div className="bg-github-surface border border-github-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-github-muted mb-4">Activity Streak</h3>

      {/* Streak stat tiles */}
      <div className="flex gap-6 mb-5">
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold font-mono text-github-text">
            🔥 {streak.current}
          </span>
          <span className="text-xs text-github-muted mt-1">Current streak</span>
        </div>
        <div className="w-px bg-github-border" />
        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold font-mono text-github-text">
            🏆 {streak.longest}
          </span>
          <span className="text-xs text-github-muted mt-1">Longest streak</span>
        </div>
        {streak.current > 0 && (
          <>
            <div className="w-px bg-github-border" />
            <div className="flex flex-col justify-center">
              <span className="text-xs text-github-muted">
                {(() => {
                  const remaining = streak.longest - streak.current
                  return remaining === 0
                    ? '🎉 Personal best!'
                    : `${remaining} day${remaining !== 1 ? 's' : ''} to beat record`
                })()}
              </span>
            </div>
          </>
        )}
      </div>

      {/* 30-day heatmap grid */}
      <div className="flex flex-wrap gap-1">
        {days.map(({ date, count }) => (
          <div
            key={date}
            title={`${date}: ${count} commit${count !== 1 ? 's' : ''}`}
            style={{ backgroundColor: getHeatColor(count) }}
            className="w-4 h-4 rounded-sm border border-black/20 cursor-default"
          />
        ))}
      </div>
      <p className="text-xs text-github-muted mt-2">Last 30 days (hover for details)</p>
    </div>
  )
}
