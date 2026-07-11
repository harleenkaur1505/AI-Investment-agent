import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();
import config from '../config/index.js';
import logger from '../utils/logger.js';
import { getMockCompanyData, getMockChartData } from '../utils/mockDataProvider.js';

// Fallback value shown to users when a data field is unavailable
const NA = 'Data Not Available';

const isMockKey = (key) => !key || key.includes('mock') || key.includes('your_');

const isMockMode = () => {
  return isMockKey(config.geminiApiKey);
};

/**
 * Formats a raw numeric value into a human-readable string with currency symbol.
 * Returns NA if the value is absent, zero, or non-numeric.
 * @param {any} value - Numeric value.
 * @param {string} [prefix=''] - Currency prefix.
 * @returns {string}
 */
const formatValue = (value, prefix = '') => {
  if (value === undefined || value === null || value === 'None' || value === 0 || value === '0') return NA;
  const num = parseFloat(value);
  if (isNaN(num)) return NA;

  if (num >= 1_000_000_000_000) {
    return `${prefix}${(num / 1_000_000_000_000).toFixed(2)} Trillion`;
  }
  if (num >= 1_000_000_000) {
    return `${prefix}${(num / 1_000_000_000).toFixed(2)} Billion`;
  }
  if (num >= 1_000_000) {
    return `${prefix}${(num / 1_000_000).toFixed(2)} Million`;
  }
  return `${prefix}${num.toFixed(2)}`;
};

/**
 * Formats a decimal number as a percentage string (e.g. 0.025 -> 2.50%).
 * @param {any} value - Decimal value.
 * @returns {string}
 */
const formatPercent = (value) => {
  if (value === undefined || value === null || value === 'None' || value === '') return NA;
  const num = parseFloat(value);
  if (isNaN(num)) return NA;
  return `${(num * 100).toFixed(2)}%`;
};

/**
 * Formats a number as currency (e.g. 150.25 -> $150.25).
 * @param {any} value - Numeric value.
 * @returns {string}
 */
const formatCurrency = (value) => {
  if (value === undefined || value === null || value === 'None' || value === '') return NA;
  const num = parseFloat(value);
  if (isNaN(num)) return NA;
  return `$${num.toFixed(2)}`;
};

const safe = (value) => (value === undefined || value === null || value === 'None' || value === '' ? NA : String(value));

/**
 * Resolves a company name or ticker query to the standard Yahoo Finance symbol.
 *
 * @param {string} query - Company name or symbol query.
 * @returns {Promise<{symbol: string, profile: Object} | null>} Resolved symbol and profile, or null if not found.
 */
export const resolveSymbolAndProfile = async (query) => {
  const cleanQuery = query.trim();

  if (isMockMode()) {
    const clean = query.toLowerCase().trim();
    let symbol = cleanQuery.toUpperCase();
    if (clean.includes('apple') || clean === 'aapl') return { symbol: 'AAPL', profile: null };
    else if (clean.includes('tesla') || clean === 'tsla') return { symbol: 'TSLA', profile: null };
    else if (clean.includes('microsoft') || clean === 'msft') return { symbol: 'MSFT', profile: null };
    return { symbol, profile: null };
  }

  try {
    logger.info(`Searching Yahoo Finance for query: "${cleanQuery}"`);
    const searchRes = await yahooFinance.search(cleanQuery);
    if (!searchRes || !searchRes.quotes || searchRes.quotes.length === 0) {
      logger.warn(`No search matches found on Yahoo Finance for: "${cleanQuery}"`);
      return null;
    }

    // Prioritize equity-type quotes
    const equityMatch = searchRes.quotes.find(q => q.symbol && q.quoteType === 'EQUITY');
    const bestMatch = equityMatch || searchRes.quotes.find(q => q.symbol);

    if (!bestMatch) {
      logger.warn(`No valid symbols extracted from search results for: "${cleanQuery}"`);
      return null;
    }

    logger.info(`Yahoo Finance search resolved "${cleanQuery}" to symbol: "${bestMatch.symbol}"`);
    return {
      symbol: bestMatch.symbol,
      profile: bestMatch
    };
  } catch (err) {
    logger.error(`Yahoo Finance search failed for query: "${cleanQuery}": ${err.message}`);
    return null;
  }
};

/**
 * Fetches company profile, quotes, key statistics, and historical prices for a symbol.
 * Normalizes results to match the visual frontend layout expectations.
 *
 * @param {string} symbol - Resolved ticker symbol.
 * @param {Object} [profile] - Resolved profile info.
 * @returns {Promise<{companyOverview: Object, financialSnapshot: Object, revenueTrend: Array, comparisonMetrics: Array}>}
 */
export const fetchCompanyAndChartData = async (symbol, profile) => {
  const cleanSymbol = symbol.toUpperCase().trim();

  if (isMockMode()) {
    logger.info(`[Yahoo Finance Service] Mock mode active. Returning simulated data for "${cleanSymbol}".`);
    const mockCompany = getMockCompanyData(cleanSymbol);
    const mockChart = getMockChartData(cleanSymbol);
    return {
      companyOverview: mockCompany.companyOverview,
      financialSnapshot: mockCompany.financialSnapshot,
      revenueTrend: mockChart.revenueTrend,
      comparisonMetrics: mockChart.comparisonMetrics,
    };
  }

  logger.info(`Executing Yahoo Finance data streams fetch for symbol: "${cleanSymbol}"`);

  const threeYearsAgo = new Date();
  threeYearsAgo.setFullYear(threeYearsAgo.getFullYear() - 3);

  const [summaryRes, historicalRes] = await Promise.all([
    yahooFinance.quoteSummary(cleanSymbol, {
      modules: ['price', 'summaryDetail', 'defaultKeyStatistics', 'assetProfile', 'financialData']
    }).catch(err => {
      logger.error(`Yahoo Finance quoteSummary failed for ${cleanSymbol}: ${err.message}`);
      return null;
    }),
    yahooFinance.historical(cleanSymbol, {
      period1: threeYearsAgo,
      period2: new Date(),
    }).catch(err => {
      logger.error(`Yahoo Finance historical failed for ${cleanSymbol}: ${err.message}`);
      return [];
    })
  ]);

  if (!summaryRes) {
    throw new Error(`Failed to retrieve quote summary for symbol: "${cleanSymbol}"`);
  }

  const { price = {}, summaryDetail = {}, defaultKeyStatistics = {}, assetProfile = {}, financialData = {} } = summaryRes;

  // 1. Normalize Company Overview
  const hqParts = [
    assetProfile.address1,
    assetProfile.city,
    assetProfile.state,
    assetProfile.zip,
    assetProfile.country
  ].filter(Boolean);
  const headquarters = hqParts.length > 0 ? hqParts.join(', ') : NA;

  const officers = assetProfile.companyOfficers || [];
  const ceoOfficer = officers.find(o => o.title && o.title.toLowerCase().includes('ceo'));
  const ceo = ceoOfficer ? ceoOfficer.name : NA;

  const companyOverview = {
    name: safe(price.longName || price.shortName || (profile && profile.longname) || (profile && profile.shortname)),
    symbol: cleanSymbol,
    industry: safe(assetProfile.industry),
    sector: safe(assetProfile.sector),
    ceo: safe(ceo),
    headquarters: safe(headquarters),
    description: safe(assetProfile.longBusinessSummary),
    website: safe(assetProfile.website),
    exchange: safe(price.exchangeName || price.exchange),
  };

  // 2. Normalize Financial Snapshot
  const financialSnapshot = {
    marketCap: formatValue(summaryDetail.marketCap || price.marketCap, '$'),
    revenue: formatValue(financialData.totalRevenue, '$'),
    revenueGrowth: formatPercent(financialData.revenueGrowth),
    eps: formatCurrency(defaultKeyStatistics.trailingEps || defaultKeyStatistics.forwardEps),
    peRatio: summaryDetail.trailingPE !== undefined && summaryDetail.trailingPE !== null
      ? parseFloat(summaryDetail.trailingPE).toFixed(2)
      : (summaryDetail.forwardPE !== undefined && summaryDetail.forwardPE !== null
        ? parseFloat(summaryDetail.forwardPE).toFixed(2)
        : NA),
    dividendYield: formatPercent(summaryDetail.dividendYield),
    fiftyTwoWeekHigh: formatCurrency(summaryDetail.fiftyTwoWeekHigh),
    fiftyTwoWeekLow: formatCurrency(summaryDetail.fiftyTwoWeekLow),
    beta: defaultKeyStatistics.beta !== undefined && defaultKeyStatistics.beta !== null
      ? parseFloat(defaultKeyStatistics.beta).toFixed(2)
      : NA,
    profitMargin: formatPercent(financialData.profitMargins),
    operatingMargin: formatPercent(financialData.operatingMargins),
    returnOnEquity: formatPercent(financialData.returnOnEquity),
  };

  // 3. Compile Historical Price Trend
  const latestCloseByYear = {};
  historicalRes.forEach((entry) => {
    if (entry.date && entry.close !== undefined && entry.close !== null) {
      const dateObj = entry.date instanceof Date ? entry.date : new Date(entry.date);
      if (isNaN(dateObj.getTime())) return;
      const year = dateObj.getFullYear().toString();

      if (!latestCloseByYear[year] || dateObj > latestCloseByYear[year].date) {
        latestCloseByYear[year] = {
          date: dateObj,
          close: parseFloat(entry.close)
        };
      }
    }
  });

  const revenueTrend = Object.entries(latestCloseByYear)
    .sort(([yearA], [yearB]) => parseInt(yearA) - parseInt(yearB))
    .slice(-3)
    .map(([year, data]) => ({
      year,
      price: parseFloat(data.close.toFixed(2)),
    }));

  return {
    companyOverview,
    financialSnapshot,
    revenueTrend,
    comparisonMetrics: [],
  };
};
