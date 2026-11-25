
import { useEffect, useState } from 'react'
import { searchCities } from '../services/weatherApi'

function SearchBar({ onCitySelect }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const trimmedQuery = query.trim()

    // Don't search for queries shorter than two characters
    if (trimmedQuery.length < 2) {
      setSuggestions([])
      setError('')
      setLoading(false)
      return
    }

    // Clear previous results immediately
    setSuggestions([])
    setError('')
    setLoading(true)

    let cancelled = false

    // Debounce the API request
    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchCities(trimmedQuery)

        if (!cancelled) {
          setSuggestions(results)
        }
      } catch (error) {
        if (!cancelled) {
          setSuggestions([])
          setError(error.message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }, 400)

    // Prevent outdated requests from updating the UI
    return () => {
      cancelled = true
      clearTimeout(timeoutId)
    }
  }, [query])

  function handleSelectCity(city) {
    setQuery(`${city.name}, ${city.country}`)
    setSuggestions([])
    setError('')
    setLoading(false)

    onCitySelect(city)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (suggestions.length > 0 && !loading) {
      handleSelectCity(suggestions[0])
    }
  }

  return (
    <div className="relative w-full max-w-xl">

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm transition focus-within:border-sky-300 focus-within:ring-4 focus-within:ring-sky-100 sm:gap-3"
      >
        <span
          className="pl-2 text-xl text-slate-400"
          aria-hidden="true"
        >
          🔍
        </span>

        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for a city..."
          aria-label="Search for a city"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={suggestions.length > 0}
          aria-controls="city-suggestions"
          className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />

        <button
          type="submit"
          disabled={loading || suggestions.length === 0}
          className="shrink-0 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* City suggestions */}
      {suggestions.length > 0 && (
        <div
          id="city-suggestions"
          role="listbox"
          aria-label="City suggestions"
          className="absolute left-0 right-0 top-full z-30 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl"
        >
          {suggestions.map((city) => (
            <button
              key={city.id}
              type="button"
              role="option"
              aria-selected="false"
              onClick={() => handleSelectCity(city)}
              className="block w-full border-b border-slate-100 px-4 py-3 text-left transition last:border-b-0 hover:bg-sky-50 focus:bg-sky-50 focus:outline-none"
            >
              <span className="block text-sm font-semibold text-slate-800">
                {city.name}
              </span>

              <span className="text-xs text-slate-500">
                {[city.admin1, city.country]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Loading feedback */}
      {loading && (
        <p
          role="status"
          className="mt-3 text-xs font-medium text-slate-500"
        >
          Searching locations...
        </p>
      )}

      {/* Error feedback */}
      {error && (
        <p
          role="alert"
          className="mt-3 text-xs font-medium text-red-500"
        >
          {error}
        </p>
      )}

      {/* Empty results */}
      {!loading &&
        !error &&
        query.trim().length >= 2 &&
        suggestions.length === 0 && (
          <p className="mt-3 text-xs text-slate-500">
            No matching locations found. Try another city.
          </p>
        )}

    </div>
  )
}

export default SearchBar