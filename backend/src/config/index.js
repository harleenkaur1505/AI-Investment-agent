import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  geminiApiKey: process.env.GEMINI_API_KEY,
  newsApiKey: process.env.NEWS_API_KEY,
  geminiTimeoutMs: parseInt(process.env.GEMINI_TIMEOUT_MS || '20000', 10),
};

// List of required environment variables for the full application
const requiredEnvVars = [
  'GEMINI_API_KEY',
  'NEWS_API_KEY',
];

const missingEnvVars = requiredEnvVars.filter(key => !process.env[key]);

if (missingEnvVars.length > 0) {
  console.warn(
    `[Config Warning] The following environment variables are missing: ${missingEnvVars.join(', ')}. ` +
    'Some API integrations may not function correctly until these are set.'
  );
}

export default config;
