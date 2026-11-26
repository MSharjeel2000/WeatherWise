import express from 'express'
import cors from 'cors'

import connectDB from './config/db.js'

import healthRoutes from './routes/healthRoutes.js'
import weatherRoutes from './routes/weatherRoutes.js'
import favoriteRoutes from './routes/favoriteRoutes.js'

import {
  notFound,
  errorHandler,
} from './middleware/errorMiddleware.js'

const app = express()

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL,
].filter(Boolean)

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as server-to-server requests.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      return callback(new Error('Not allowed by CORS'))
    },
  })
)

app.use(express.json())

// Connect to MongoDB before processing API requests.
// The connection is reused across requests when possible.
app.use(async (req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (error) {
    next(error)
  }
})

// API routes
app.use('/api/health', healthRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/favorites', favoriteRoutes)

// Error handling
app.use(notFound)
app.use(errorHandler)

export default app