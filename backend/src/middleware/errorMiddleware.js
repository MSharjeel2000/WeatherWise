// Handle unknown routes
export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`)

  error.statusCode = 404

  next(error)
}

// Handle application errors
export function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500

  console.error(error.message)

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? 'Something went wrong. Please try again later.'
        : error.message,
  })
}