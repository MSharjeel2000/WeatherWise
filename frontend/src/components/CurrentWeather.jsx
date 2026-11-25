
import { useEffect, useState } from 'react'
import { addFavorite } from '../services/favoritesApi'

function CurrentWeather({ weather }) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  // Reset favourite button when the selected city changes
  useEffect(() => {
    setSaved(false)
    setError('')
  }, [weather.city, weather.country])

  async function handleAddFavorite() {
    try {
      setSaving(true)
      setError('')

      await addFavorite({
        name: weather.city,
        country: weather.country,
        latitude: weather.latitude,
        longitude: weather.longitude,
      })

      setSaved(true)
    } catch (error) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="mt-12">
      <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-[#F0F7FC] p-7 shadow-sm sm:p-10 lg:p-12">

        {/* Decorative background elements */}
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">

          {/* Weather information */}
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-sky-700">
                Current weather
              </p>
            </div>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {weather.city}
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              {weather.country}
            </p>

            {/* Temperature */}
            <div className="mt-5 flex items-start">
              <span className="text-8xl font-light leading-none tracking-[-0.07em] text-slate-900 sm:text-9xl">
                {weather.temperature}
              </span>

              <span className="ml-2 mt-2 text-3xl font-light text-slate-500">
                °C
              </span>
            </div>

            <p className="mt-5 text-xl font-semibold text-slate-800">
              {weather.condition}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Feels like{' '}
              <span className="font-semibold text-slate-700">
                {weather.feelsLike}°C
              </span>
            </p>

            {/* Favourite button */}
            <button
              type="button"
              onClick={handleAddFavorite}
              disabled={saving || saved}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span className="text-lg">
                {saved ? '♥' : '♡'}
              </span>

              {saving
                ? 'Saving...'
                : saved
                  ? 'Added to Favourites'
                  : 'Add to Favourites'}
            </button>

            {error && (
              <p
                role="alert"
                className="mt-3 max-w-sm text-sm font-medium text-red-600"
              >
                {error}
              </p>
            )}
          </div>

          {/* Weather illustration and temperature range */}
          <div className="flex flex-col items-center md:items-end">

            <div className="flex h-52 w-52 items-center justify-center rounded-full bg-white/70 shadow-[0_20px_60px_rgba(56,189,248,0.12)] ring-1 ring-white sm:h-64 sm:w-64">
              <span
                className="text-8xl drop-shadow-sm transition-transform duration-500 hover:scale-110 sm:text-9xl"
                role="img"
                aria-label={weather.condition}
              >
                {weather.icon}
              </span>
            </div>

            {/* High and low */}
            <div className="mt-9 grid w-full max-w-sm grid-cols-2 gap-3">

              <div className="rounded-2xl border border-white bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Today's high
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-800">
                  {weather.high}°
                  <span className="text-base font-medium text-slate-400">
                    C
                  </span>
                </p>
              </div>

              <div className="rounded-2xl border border-white bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Today's low
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-800">
                  {weather.low}°
                  <span className="text-base font-medium text-slate-400">
                    C
                  </span>
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom information */}
        <div className="relative mt-10 flex items-center justify-between border-t border-sky-200/70 pt-5">
          <p className="text-xs font-medium text-slate-500">
            Weather conditions at your selected location
          </p>

          <span className="text-xs font-semibold text-sky-700">
            WeatherWise
          </span>
        </div>

      </div>
    </section>
  )
}

export default CurrentWeather