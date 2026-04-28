/**
 * ActivityClassifier
 *
 * Classifies a GitHub user's activity level based on their recent commit count.
 * Pure business-logic class — no API calls, no side effects.
 *
 * OOP concepts used:
 *  - Encapsulation: thresholds are private constants
 *  - Single Responsibility: only contains classification logic
 */
export class ActivityClassifier {
  // Weekly commit thresholds (can be adjusted for different standards)
  static #THRESHOLD_LOW    = 3   // < 3 commits/week → Low
  static #THRESHOLD_MEDIUM = 7   // 3–6 commits/week → Medium
                                  // 7+  commits/week → Good

  /**
   * Pace levels returned by classify()
   */
  static PACE = {
    LOW:    { label: 'Low',    emoji: '🔴', color: '#f85149', description: 'Less than 3 commits this week' },
    MEDIUM: { label: 'Medium', emoji: '🟡', color: '#e3b341', description: '3–6 commits this week — keep going!' },
    GOOD:   { label: 'Good',   emoji: '🟢', color: '#3fb950', description: '7+ commits this week — great pace!' }
  }

  /**
   * Classifies a weekly commit count into a pace level.
   * @param {number} weeklyCommits
   * @returns {{ label: string, emoji: string, color: string, description: string }}
   */
  classify(weeklyCommits) {
    if (weeklyCommits < ActivityClassifier.#THRESHOLD_LOW) {
      return ActivityClassifier.PACE.LOW
    }
    if (weeklyCommits < ActivityClassifier.#THRESHOLD_MEDIUM) {
      return ActivityClassifier.PACE.MEDIUM
    }
    return ActivityClassifier.PACE.GOOD
  }

  /**
   * Counts commits made in the current week (Mon–Sun) from a GitHub events array.
   * Looks at PushEvent payloads, which contain commit arrays.
   * @param {Array} events - Raw events from GitHub API
   * @returns {number}
   */
  countWeeklyCommits(events) {
    const now = new Date()
    const startOfWeek = new Date(now)
    // Set to most recent Monday at 00:00:00
    const day = now.getDay()
    const diff = day === 0 ? 6 : day - 1  // Handle Sunday (0)
    startOfWeek.setDate(now.getDate() - diff)
    startOfWeek.setHours(0, 0, 0, 0)

    let total = 0

    events.forEach((event) => {
      if (event.type !== 'PushEvent') return

      const eventDate = new Date(event.created_at)
      if (eventDate < startOfWeek) return

      // payload.size = number of commits in this push
      total += event.payload?.size || 0
    })

    return total
  }

  /**
   * Counts commits per week for the past N weeks from a commit history array.
   * Used for building the bar chart in ActivityChart.jsx.
   * @param {Array<{date: string, count: number}>} commitHistory - from GitHubAPIService
   * @param {number} weeks - How many weeks to include (default: 12)
   * @returns {Array<{week: string, commits: number}>}
   */
  groupByWeek(commitHistory, weeks = 12) {
    const result = []
    const now = new Date()

    for (let i = weeks - 1; i >= 0; i--) {
      const weekStart = new Date(now)
      weekStart.setDate(now.getDate() - i * 7 - now.getDay() + 1)
      weekStart.setHours(0, 0, 0, 0)

      const weekEnd = new Date(weekStart)
      weekEnd.setDate(weekStart.getDate() + 6)

      const label = weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

      const commits = commitHistory
        .filter(({ date }) => {
          const d = new Date(date)
          return d >= weekStart && d <= weekEnd
        })
        .reduce((sum, { count }) => sum + count, 0)

      result.push({ week: label, commits })
    }

    return result
  }
}
