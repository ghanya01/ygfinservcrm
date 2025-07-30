import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Layout from './components/Layout'
import LoginPage from './pages/auth/LoginPage'
import DashboardPage from './pages/DashboardPage'
import ClientsPage from './pages/ClientsPage'
import LeadsPage from './pages/LeadsPage'
import DealsPage from './pages/DealsPage'
import ActivitiesPage from './pages/ActivitiesPage'
import InvestmentsPage from './pages/InvestmentsPage'
import ProfilePage from './pages/ProfilePage'
import LoadingSpinner from './components/ui/LoadingSpinner'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/clients" element={<ClientsPage />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/investments" element={<InvestmentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  )
}

export default App