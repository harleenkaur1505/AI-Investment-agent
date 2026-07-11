import logger from './logger.js';

const DEFAULT_TIMEOUT_MS = 10000; // 10 seconds

/**
 * Generic HTTP client utility wrapping the native fetch API.
 * Provides timeout support, non-2xx error detection, and JSON parsing.
 * Used by all service files to make external API requests.
 *
 * @param {string} url - The full URL to request.
 * @param {Object} [options={}] - Optional fetch configuration (method, headers, etc.).
 * @returns {Promise<Object>} Parsed JSON response body.
 * @throws {Error} On timeout, non-2xx status, or network failure.
 */
const apiClient = async (url, options = {}) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    logger.debug(`API Request: ${options.method || 'GET'} ${url}`);

    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `External API returned status ${response.status} (${response.statusText}) for URL: ${url}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error(`Request timed out after ${DEFAULT_TIMEOUT_MS / 1000}s for URL: ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export default apiClient;
