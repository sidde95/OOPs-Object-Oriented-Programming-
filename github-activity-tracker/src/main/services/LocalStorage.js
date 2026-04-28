import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'path'
import { mkdirSync } from 'fs'

/**
 * LocalStorage
 *
 * Manages all SQLite database operations for the app.
 * Stores: GitHub token, search history, and cached activity reports.
 *
 * OOP concepts used:
 *  - Encapsulation: database connection is private; only public methods expose operations
 *  - Single Responsibility: only concerned with local data persistence
 *  - Constructor initialization: schema is created on instantiation
 *
 * Database location: Electron's userData directory
 *   Windows: %APPDATA%/github-activity-tracker/
 *   macOS:   ~/Library/Application Support/github-activity-tracker/
 *   Linux:   ~/.config/github-activity-tracker/
 */
export class LocalStorage {
  #db  // Private — raw better-sqlite3 connection

  constructor() {
    const userDataPath = app.getPath('userData')
    mkdirSync(userDataPath, { recursive: true })

    const dbPath = join(userDataPath, 'app.db')
    this.#db = new Database(dbPath)

    // Enable WAL mode for better performance (safe for concurrent reads)
    this.#db.pragma('journal_mode = WAL')

    this.#initSchema()
  }

  // ── Private ────────────────────────────────────────────────────────────────

  /**
   * Creates all required tables if they don't already exist.
   * Called once on startup.
   */
  #initSchema() {
    this.#db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key   TEXT PRIMARY KEY,
        value TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS search_history (
        username    TEXT PRIMARY KEY,
        report_json TEXT NOT NULL,
        searched_at TEXT NOT NULL
      );
    `)
  }

  // ── Token ──────────────────────────────────────────────────────────────────

  /**
   * Saves the GitHub Personal Access Token to local DB.
   * NOTE: Stored in plaintext in the user's local app directory.
   *       For production, use system keychain (keytar package).
   * @param {string} token
   */
  saveToken(token) {
    const stmt = this.#db.prepare(
      `INSERT OR REPLACE INTO settings (key, value) VALUES ('github_token', ?)`
    )
    stmt.run(token)
  }

  /**
   * Retrieves the stored token, or null if not set.
   * @returns {string|null}
   */
  getToken() {
    const row = this.#db.prepare(
      `SELECT value FROM settings WHERE key = 'github_token'`
    ).get()
    return row ? row.value : null
  }

  /**
   * Removes the stored token.
   */
  deleteToken() {
    this.#db.prepare(`DELETE FROM settings WHERE key = 'github_token'`).run()
  }

  // ── Search history ─────────────────────────────────────────────────────────

  /**
   * Saves (or updates) a search result for a username.
   * @param {string} username
   * @param {object} report
   */
  saveSearch(username, report) {
    const stmt = this.#db.prepare(`
      INSERT OR REPLACE INTO search_history (username, report_json, searched_at)
      VALUES (?, ?, ?)
    `)
    stmt.run(username, JSON.stringify(report), new Date().toISOString())
  }

  /**
   * Retrieves cached data for a specific username.
   * @param {string} username
   * @returns {object|null}
   */
  getSearchRecord(username) {
    const row = this.#db.prepare(
      `SELECT * FROM search_history WHERE username = ?`
    ).get(username)

    if (!row) return null
    return {
      username: row.username,
      searchedAt: row.searched_at,
      ...JSON.parse(row.report_json)
    }
  }

  /**
   * Returns all past searches, ordered most recent first.
   * @returns {Array<{username, searchedAt}>}
   */
  getAllSearchHistory() {
    const rows = this.#db.prepare(`
      SELECT username, searched_at FROM search_history
      ORDER BY searched_at DESC
      LIMIT 50
    `).all()

    return rows.map((row) => ({
      username: row.username,
      searchedAt: row.searched_at
    }))
  }

  /**
   * Deletes history for a specific username.
   * @param {string} username
   */
  deleteSearchHistory(username) {
    this.#db.prepare(`DELETE FROM search_history WHERE username = ?`).run(username)
  }

  /**
   * Clears all search history.
   */
  clearAllHistory() {
    this.#db.prepare(`DELETE FROM search_history`).run()
  }

  /**
   * Closes the database connection.
   * Called when the Electron app is quitting.
   */
  close() {
    this.#db.close()
  }
}
