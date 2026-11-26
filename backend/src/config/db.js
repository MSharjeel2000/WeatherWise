
import mongoose from 'mongoose'

let connectionPromise = null

async function connectDB() {
  // Reuse an existing connection
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection
  }

  // Prevent multiple simultaneous connection attempts
  if (connectionPromise) {
    return connectionPromise
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is missing')
  }

  connectionPromise = mongoose
    .connect(process.env.MONGODB_URI)
    .then((connection) => {
      console.log(
        `MongoDB connected: ${connection.connection.host}`
      )

      return connection.connection
    })
    .catch((error) => {
      console.error(`MongoDB connection failed: ${error.message}`)
      throw error
    })
    .finally(() => {
      connectionPromise = null
    })

  return connectionPromise
}

export default connectDB
