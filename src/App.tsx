import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '@/pages/Login'
import { Register } from '@/pages/Register'
import { AppPlaceholder } from '@/pages/AppPlaceholder'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

function App() {
  return (
    <Routes>
      {/* Day 9 adds a real public Landing page at "/" -- for now,
          unauthenticated visitors land on Login. */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Everything under this guard requires a valid session. Day 9
          replaces AppPlaceholder with the real App Shell + nested
          Dashboard/Library/Review/Stats routes. */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppPlaceholder />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
