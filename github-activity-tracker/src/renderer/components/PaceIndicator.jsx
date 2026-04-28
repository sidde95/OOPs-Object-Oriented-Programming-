/**
 * PaceIndicator
 *
 * Displays a colour-coded badge showing the user's commit pace.
 * 🔴 Low / 🟡 Medium / 🟢 Good
 *
 * Props:
 *  - pace: { label, emoji, color, description } — from ActivityClassifier
 *  - weeklyCommits: number
 */
export default function PaceIndicator({ pace, weeklyCommits }) {
  if (!pace) return null

  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-xl border"
      style={{ borderColor: pace.color, backgroundColor: `${pace.color}18` }}
    >
      <span className="text-4xl mb-1">{pace.emoji}</span>
      <span className="text-lg font-bold" style={{ color: pace.color }}>
        {pace.label}
      </span>
      <span className="text-github-muted text-sm mt-1 text-center">
        {pace.description}
      </span>
      <div className="mt-3 text-center">
        <span className="text-3xl font-mono font-bold text-github-text">
          {weeklyCommits}
        </span>
        <span className="text-github-muted text-xs block">commits this week</span>
      </div>
    </div>
  )
}
