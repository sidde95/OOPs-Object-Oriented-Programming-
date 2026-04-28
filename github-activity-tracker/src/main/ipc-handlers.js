import { ipcMain, app, Notification } from 'electron'
import { GitHubAPIService } from './services/GitHubAPIService.js'
import { ActivityClassifier } from './services/ActivityClassifier.js'
import { LocalStorage } from './services/LocalStorage.js'

// Shared service instances (singletons for the lifetime of the app)
const db = new LocalStorage()
const classifier = new ActivityClassifier()

/**
 * Registers all IPC (Inter-Process Communication) handlers.
 *
 * The renderer (React) calls window.electron.ipcRenderer.invoke(channel, ...args)
 * and these handlers respond with data from the backend services.
 *
 * Pattern: 'noun:verb' channel naming
 */
export function registerIpcHandlers() {
  // ── Token management ───────────────────────────────────────────────────────

  ipcMain.handle('token:save', (_event, token) => {
    db.saveToken(token)
    return { success: true }
  })

  ipcMain.handle('token:get', () => {
    return db.getToken()
  })

  ipcMain.handle('token:delete', () => {
    db.deleteToken()
    return { success: true }
  })

  // ── GitHub user data ───────────────────────────────────────────────────────

  ipcMain.handle('github:fetch-user', async (_event, username) => {
    const token = db.getToken()
    const api = new GitHubAPIService(token)

    // Fetch profile, events, commit history, and repo stats all in parallel
    const [profile, events, commitHistory, repoStats] = await Promise.all([
      api.fetchUserProfile(username),
      api.fetchUserEvents(username),
      api.fetchCommitHistory(username),
      api.fetchRepoStats(username)
    ])

    // Classify activity
    const weeklyCommits = classifier.countWeeklyCommits(events)
    const pace = classifier.classify(weeklyCommits)

    // Build chart data and streak from commit history
    const weeklyChart  = classifier.groupByWeek(commitHistory)
    const streak       = classifier.calculateStreak(commitHistory)

    // Last 30 days of daily activity for the heatmap
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 29)
    cutoff.setHours(0, 0, 0, 0)
    const dailyActivity = commitHistory.filter((d) => new Date(d.date) >= cutoff)

    const report = {
      profile,
      weeklyCommits,
      pace,
      recentEvents: events.slice(0, 30),
      weeklyChart,
      streak,
      dailyActivity,
      repoStats
    }

    // Cache this search in the local database
    db.saveSearch(username, report)

    return report
  })

  ipcMain.handle('github:fetch-commit-history', async (_event, username) => {
    const token = db.getToken()
    const api = new GitHubAPIService(token)
    return api.fetchCommitHistory(username)
  })

  // ── Search history ─────────────────────────────────────────────────────────

  ipcMain.handle('history:get-all', () => {
    return db.getAllSearchHistory()
  })

  ipcMain.handle('history:delete', (_event, username) => {
    db.deleteSearchHistory(username)
    return { success: true }
  })

  ipcMain.handle('history:clear', () => {
    db.clearAllHistory()
    return { success: true }
  })

  // ── Export ─────────────────────────────────────────────────────────────────

  ipcMain.handle('export:json', (_event, username) => {
    const record = db.getSearchRecord(username)
    if (!record) return { success: false, message: 'No data found for user' }

    const { dialog } = require('electron')
    const { writeFileSync } = require('fs')

    const savePath = dialog.showSaveDialogSync({
      defaultPath: `${username}-activity-report.json`,
      filters: [{ name: 'JSON', extensions: ['json'] }]
    })

    if (savePath) {
      writeFileSync(savePath, JSON.stringify(record, null, 2))
      return { success: true, path: savePath }
    }

    return { success: false, message: 'Save cancelled' }
  })

  // ── Notifications ──────────────────────────────────────────────────────────

  ipcMain.handle('notification:send', (_event, title, body) => {
    try {
      if (Notification.isSupported()) {
        new Notification({ title, body, silent: false }).show()
      }
    } catch {
      // Notifications may not be supported on all platforms/environments
    }
    return { success: true }
  })
}
