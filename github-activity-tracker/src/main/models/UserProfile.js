/**
 * UserProfile
 *
 * Data model representing a GitHub user's profile information.
 *
 * OOP concepts used:
 *  - Encapsulation: all fields set via constructor, not scattered logic
 *  - Data modeling: clear shape for passing user data through the app
 */
export class UserProfile {
  constructor({
    login,
    name,
    avatarUrl,
    bio,
    publicRepos,
    followers,
    following,
    createdAt,
    location,
    blog
  }) {
    this.login       = login
    this.name        = name || login        // Fallback to username if no display name
    this.avatarUrl   = avatarUrl
    this.bio         = bio || ''
    this.publicRepos = publicRepos || 0
    this.followers   = followers || 0
    this.following   = following || 0
    this.createdAt   = new Date(createdAt)
    this.location    = location || ''
    this.blog        = blog || ''
  }

  /**
   * Returns how many full years the user has been on GitHub.
   * @returns {number}
   */
  get yearsOnGitHub() {
    const now = new Date()
    return now.getFullYear() - this.createdAt.getFullYear()
  }

  /**
   * Returns a human-readable join date string.
   * @returns {string}
   */
  get joinedDate() {
    return this.createdAt.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    })
  }

  /**
   * Returns a plain object safe to serialize / send over IPC.
   * @returns {object}
   */
  toJSON() {
    return {
      login:       this.login,
      name:        this.name,
      avatarUrl:   this.avatarUrl,
      bio:         this.bio,
      publicRepos: this.publicRepos,
      followers:   this.followers,
      following:   this.following,
      joinedDate:  this.joinedDate,
      yearsOnGitHub: this.yearsOnGitHub,
      location:    this.location,
      blog:        this.blog
    }
  }
}
