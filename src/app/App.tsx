import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Container } from '@mui/material'
import EquityCurve from 'pages/EquityCurve'
import AboutPage from 'pages/About'
import Header from 'components/Header'
import Nav from 'components/Nav'

function App() {
  return (
    <div className="app">
      <Header />
      <Nav />
      <Container component="main" className="app-main">
        <Routes>
          <Route path="/" element={<EquityCurve />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Container>
    </div>
  )
}

export default App
