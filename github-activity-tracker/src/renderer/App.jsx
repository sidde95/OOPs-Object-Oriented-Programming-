import { useState } from 'react'
import Home from './pages/Home.jsx'
import Settings from './pages/Settings.jsx'

/**
 * App
 *
 * Root component. Manages which page is active.
 * Simple page-based navigation (no React Router needed for 2 pages).
 */
export default function App() {
  const [page, setPage] = useState('home')     // 'home' | 'settings'

  return (
    <div className="flex flex-col h-screen bg-github-dark text-github-text">
      {/* ── Top Navigation Bar ─────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 py-3 border-b border-github-border bg-github-surface select-none">
        <div className="flex items-center gap-2">
          {/* GitHub Octocat SVG logo (inline to avoid asset path issues) */}
          <svg height="24" width="24" viewBox="0 0 16 16" fill="#e6edf3">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38
              0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13
              -.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66
              .07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15
              -.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27
              .68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12
              .51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48
              0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          <span className="font-semibold text-sm">GitHub Activity Tracker</span>
        </div>

        <div className="flex gap-1">
          <NavButton active={page === 'home'}     onClick={() => setPage('home')}>
            Dashboard
          </NavButton>
          <NavButton active={page === 'settings'} onClick={() => setPage('settings')}>
            Settings
          </NavButton>
        </div>
      </nav>

      {/* ── Page content ──────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">
        {page === 'home'     && <Home />}
        {page === 'settings' && <Settings />}
      </main>
    </div>
  )
}

function NavButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded text-sm transition-colors ${
        active
          ? 'bg-github-accent text-white'
          : 'text-github-muted hover:text-github-text hover:bg-github-border'
      }`}
    >
      {children}
    </button>
  )
}
