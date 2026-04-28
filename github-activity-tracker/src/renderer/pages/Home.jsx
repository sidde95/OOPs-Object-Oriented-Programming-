import Dashboard from '../components/Dashboard.jsx'

/**
 * Home page — wraps the Dashboard component.
 * Kept as a thin wrapper so routing can be added later without refactoring.
 */
export default function Home() {
  return <Dashboard />
}
