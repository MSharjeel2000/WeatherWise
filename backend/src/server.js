
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import connectDB from './config/db.js'

import healthRoutes from './routes/healthRoutes.js'
import weatherRoutes from './routes/weatherRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'

import {
  notFound,
  errorHandler,
} from './middleware/errorMiddleware.js'

dotenv.config()

const app = express()

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
  })
)

app.use(express.json())

// API routes
app.use('/api/health', healthRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/favorites', favoriteRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

// Start server after connecting to MongoDB
const PORT = process.env.PORT || 5000

async function startServer() {
  await connectDB()

  app.listen(PORT, () => {
    console.log(`WeatherWise backend running on port ${PORT}`)
  })
}

startServer()