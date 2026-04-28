import { useState, useEffect } from 'react'

/**
 * Settings page
 *
 * Allows the user to:
 *  1. Enter and save a GitHub Personal Access Token
 *  2. Delete the saved token
 *
 * The token is stored in SQLite via LocalStorage service (main process).
 * It never leaves the user's machine — only used in GitHub API requests.
 *
 * Why a token? Without one, GitHub rate-limits to 60 requests/hour.
 * With one, the limit is 5,000 requests/hour.
 */
export default function Settings() {
  const [token,   setToken]   = useState('')
  const [saved,   setSaved]   = useState(false)     // Show "Saved!" confirmation
  const [hasToken, setHasToken] = useState(false)    // Whether a token is already stored
  const [loading, setLoading] = useState(true)

  // On mount, check if a token is already saved
  useEffect(() => {
    window.electron.token.get().then((stored) => {
      if (stored) {
        setHasToken(true)
        setToken(stored)
      }
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    if (!token.trim()) return
    await window.electron.token.save(token.trim())
    setHasToken(true)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleDelete = async () => {
    if (!confirm('Remove saved GitHub token?')) return
    await window.electron.token.delete()
    setToken('')
    setHasToken(false)
  }

  if (loading) return null

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-xl font-bold text-github-text mb-1">Settings</h1>
      <p className="text-github-muted text-sm mb-8">Configure your GitHub Activity Tracker</p>

      {/* Token section */}
      <section className="bg-github-surface border border-github-border rounded-xl p-5 mb-6">
        <h2 className="font-semibold text-github-text mb-1">GitHub Personal Access Token</h2>
        <p className="text-github-muted text-sm mb-4">
          Optional but recommended.{' '}
          <a
            href="https://github.com/settings/tokens/new?scopes=read:user,repo&description=GitHub+Activity+Tracker"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Create a token on GitHub →
          </a>
          <br />
          Scopes needed: <code className="text-xs bg-github-dark px-1 rounded">read:user</code>{' '}
          and <code className="text-xs bg-github-dark px-1 rounded">public_repo</code>.
          <br />
          Without a token: 60 requests/hour. With a token: 5,000 requests/hour.
        </p>

        <div className="flex gap-2">
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
            className="flex-1 bg-github-dark border border-github-border rounded-lg px-3 py-2
                       text-github-text placeholder-github-muted text-sm font-mono
                       focus:outline-none focus:border-github-accent"
          />
          <button
            onClick={handleSave}
            disabled={!token.trim()}
            className="px-4 py-2 bg-github-accent text-white rounded-lg text-sm font-medium
                       hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors min-w-[80px]"
          >
            {saved ? '✓ Saved' : 'Save'}
          </button>
        </div>

        {hasToken && (
          <button
            onClick={handleDelete}
            className="mt-3 text-xs text-red-400 hover:text-red-300 hover:underline"
          >
            Remove saved token
          </button>
        )}
      </section>

      {/* Info section */}
      <section className="bg-github-surface border border-github-border rounded-xl p-5">
        <h2 className="font-semibold text-github-text mb-3">About</h2>
        <ul className="text-github-muted text-sm space-y-2">
          <li>🔒 Your token is stored locally in a SQLite database on your machine.</li>
          <li>🌐 It is only sent to <strong>api.github.com</strong> — never to any third party.</li>
          <li>📁 All data is stored in your OS user data folder.</li>
          <li>🗑 You can remove all history from the sidebar on the Dashboard.</li>
        </ul>
      </section>
    </div>
  )
}
