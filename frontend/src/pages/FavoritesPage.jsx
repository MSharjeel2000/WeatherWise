
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  getFavorites,
  removeFavorite,
} from '../services/favoritesApi'

function FavoritesPage() {
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [removingId, setRemovingId] = useState(null)

  const navigate = useNavigate()

  async function loadFavorites() {
    try {
      setLoading(true)
      setError('')

      const data = await getFavorites()
      setFavorites(data)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFavorites()
  }, [])

  async function handleRemoveFavorite(id) {
    try {
      setRemovingId(id)
      setError('')

      await removeFavorite(id)

      setFavorites((currentFavorites) =>
        currentFavorites.filter(
          (favorite) => favorite._id !== id
        )
      )
    } catch (error) {
      setError(error.message)
    } finally {
      setRemovingId(null)
    }
  }

  function handleCityClick(favorite) {
    navigate('/', {
      state: {
        selectedCity: {
          name: favorite.name,
          country: favorite.country,
          latitude: favorite.latitude,
          longitude: favorite.longitude,
        },
      },
    })
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
          Your collection
        </p>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Favourite Cities
        </h1>

        <p className="mt-3 max-w-xl text-slate-500">
          Keep your favourite locations close and check
          their weather whenever you want.
        </p>
      </section>

      {loading && (
        <div className="mt-12 py-12 text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-sky-600" />

          <p className="mt-4 text-sm text-slate-500">
            Loading your favourite cities...
          </p>
        </div>
      )}

      {!loading && error && (
        <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6">
          <h2 className="font-semibold text-red-800">
            Unable to load favourites
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            onClick={loadFavorites}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && favorites.length === 0 && (
        <div className="mt-12 rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <div className="text-5xl" aria-hidden="true">
            ❤️
          </div>

          <h2 className="mt-5 text-xl font-semibold text-slate-900">
            No favourite cities yet
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Search for a city on the Weather page and
            add it to your favourites.
          </p>
        </div>
      )}

      {!loading && !error && favorites.length > 0 && (
        <section className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">
              Your saved locations
            </h2>

            <span className="text-sm text-slate-500">
              {favorites.length}{' '}
              {favorites.length === 1 ? 'city' : 'cities'}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <article
                key={favorite._id}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-sky-300 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => handleCityClick(favorite)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {favorite.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {favorite.country}
                      </p>
                    </div>

                    <span className="text-3xl" aria-hidden="true">
                      🌤️
                    </span>
                  </div>

                  <p className="mt-5 text-xs text-slate-400">
                    {favorite.latitude.toFixed(2)}°,{' '}
                    {favorite.longitude.toFixed(2)}°
                  </p>

                  <p className="mt-3 text-sm font-medium text-sky-600">
                    View weather →
                  </p>
                </button>

                <button
                  onClick={() =>
                    handleRemoveFavorite(favorite._id)
                  }
                  disabled={removingId === favorite._id}
                  className="mt-5 w-full rounded-xl border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                >
                  {removingId === favorite._id
                    ? 'Removing...'
                    : '♥ Remove from Favourites'}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}

export default FavoritesPage