import axios from 'axios';

// Dynamically determine the backend base URL (uses localhost:5000 in dev unless overridden)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Triggers the company analysis request on the backend.
 * @param {string} companyName Ticker or name of the company.
 * @returns {Promise<Object>} The complete company and AI analysis payload.
 */
export const analyzeCompany = async (companyName) => {
  const response = await apiClient.post('/analyze', { companyName });
  return response.data;
};
