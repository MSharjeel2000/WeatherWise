const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// Reusable request function
async function makeRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }
  )

  const result = await response.json()

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || 'Unable to complete the request.'
    )
  }

  return result.data
}

// Get all favourite cities
export async function getFavorites() {
  return makeRequest('/favorites')
}

// Add a city to favourites
export async function addFavorite(city) {
  return makeRequest('/favorites', {
    method: 'POST',
    body: JSON.stringify({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    }),
  })
}

// Remove a city from favourites
export async function removeFavorite(id) {
  return makeRequest(`/favorites/${id}`, {
    method: 'DELETE',
  })
}