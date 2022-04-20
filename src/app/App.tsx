import './App.css'
import { Route, Routes } from 'react-router-dom'
import SimulatorPage from 'pages/Simulator'
import AboutPage from 'pages/About'
import Header from 'components/header'
import Nav from 'components/nav'

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <main className="App-main">
        <Routes>
          <Route path="/" element={<SimulatorPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
