const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Reusable function for communicating with our backend
async function makeRequest(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || 'Something went wrong. Please try again.'
    )
  }

  return result.data
}

// Search for cities
export async function searchCities(query) {
  const params = new URLSearchParams({
    q: query,
  })

  return makeRequest(`/weather/search?${params.toString()}`)
}

// Get weather using city coordinates
export async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude,
    longitude,
  })

  return makeRequest(`/weather/forecast?${params.toString()}`)
}