
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

import WeatherPage from './pages/WeatherPage'
import FavoritesPage from './pages/FavoritesPage'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">

      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<WeatherPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>

      <Footer />

    </div>
  )
}

export default App