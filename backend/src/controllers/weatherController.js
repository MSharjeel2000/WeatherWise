
import {
  searchLocations,
  getWeatherForecast,
} from '../services/weatherService.js'

import {
  formatWeatherData,
} from '../services/weatherFormatter.js'

// Search for cities
export async function searchCities(req, res, next) {
  try {
    const query = req.query.q?.trim()

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a city name.',
      })
    }

    if (query.length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Please enter at least 2 characters.',
      })
    }

    const locations = await searchLocations(query)

    return res.status(200).json({
      success: true,
      count: locations.length,
      data: locations,
    })
  } catch (error) {
    next(error)
  }
}

// Get formatted weather forecast
export async function getForecast(req, res, next) {
  try {
    const latitude = Number(req.query.latitude)
    const longitude = Number(req.query.longitude)

    if (
      req.query.latitude === undefined ||
      req.query.longitude === undefined ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude) ||
      latitude < -90 ||
      latitude > 90 ||
      longitude < -180 ||
      longitude > 180
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide valid latitude and longitude.',
      })
    }

    const weather = await getWeatherForecast(
      latitude,
      longitude
    )

    const formattedWeather = formatWeatherData(weather)

    return res.status(200).json({
      success: true,
      data: formattedWeather,
    })
  } catch (error) {
    next(error)
  }
}