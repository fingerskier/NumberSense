import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Test from './pages/Test.jsx'
import Results from './pages/Results.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Test />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  )
}
