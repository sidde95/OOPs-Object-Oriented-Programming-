import { useState, useEffect } from 'react'
import UserCard from './UserCard.jsx'
import ActivityChart from './ActivityChart.jsx'
import PaceIndicator from './PaceIndicator.jsx'
import { useGitHubData } from '../hooks/useGitHubData.js'

/**
 * Dashboard
 *
 * Main view of the app. Contains:
 *  - Search bar to enter a GitHub username
 *  - UserCard showing profile info
 *  - PaceIndicator showing 🔴🟡🟢 badge
 *  - ActivityChart showing weekly commits
 *  - History panel of recent searches
 *  - Export button
 */
export default function Dashboard() {
  const [username,  setUsername]  = useState('')
  const [history,   setHistory]   = useState([])
  const [exporting, setExporting] = useState(false)

  const { report, loading, error, fetchUser } = useGitHubData()

  // Load search history from SQLite when component mounts
  useEffect(() => {
    window.electron.history.getAll().then(setHistory).catch(console.error)
  }, [report])   // Refresh after each new search

  const handleSearch = (e) => {
    e.preventDefault()
    fetchUser(username)
  }

  const handleHistoryClick = (name) => {
    setUsername(name)
    fetchUser(name)
  }

  const handleExport = async () => {
    if (!report) return
    setExporting(true)
    try {
      const result = await window.electron.export.toJSON(report.profile.login)
      if (result.success) {
        alert(`Report saved to:\n${result.path}`)
      } else {
        alert(result.message)
      }
    } finally {
      setExporting(false)
    }
  }

  const handleDeleteHistory = async (name, e) => {
    e.stopPropagation()
    await window.electron.history.delete(name)
    setHistory((prev) => prev.filter((h) => h.username !== name))
  }

  return (
    <div className="flex h-full">
      {/* ── Left sidebar: search history ──────────────────────────── */}
      <aside className="w-56 flex-shrink-0 border-r border-github-border bg-github-surface p-4 overflow-y-auto">
        <h3 className="text-xs font-semibold text-github-muted uppercase tracking-wider mb-3">
          Recent Searches
        </h3>
        {history.length === 0 ? (
          <p className="text-github-muted text-xs">No searches yet</p>
        ) : (
          <ul className="space-y-1">
            {history.map((item) => (
              <li key={item.username}>
                <button
                  onClick={() => handleHistoryClick(item.username)}
                  className="w-full text-left px-2 py-1.5 rounded text-sm text-github-text
                             hover:bg-github-border flex items-center justify-between group"
                >
                  <span className="truncate">@{item.username}</span>
                  <span
                    onClick={(e) => handleDeleteHistory(item.username, e)}
                    className="text-github-muted hover:text-red-400 opacity-0 group-hover:opacity-100
                               ml-1 text-xs cursor-pointer"
                    title="Remove"
                  >
                    ✕
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      {/* ── Main content area ─────────────────────────────────────── */}
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username..."
            className="flex-1 bg-github-surface border border-github-border rounded-lg px-4 py-2
                       text-github-text placeholder-github-muted text-sm
                       focus:outline-none focus:border-github-accent"
          />
          <button
            type="submit"
            disabled={loading || !username.trim()}
            className="px-5 py-2 bg-github-accent text-white rounded-lg text-sm font-medium
                       hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            {loading ? 'Loading…' : 'Search'}
          </button>
        </form>

        {/* Error state */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-900/30 border border-red-700 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-28 bg-github-surface border border-github-border rounded-xl" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-40 bg-github-surface border border-github-border rounded-xl" />
              <div className="h-40 bg-github-surface border border-github-border rounded-xl" />
            </div>
          </div>
        )}

        {/* Results */}
        {report && !loading && (
          <div className="space-y-4">
            {/* Profile card */}
            <UserCard profile={report.profile} />

            {/* Pace + Chart row */}
            <div className="grid grid-cols-3 gap-4">
              <PaceIndicator
                pace={report.pace}
                weeklyCommits={report.weeklyCommits}
              />
              <div className="col-span-2">
                <ActivityChart data={report.weeklyChart || []} />
              </div>
            </div>

            {/* Export button */}
            <div className="flex justify-end">
              <button
                onClick={handleExport}
                disabled={exporting}
                className="px-4 py-2 border border-github-border rounded-lg text-sm
                           text-github-muted hover:text-github-text hover:border-github-accent
                           disabled:opacity-50 transition-colors"
              >
                {exporting ? 'Saving…' : '⬇ Export JSON'}
              </button>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!report && !loading && !error && (
          <div className="flex flex-col items-center justify-center h-64 text-github-muted">
            <svg height="48" width="48" viewBox="0 0 16 16" fill="currentColor" className="mb-4 opacity-30">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
                0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
                -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
                .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
                -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
                .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
                .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
                0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <p className="text-sm">Search for a GitHub username to get started</p>
          </div>
        )}
      </div>
    </div>
  )
}
