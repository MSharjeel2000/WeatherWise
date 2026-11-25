
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import SearchBar from '../components/SearchBar'
import CurrentWeather from '../components/CurrentWeather'
import WeatherDetails from '../components/WeatherDetails'
import HourlyForecast from '../components/HourlyForecast'
import DailyForecast from '../components/DailyForecast'

import { getWeather } from '../services/weatherApi'

function WeatherPage() {
  const location = useLocation()

  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCitySelect(city) {
    try {
      setLoading(true)
      setError('')
      setWeather(null)

      const weatherData = await getWeather(
        city.latitude,
        city.longitude
      )

      setWeather({
        ...weatherData,
        city: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  // Automatically load weather when navigating from Favourites
  useEffect(() => {
    const selectedCity = location.state?.selectedCity

    if (selectedCity) {
      handleCitySelect(selectedCity)

      // Clear navigation state after processing it
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
          WeatherWise
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Discover your weather
        </h1>

        <p className="mt-3 max-w-xl text-slate-500">
          Get a clear picture of the weather wherever you are.
        </p>
      </section>

      <div className="mt-8">
        <SearchBar onCitySelect={handleCitySelect} />
      </div>

      {loading && (
        <div className="mt-12 py-12 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />

          <p className="mt-4 text-sm font-medium text-slate-700">
            Getting your weather...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Please wait while we fetch the latest conditions.
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">
            Unable to load weather
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <p className="mt-2 text-sm text-red-600">
            Please try selecting the city again.
          </p>
        </div>
      )}

      {!loading && !error && !weather && (
        <section className="mt-16 py-12 text-center">
          <div className="text-6xl" aria-hidden="true">
            🌤️
          </div>

          <h2 className="mt-6 text-2xl font-semibold tracking-tight">
            Your weather, your world.
          </h2>

          <p className="mx-auto mt-3 max-w-md text-slate-500">
            Search for a city to explore its current
            conditions, hourly forecast, and upcoming
            weather.
          </p>
        </section>
      )}

      {!loading && weather && (
        <div className="mt-10">
          <CurrentWeather weather={weather} />
          <WeatherDetails details={weather} />
          <HourlyForecast forecast={weather.hourly} />
          <DailyForecast forecast={weather.daily} />
        </div>
      )}
    </main>
  )
}

export default WeatherPage