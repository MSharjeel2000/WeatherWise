import express from 'express'

import {
  searchCities,
  getForecast,
} from '../controllers/weatherController.js'

const router = express.Router()

// Search cities
router.get('/search', searchCities)

// Get weather forecast
router.get('/forecast', getForecast)

export default router