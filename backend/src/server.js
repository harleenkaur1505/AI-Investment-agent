import express from 'express';
import cors from 'cors';
import config from './config/index.js';
import logger from './utils/logger.js';
import healthRoutes from './routes/healthRoutes.js';
import analysisRoutes from './routes/analysisRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.debug(`${req.method} ${req.url}`);
  next();
});

// Register routes
app.use('/api', healthRoutes);
app.use('/api', analysisRoutes);

// Fallback for unhandled routes (404 Not Found)
app.use((req, res, next) => {
  const error = new Error(`API endpoint not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global error handler (must be defined last to catch all middleware errors)
app.use(errorHandler);

// Start the Express HTTP server
const server = app.listen(config.port, () => {
  logger.info(`Express server running in "${config.nodeEnv}" mode on port ${config.port}`);
});

// Graceful shutdown handling
const handleGracefulShutdown = (signal) => {
  logger.warn(`Received ${signal}. Starting graceful shutdown procedure...`);
  server.close(() => {
    logger.info('HTTP server closed. Exiting process.');
    process.exit(0);
  });

  // Force close after 10 seconds if graceful shutdown takes too long
  setTimeout(() => {
    logger.error('Graceful shutdown timed out. Forcing process exit.');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
