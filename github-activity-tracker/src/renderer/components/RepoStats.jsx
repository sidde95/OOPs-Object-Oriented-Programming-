/**
 * RepoStats
 *
 * Displays a grid of the user's top repositories (sorted by star count).
 *
 * Props:
 *  - repos: Array<{ name, description, language, stars, forks, updatedAt, url }>
 */

// Language → colour mapping (GitHub's official palette subset)
const LANG_COLORS = {
  JavaScript:  '#f1e05a',
  TypeScript:  '#3178c6',
  Python:      '#3572A5',
  Java:        '#b07219',
  Go:          '#00ADD8',
  Rust:        '#dea584',
  C:           '#555555',
  'C++':       '#f34b7d',
  'C#':        '#178600',
  Ruby:        '#701516',
  PHP:         '#4F5D95',
  Swift:       '#F05138',
  Kotlin:      '#A97BFF',
  HTML:        '#e34c26',
  CSS:         '#563d7c',
  Shell:       '#89e051',
  Dart:        '#00B4AB',
  Scala:       '#c22d40',
  R:           '#198CE7',
  Vue:         '#41b883',
  Svelte:      '#ff3e00',
  Elixir:      '#6e4a7e',
  Haskell:     '#5e5086',
  'Jupyter Notebook': '#DA5B0B'
}

export default function RepoStats({ repos }) {
  if (!repos || repos.length === 0) return null

  return (
    <div className="bg-github-surface border border-github-border rounded-xl p-5">
      <h3 className="text-sm font-semibold text-github-muted mb-3">
        Top Repositories <span className="font-normal">(by stars)</span>
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {repos.map((repo) => (
          <RepoCard key={repo.name} repo={repo} />
        ))}
      </div>
    </div>
  )
}

function RepoCard({ repo }) {
  const langColor = LANG_COLORS[repo.language] || '#8b949e'

  const updatedLabel = (() => {
    const diff = Date.now() - new Date(repo.updatedAt).getTime()
    const days = Math.floor(diff / 86_400_000)
    if (days === 0) return 'today'
    if (days === 1) return 'yesterday'
    if (days < 30)  return `${days}d ago`
    const months = Math.floor(days / 30)
    if (months < 12) return `${months}mo ago`
    return `${Math.floor(months / 12)}y ago`
  })()

  return (
    <div className="border border-github-border rounded-lg p-3 hover:border-github-accent transition-colors flex flex-col gap-1.5">
      {/* Repo name */}
      <span className="text-sm font-semibold text-blue-400 truncate" title={repo.name}>
        {repo.name}
      </span>

      {/* Description */}
      {repo.description && (
        <p className="text-xs text-github-muted line-clamp-2 leading-relaxed">
          {repo.description}
        </p>
      )}

      {/* Footer: language • stars • forks • updated */}
      <div className="flex items-center gap-3 mt-auto pt-1 text-xs text-github-muted flex-wrap">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: langColor }}
            />
            {repo.language}
          </span>
        )}

        <span title="Stars">⭐ {repo.stars.toLocaleString()}</span>
        <span title="Forks">🍴 {repo.forks.toLocaleString()}</span>
        <span className="ml-auto" title="Last updated">Updated {updatedLabel}</span>
      </div>
    </div>
  )
}
