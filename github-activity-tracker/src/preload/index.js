/**
 * Preload Script
 *
 * Runs in an isolated context with access to both Node.js APIs and the DOM.
 * Exposes a safe, limited API to the renderer (React) via contextBridge.
 *
 * This is the ONLY way the renderer can talk to the Electron main process.
 * It prevents React code from having direct access to Node.js internals.
 *
 * Security: contextIsolation: true means this runs in a separate context,
 * so the renderer cannot reach Node.js globals even if it tries.
 */
import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electron', {
  // ── Token ──────────────────────────────────────────────────────────────────
  token: {
    save:   (token)    => ipcRenderer.invoke('token:save', token),
    get:    ()         => ipcRenderer.invoke('token:get'),
    delete: ()         => ipcRenderer.invoke('token:delete')
  },

  // ── GitHub ─────────────────────────────────────────────────────────────────
  github: {
    fetchUser:          (username) => ipcRenderer.invoke('github:fetch-user', username),
    fetchCommitHistory: (username) => ipcRenderer.invoke('github:fetch-commit-history', username)
  },

  // ── History ────────────────────────────────────────────────────────────────
  history: {
    getAll: ()         => ipcRenderer.invoke('history:get-all'),
    delete: (username) => ipcRenderer.invoke('history:delete', username),
    clear:  ()         => ipcRenderer.invoke('history:clear')
  },

  // ── Export ─────────────────────────────────────────────────────────────────
  export: {
    toJSON: (username) => ipcRenderer.invoke('export:json', username)
  }
})
