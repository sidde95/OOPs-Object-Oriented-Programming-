import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { registerIpcHandlers } from './ipc-handlers.js'

/**
 * Creates the main application window.
 * Called once Electron is ready.
 */
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#0d1117',  // GitHub dark background
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,     // Security: isolate renderer from Node.js
      nodeIntegration: false       // Security: renderer cannot access Node APIs directly
    },
    titleBarStyle: 'hiddenInset',
    show: false  // Show only after content loads (avoids white flash)
  })

  // Load React app (dev server in dev mode, built files in production)
  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  // Show window once it is ready to avoid white flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  // Open DevTools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }
}

// Register all IPC handlers (bridges between renderer and backend services)
registerIpcHandlers()

app.whenReady().then(() => {
  createWindow()

  // macOS: re-create window when dock icon is clicked and no other windows are open
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
