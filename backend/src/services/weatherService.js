const GEOCODING_URL =
  'https://geocoding-api.open-meteo.com/v1/search'

const FORECAST_URL =
  'https://api.open-meteo.com/v1/forecast'

// Search for locations
export async function searchLocations(query) {
  const url = new URL(GEOCODING_URL)

  url.searchParams.set('name', query)
  url.searchParams.set('count', '5')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')

  const response = await fetch(url, {
    signal: AbortSignal.timeout(10000),
  })

  const data = await response.json()

  if (!response.ok || data.error) {
    throw new Error(data.reason || 'Unable to search locations.')
  }

  return data.results || []
}

// Get weather forecast
export async function getWeatherForecast(latitude, longitude) {
  const url = new URL(FORECAST_URL)

  // Current weather variables
  url.searchParams.set(
    'current',
    [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'wind_direction_10m',
    ].join(',')
  )

  // Hourly weather variables
  url.searchParams.set(
    'hourly',
    [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'weather_code',
      'visibility',
      'wind_speed_10m',
      'uv_index',
    ].join(',')
  )

  // Daily weather variables
  url.searchParams.set(
    'daily',
    [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'uv_index_max',
      'wind_speed_10m_max',
    ].join(',')
  )

  url.searchParams.set('latitude', latitude)
  url.searchParams.set('longitude', longitude)
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('forecast_days', '7')
  url.searchParams.set('wind_speed_unit', 'kmh')

  const response = await fetch(url, {
    signal: AbortSignal.timeout(10000),
  })

  const data = await response.json()

  if (!response.ok || data.error) {
    throw new Error(data.reason || 'Unable to fetch weather data.')
  }

  return data
}