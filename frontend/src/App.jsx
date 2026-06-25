import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CandidatesPage from './pages/candidatePage.jsx'
import CandidateDetails from './pages/candidateDetails.jsx'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CandidatesPage />} />
        <Route path="/candidates/:id" element={<CandidateDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App