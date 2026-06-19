import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
//import { AppPlaceholder } from '@/pages/AppPlaceholder'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Landing } from './pages/Landing'
import { AppShell } from './components/layout/AppShell'
import { Dashboard } from './pages/Dashboard'
import { Library } from './pages/Library'
import { Review } from './pages/Review'
import { Stats } from './pages/Stats'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Everything under this guard requires a valid session. Day 9
          replaces AppPlaceholder with the real App Shell + nested
          Dashboard/Library/Review/Stats routes. */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppShell />}>
          <Route path='/app' element={<Dashboard />} />
          <Route path='/app/library' element={<Library />} />
          <Route path='/app/review' element={<Review />} />
          <Route path='/app/stats' element={<Stats />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
