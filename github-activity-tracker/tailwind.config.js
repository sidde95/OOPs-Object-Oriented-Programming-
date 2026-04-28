/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/renderer/**/*.{js,jsx,ts,tsx}',
    './src/renderer/index.html'
  ],
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#0d1117',
          surface: '#161b22',
          border: '#30363d',
          accent: '#238636',
          text: '#e6edf3',
          muted: '#8b949e'
        }
      }
    }
  },
  plugins: []
}
