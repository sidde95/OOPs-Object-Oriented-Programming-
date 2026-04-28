# GitHub Activity Tracker 🐙

A desktop app built with **Electron + React** that lets you track any GitHub user's commit activity, classify their pace, and visualize their history with charts.

> **Learning project** — Demonstrates OOP in JavaScript (backend) + React (frontend) + Electron (desktop).

---

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Desktop shell | Electron | Cross-platform (Windows/Mac/Linux) |
| Frontend UI | React + Vite | Industry-standard component-based UI |
| Styling | Tailwind CSS | Utility-first, fast to prototype |
| Charts | Recharts | React-native charts library |
| HTTP client | Axios | Clean GitHub API calls |
| Local database | better-sqlite3 | No server needed, stores history locally |

---

## Project Structure

```
src/
├── main/                      ← Node.js (Electron main process)
│   ├── index.js               ← App entry, creates BrowserWindow
│   ├── ipc-handlers.js        ← IPC bridge: connects React ↔ backend
│   ├── services/
│   │   ├── GitHubAPIService.js   ← Class: GitHub REST API
│   │   ├── ActivityClassifier.js ← Class: Low/Medium/Good logic
│   │   └── LocalStorage.js       ← Class: SQLite operations
│   └── models/
│       ├── UserProfile.js        ← Data model
│       └── ActivityReport.js     ← Data model
│
├── preload/
│   └── index.js               ← Security bridge (contextBridge)
│
└── renderer/                  ← React app (what the user sees)
    ├── App.jsx                 ← Root component + navigation
    ├── components/
    │   ├── Dashboard.jsx       ← Main view + search
    │   ├── ActivityChart.jsx   ← Recharts bar chart
    │   ├── UserCard.jsx        ← Profile display
    │   └── PaceIndicator.jsx   ← 🔴🟡🟢 badge
    ├── hooks/
    │   └── useGitHubData.js    ← Custom hook for API calls
    └── pages/
        ├── Home.jsx
        └── Settings.jsx        ← Token management
```

---

## OOP Classes

### `GitHubAPIService`
- Encapsulates all GitHub API communication
- Private `#token` field (never leaks)
- Methods: `fetchUserProfile()`, `fetchUserEvents()`, `fetchCommitHistory()`

### `ActivityClassifier`
- Pure logic class — no side effects
- Classifies weekly commit count into Low/Medium/Good
- Methods: `classify()`, `countWeeklyCommits()`, `groupByWeek()`

### `LocalStorage`
- Wraps SQLite with a clean API
- Handles token storage, search history, and cached reports
- Private `#db` connection

### `UserProfile` / `ActivityReport`
- Data models with computed getters (`yearsOnGitHub`, `summary`)
- `toJSON()` for serialization

---

## Setup & Running

### Prerequisites
- Node.js 18+
- npm 9+

### Install

```bash
cd github-activity-tracker
npm install
```

### Run in development

```bash
npm run dev
```

This starts:
1. Vite dev server for React (hot reload)
2. Electron window pointing at the dev server

### Build for production

```bash
npm run build
npm run package
```

Creates a distributable `.exe` (Windows), `.dmg` (macOS), or `.AppImage` (Linux).

---

## Features

| Feature | Status |
|---|---|
| 🔑 Token setup (Settings page) | ✅ |
| 🔍 Search any GitHub username | ✅ |
| 👤 User profile card | ✅ |
| 🟢 Pace indicator badge | ✅ |
| 📊 Weekly commit bar chart | ✅ |
| 🕓 Search history (SQLite) | ✅ |
| ⬇ Export report as JSON | ✅ |

---

## How Electron IPC Works (Key Concept)

```
React (renderer)                Preload            Main Process
      │                             │                   │
      │  window.electron.github     │                   │
      │  .fetchUser('torvalds')  ──>│  ipcRenderer      │
      │                             │  .invoke()     ──>│  ipcMain.handle()
      │                             │                   │  GitHubAPIService
      │                             │                   │  .fetchUserProfile()
      │  ← report data ────────────<│  ← return value ──│
```

The preload script acts as a **secure bridge** — React cannot access Node.js APIs directly. This is intentional for security.

---

## GitHub Token

A token is optional but strongly recommended:
- **Without token**: 60 API requests/hour
- **With token**: 5,000 API requests/hour

[Create a token →](https://github.com/settings/tokens/new?scopes=read:user,repo&description=GitHub+Activity+Tracker)

Required scopes: `read:user`, `public_repo`

Your token is stored locally in SQLite — never sent anywhere except `api.github.com`.
