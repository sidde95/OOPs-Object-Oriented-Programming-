import axios from 'axios'

/**
 * GitHubAPIService
 *
 * Handles all communication with the GitHub REST API.
 * Encapsulates authentication, endpoint URLs, and error handling.
 *
 * OOP concepts used:
 *  - Encapsulation: token and baseURL are private details of this class
 *  - Single Responsibility: only concerned with GitHub API calls
 */
export class GitHubAPIService {
  #token        // Private field — token never leaks outside this class
  #baseURL = 'https://api.github.com'

  /**
   * @param {string|null} token - GitHub Personal Access Token (optional but recommended)
   *                              Without a token, rate limit is 60 req/hr.
   *                              With a token, rate limit is 5000 req/hr.
   */
  constructor(token = null) {
    this.#token = token
  }

  // ── Private helper ─────────────────────────────────────────────────────────

  /**
   * Returns axios request headers, adding Authorization if a token is set.
   * @returns {object}
   */
  #buildHeaders() {
    const headers = {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
    if (this.#token) {
      headers.Authorization = `Bearer ${this.#token}`
    }
    return headers
  }

  /**
   * Generic GET request to GitHub API with error handling.
   * @param {string} endpoint - Path after base URL, e.g. '/users/torvalds'
   * @param {object} params   - Query string params
   * @returns {Promise<any>}
   */
  async #get(endpoint, params = {}) {
    try {
      const response = await axios.get(`${this.#baseURL}${endpoint}`, {
        headers: this.#buildHeaders(),
        params
      })
      return response.data
    } catch (error) {
      if (error.response) {
        const status = error.response.status
        if (status === 401) throw new Error('Invalid GitHub token. Please check your settings.')
        if (status === 403) throw new Error('GitHub API rate limit exceeded. Add a token in Settings.')
        if (status === 404) throw new Error(`GitHub user not found.`)
      }
      throw new Error(`GitHub API error: ${error.message}`)
    }
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  /**
   * Fetches a user's public profile.
   * @param {string} username
   * @returns {Promise<UserProfile-shaped object>}
   */
  async fetchUserProfile(username) {
    const data = await this.#get(`/users/${username}`)
    return {
      login: data.login,
      name: data.name,
      avatarUrl: data.avatar_url,
      bio: data.bio,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      createdAt: data.created_at,
      location: data.location,
      blog: data.blog
    }
  }

  /**
   * Fetches the most recent public events for a user (up to 100).
   * Events include PushEvent (commits), PullRequestEvent, IssuesEvent, etc.
   * @param {string} username
   * @returns {Promise<Array>}
   */
  async fetchUserEvents(username) {
    return this.#get(`/users/${username}/events/public`, { per_page: 100 })
  }

  /**
   * Fetches the user's top repositories sorted by star count.
   * Returns the top 6 repos with key metadata for the RepoStats panel.
   * @param {string} username
   * @returns {Promise<Array<{name, description, language, stars, forks, updatedAt, url}>>}
   */
  async fetchRepoStats(username) {
    const repos = await this.#get(`/users/${username}/repos`, {
      sort: 'stars',
      direction: 'desc',
      per_page: 6
    })

    return repos.map((repo) => ({
      name:        repo.name,
      description: repo.description || '',
      language:    repo.language || null,
      stars:       repo.stargazers_count,
      forks:       repo.forks_count,
      updatedAt:   repo.updated_at,
      url:         repo.html_url
    }))
  }

  /**
   * Fetches commit history across all repos for the past year.
   * Uses the /repos/:owner/:repo/commits endpoint for each repo.
   * @param {string} username
   * @returns {Promise<Array<{date: string, count: number}>>} — daily commit counts
   */
  async fetchCommitHistory(username) {
    // Get the user's top 10 most recently updated repos
    const repos = await this.#get(`/users/${username}/repos`, {
      sort: 'pushed',
      per_page: 10
    })

    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    // Fetch commits from each repo in parallel
    const commitsByDate = {}

    await Promise.all(
      repos.map(async (repo) => {
        try {
          const commits = await this.#get(`/repos/${username}/${repo.name}/commits`, {
            author: username,
            since: oneYearAgo.toISOString(),
            per_page: 100
          })

          commits.forEach((commit) => {
            const date = commit.commit.author.date.split('T')[0]  // 'YYYY-MM-DD'
            commitsByDate[date] = (commitsByDate[date] || 0) + 1
          })
        } catch {
          // Silently skip repos that are inaccessible or empty
        }
      })
    )

    // Convert to sorted array for Recharts
    return Object.entries(commitsByDate)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date))
  }
}
