/**
 * ActivityReport
 *
 * Data model representing a computed activity report for a GitHub user.
 * Holds the final summary shown on the Dashboard.
 *
 * OOP concepts used:
 *  - Encapsulation: computed summary is always consistent
 *  - Data modeling: single object passed from backend to React frontend
 */
export class ActivityReport {
  /**
   * @param {object} params
   * @param {object} params.profile         - UserProfile-shaped data
   * @param {number} params.weeklyCommits   - Commit count this week
   * @param {object} params.pace            - Output from ActivityClassifier.classify()
   * @param {Array}  params.recentEvents    - Raw GitHub events (last 30)
   * @param {Array}  params.weeklyChart     - [{week, commits}] for bar chart
   */
  constructor({ profile, weeklyCommits, pace, recentEvents, weeklyChart = [] }) {
    this.profile       = profile
    this.weeklyCommits = weeklyCommits
    this.pace          = pace
    this.recentEvents  = recentEvents
    this.weeklyChart   = weeklyChart
    this.generatedAt   = new Date().toISOString()
  }

  /**
   * Returns a summary string suitable for export or display.
   * @returns {string}
   */
  get summary() {
    return (
      `${this.profile.name} (@${this.profile.login}) — ` +
      `${this.weeklyCommits} commits this week — ` +
      `${this.pace.emoji} ${this.pace.label}`
    )
  }

  /**
   * Returns a plain serializable object.
   * Used when exporting to JSON file.
   * @returns {object}
   */
  toJSON() {
    return {
      generatedAt:   this.generatedAt,
      summary:       this.summary,
      profile:       this.profile,
      weeklyCommits: this.weeklyCommits,
      pace:          this.pace,
      weeklyChart:   this.weeklyChart,
      recentEvents:  this.recentEvents
    }
  }
}
