import { Navigate, Route, Routes } from 'react-router-dom'
import { AppStateProvider } from '@/state/AppState'
import Landing from '@/pages/Landing'
import Login from '@/pages/Login'
import AdminDashboard from '@/pages/admin/AdminDashboard'
import EngineeringDashboard from '@/pages/department/EngineeringDashboard'
import SntDashboard from '@/pages/department/SntDashboard'
import TrdDashboard from '@/pages/department/TrdDashboard'
import AccessRestricted from '@/pages/AccessRestricted'
import AppShell from '@/components/app/AppShell'

export default function App() {
  return (
    <AppStateProvider>
      <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/restricted" element={<AccessRestricted />} />
      
      <>
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/engineering/*" element={<EngineeringDashboard />} />
        <Route path="/snt/*" element={<SntDashboard />} />
        <Route path="/trd/*" element={<TrdDashboard />} />
      </>
      
      <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppStateProvider>
  )
}
