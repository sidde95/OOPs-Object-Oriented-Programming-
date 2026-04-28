import { useState, useCallback } from 'react'

/**
 * useGitHubData
 *
 * Custom React hook that wraps all GitHub data fetching logic.
 * Keeps components clean — they just call fetchUser() and read state.
 *
 * Returned state:
 *  - report:   The full activity report (null until loaded)
 *  - loading:  true while a fetch is in progress
 *  - error:    Error message string if fetch failed (null otherwise)
 *
 * Learning note: This is the React equivalent of a "service layer" —
 * it separates data concerns from UI concerns.
 */
export function useGitHubData() {
  const [report,  setReport]  = useState(null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  /**
   * Fetches a GitHub user's activity report via Electron IPC.
   * The actual HTTP call happens in the main process (GitHubAPIService).
   *
   * @param {string} username - GitHub username to look up
   */
  const fetchUser = useCallback(async (username) => {
    if (!username.trim()) return

    setLoading(true)
    setError(null)
    setReport(null)

    try {
      const data = await window.electron.github.fetchUser(username.trim())
      setReport(data)
    } catch (err) {
      setError(err.message || 'Failed to fetch user data. Check your internet connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Clears the current report (e.g., when user clears the search).
   */
  const clearReport = useCallback(() => {
    setReport(null)
    setError(null)
  }, [])

  return { report, loading, error, fetchUser, clearReport }
}
