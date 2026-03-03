import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import GetStarted from './pages/GetStarted'
import Auth from './pages/Auth'
import Consent from './pages/Consent'
import Loading from './pages/Loading'
import Assessment from './pages/Assessment'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/get-started" replace />} />
        <Route path="/get-started" element={<GetStarted />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </Router>
  )
}

export default App
