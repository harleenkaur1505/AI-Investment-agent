import logger from '../utils/logger.js';

/**
 * Global Express error handling middleware.
 * Ensures all unhandled errors are formatted into standard, clean JSON responses.
 */
const errorHandler = (err, req, res, next) => {
  // Log the complete error and stack trace on the server
  logger.error(`${req.method} ${req.url} - Error: ${err.message}`, err.stack);

  const statusCode = err.statusCode || err.status || 500;
  
  // Standard response payload
  const response = {
    error: err.message || 'Internal Server Error',
  };

  // If in development mode, include stack trace for debugging
  if (process.env.NODE_ENV === 'development') {
    response.stack = err.stack;
  }

  // Prevent leaking detailed 500 database/network errors to client in production
  if (statusCode === 500 && process.env.NODE_ENV === 'production') {
    response.error = 'An unexpected error occurred. Please try again later.';
  }

  res.status(statusCode).json(response);
};

export default errorHandler;
