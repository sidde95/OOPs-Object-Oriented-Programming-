/**
 * UserCard
 *
 * Displays a GitHub user's profile: avatar, name, bio, and key stats.
 *
 * Props:
 *  - profile: UserProfile-shaped object
 */
export default function UserCard({ profile }) {
  if (!profile) return null

  return (
    <div className="bg-github-surface border border-github-border rounded-xl p-5 flex gap-4">
      {/* Avatar */}
      <img
        src={profile.avatarUrl}
        alt={`${profile.login} avatar`}
        className="w-20 h-20 rounded-full border-2 border-github-border flex-shrink-0"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-xl font-bold text-github-text truncate">{profile.name}</h2>
          <span className="text-github-muted text-sm">@{profile.login}</span>
        </div>

        {profile.bio && (
          <p className="text-github-muted text-sm mt-1 line-clamp-2">{profile.bio}</p>
        )}

        {profile.location && (
          <p className="text-github-muted text-xs mt-1">📍 {profile.location}</p>
        )}

        {/* Stats row */}
        <div className="flex gap-4 mt-3 text-sm">
          <Stat label="Repos"     value={profile.publicRepos} />
          <Stat label="Followers" value={profile.followers} />
          <Stat label="Following" value={profile.following} />
          {profile.yearsOnGitHub > 0 && (
            <Stat label="Years on GitHub" value={profile.yearsOnGitHub} />
          )}
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="text-center">
      <div className="font-bold text-github-text">{value}</div>
      <div className="text-github-muted text-xs">{label}</div>
    </div>
  )
}
