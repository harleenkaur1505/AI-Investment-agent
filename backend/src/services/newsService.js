import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';

import config from '../config/index.js';
import apiClient from '../utils/apiClient.js';
import logger from '../utils/logger.js';
import { getMockNews } from '../utils/mockDataProvider.js';

// Fallback to ensure that GOOGLE_API_KEY environment variable is set
if (config.geminiApiKey && !process.env.GOOGLE_API_KEY) {
  process.env.GOOGLE_API_KEY = config.geminiApiKey;
}

const isMockKey = (key) => !key || key.includes('mock') || key.includes('your_');

const BASE_URL = 'https://newsapi.org/v2/everything';

// Fallback value shown to users when a data field is unavailable
const NA = 'Data Not Available';

const HEURISTIC_POSITIVE_KEYWORDS = [
  'earning', 'revenue', 'profit', 'quarterly', 'fiscal', 'results', 'financial',
  'stock', 'share', 'dividend', 'dividend yield', 'market cap', 'pe ratio', 'eps',
  'partnership', 'acquisition', 'merger', 'acquire', 'partner', 'investor', 'presentation',
  'ceo', 'management', 'regulatory', 'investigation', 'lawsuit', 'legal', 'sec',
  'upgrade', 'downgrade', 'analyst', 'strategy', 'expansion', 'ai initiatives',
  'product', 'launch', 'launching', 'announce', 'announces', 'announcement', 'unveil',
  'unveils', 'release', 'releases', 'leak', 'leaks', 'device', 'technology', 'hardware',
  'supply chain', 'manufacturing', 'business', 'outlook'
];

const HEURISTIC_NEGATIVE_KEYWORDS = [
  'celebrity', 'gossip', 'movie', 'tv show', 'drama', 'recap', 'episode',
  'music', 'album', 'concert', 'sports', 'football', 'basketball', 'soccer',
  'baseball', 'golf', 'tennis', 'game', 'fashion', 'discount', 'deal',
  'coupon', 'promo', 'recipe', 'cooking', 'food', 'kielbasa', 'bites',
  'travel', 'hotel', 'resort', 'vacation', 'clickbait', 'unrelated', 'utility',
  'doorbell', 'car', 'vehicle', 'appliances', 'tools', 'singer', 'songwriter',
  'musician', 'photographer', 'artist', 'designer'
];

/**
 * Heuristically scores a news article's relevance to investment research.
 * @param {Object} article 
 * @returns {number} Score from 0 to 100
 */
const calculateHeuristicScore = (article) => {
  const text = ` ${article.headline} ${article.summary} `.toLowerCase()
    .replace(/[^a-z0-9]/g, ' '); // Clean punctuation to make word matching cleaner

  // 1. Check for negative keywords. If any are present, set score to 0 (rejected).
  for (const neg of HEURISTIC_NEGATIVE_KEYWORDS) {
    if (text.includes(neg)) {
      return 0;
    }
  }

  // Base score is 10 (irrelevant by default)
  let score = 10;

  // 2. Check positive keywords. Add 20 points for each match.
  for (const pos of HEURISTIC_POSITIVE_KEYWORDS) {
    if (text.includes(pos)) {
      score += 20;
    }
  }

  // If it matched at least one positive keyword, it will get 10 + 20 = 30 (passes).
  return Math.min(score, 100);
};

/**
 * Formats a raw ISO date string into a readable YYYY-MM-DD date.
 * Returns NA if the date is absent or invalid.
 * @param {string} dateString - ISO 8601 date string from NewsAPI.
 * @returns {string}
 */
const formatDate = (dateString) => {
  if (!dateString) return NA;
  try {
    return new Date(dateString).toISOString().slice(0, 10);
  } catch {
    return NA;
  }
};

/**
 * Returns the value or NA if absent, null, or '[Removed]' (NewsAPI placeholder).
 * @param {string} value
 * @returns {string}
 */
const safe = (value) => {
  if (!value || value === '[Removed]') return NA;
  return value.trim() || NA;
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Zod structured output parser for relevance scoring
const newsRelevanceParser = StructuredOutputParser.fromZodSchema(
  z.object({
    scores: z.array(
      z.object({
        index: z.number().int().describe('The 0-indexed index of the article in the input list'),
        score: z.number().int().min(0).max(100).describe('Relevance score from 0 to 100, where 100 is highly relevant to investment, and 0 is completely irrelevant'),
        reason: z.string().describe('A brief explanation of why the article got this score'),
      })
    ).describe('List of relevance scores for the articles'),
  })
);

// Prompt template for news relevance evaluation
const newsRelevancePrompt = new PromptTemplate({
  template: `You are an expert financial analyst scoring news articles for investment relevance for the company "{companyName}".
Each article must be evaluated for how useful and relevant it is for an investor analyzing this company's business performance, strategy, or stock value.

Format Instructions:
{format_instructions}

Scoring Guidelines:
- 90-100 (Highest Priority): Earnings reports, quarterly/annual financial results, revenue, profit margins, stock movement, major corporate structural announcements.
- 70-85 (High Priority): Major product launches, business partnerships, acquisitions, mergers, CEO statements, or major management changes.
- 50-65 (Moderate Priority): General industry trends, supply chain developments, regulatory investigations, government actions, or legal lawsuits.
- 30-45 (Low Priority): General company news with minor business impact.
- 0-20 (Irrelevant - Reject): Stories primarily about celebrities, entertainment, movies, TV shows, gossip, sports, music, unrelated social media trends, consumer product discounts, or clickbait, unless there is a direct and measurable business impact on the company.

Articles to evaluate:
{articlesList}

Provide a relevance score for every single article listed above.`,
  inputVariables: ['companyName', 'articlesList'],
  partialVariables: {
    format_instructions: () => newsRelevanceParser.getFormatInstructions(),
  },
});

/**
 * Fetches the latest company news articles from NewsAPI, filters them with Gemini, and ranks them by investment relevance.
 *
 * @param {string} companyName - The company name to search news for.
 * @returns {Promise<Array>} Array of normalized news article objects (max 5).
 * @throws {Error} If the API key is missing or NewsAPI returns an error status.
 */
const fetchLatestNews = async (companyName) => {
  if (isMockKey(config.newsApiKey)) {
    logger.info(`[News Service] Mock API key detected. Returning simulated news for "${companyName}".`);
    return getMockNews(companyName);
  }

  if (!config.newsApiKey) {
    throw new Error('NewsAPI key is not configured. Add NEWS_API_KEY to your .env file.');
  }

  // Fetch up to 20 articles from NewsAPI to filter them down using Gemini
  const params = new URLSearchParams({
    q: `"${companyName}"`,
    sortBy: 'publishedAt',
    pageSize: '20',
    language: 'en',
    apiKey: config.newsApiKey,
  });

  const url = `${BASE_URL}?${params.toString()}`;

  logger.info(`Fetching latest news for: "${companyName}" from NewsAPI.`);

  // Retry logic for transient network failures during news fetch
  let raw;
  const retries = 2;
  const delayMs = 200;
  for (let i = 0; i <= retries; i++) {
    try {
      raw = await apiClient(url);
      break;
    } catch (err) {
      if (i === retries) throw err;
      logger.warn(`NewsAPI fetch failed (Attempt ${i + 1}/${retries + 1}), retrying in ${delayMs}ms: ${err.message}`);
      await wait(delayMs);
    }
  }

  // NewsAPI returns a status field — check for errors
  if (!raw || raw.status !== 'ok') {
    throw new Error(`NewsAPI error: ${raw?.message || 'Unknown error from NewsAPI.'}`);
  }

  const articles = raw.articles || [];

  if (articles.length === 0) {
    logger.warn(`No news articles found for: "${companyName}". Returning empty news array.`);
    return [];
  }

  // Normalize each article into the expected shape
  const normalizedArticles = articles.map((article) => ({
    headline: safe(article.title),
    source: article.source?.name ? safe(article.source.name) : NA,
    publishedDate: formatDate(article.publishedAt),
    summary: safe(article.description),
    url: safe(article.url),
  }));

  // Perform AI-assisted relevance filtering
  try {
    if (isMockKey(config.geminiApiKey)) {
      logger.info(`[News Service] Mock Gemini API key detected. Skipping AI relevance filtering, returning heuristically filtered news.`);
      
      const scoredArticles = normalizedArticles.map((article) => ({
        ...article,
        relevanceScore: calculateHeuristicScore(article),
      }));
      const relevantArticles = scoredArticles.filter((article) => article.relevanceScore >= 30);
      relevantArticles.sort((a, b) => b.relevanceScore - a.relevanceScore);
      return relevantArticles.slice(0, 5);
    }

    logger.info(`Filtering and scoring ${normalizedArticles.length} articles using Gemini for "${companyName}"...`);

    const articlesListStr = normalizedArticles.map((article, idx) => 
      `Index ${idx}:\nHeadline: ${article.headline}\nSource: ${article.source}\nDate: ${article.publishedDate}\nSummary: ${article.summary}`
    ).join('\n\n');

    const model = new ChatGoogleGenerativeAI({
      apiKey: config.geminiApiKey,
      model: 'gemini-flash-latest',
      modelName: 'gemini-flash-latest',
      temperature: 0.1,
    });

    const promptInput = await newsRelevancePrompt.format({
      companyName,
      articlesList: articlesListStr,
    });

    // 8 seconds timeout for news relevance check
    const relevanceTimeoutMs = 8000;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('News relevance scoring request timed out.')), relevanceTimeoutMs)
    );

    const modelResponse = await Promise.race([
      model.invoke(promptInput),
      timeoutPromise
    ]);

    const parsedResponse = await newsRelevanceParser.parse(modelResponse.content);
    const scores = parsedResponse.scores || [];

    // Map scores to articles
    const scoredArticles = normalizedArticles.map((article, idx) => {
      const scoreObj = scores.find((s) => s.index === idx);
      return {
        ...article,
        relevanceScore: scoreObj ? scoreObj.score : 0,
      };
    });

    // Filter: keep only articles with relevanceScore >= 30
    const relevantArticles = scoredArticles.filter((article) => article.relevanceScore >= 30);
    
    // Sort descending by score
    relevantArticles.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Keep top 5
    const finalNews = relevantArticles.slice(0, 5);

    logger.info(`AI-assisted filtering kept ${finalNews.length}/${normalizedArticles.length} relevant news articles for "${companyName}".`);
    return finalNews;
  } catch (error) {
    logger.warn(`AI-assisted news relevance filtering failed (${error.message}). Falling back to heuristic rule-based filter.`);
    
    // Heuristically score and filter the raw fetched articles
    const scoredArticles = normalizedArticles.map((article) => ({
      ...article,
      relevanceScore: calculateHeuristicScore(article),
    }));

    // Filter: keep only articles with relevanceScore >= 30
    const relevantArticles = scoredArticles.filter((article) => article.relevanceScore >= 30);
    
    // Sort descending by score
    relevantArticles.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Keep top 5
    const finalNews = relevantArticles.slice(0, 5);

    logger.info(`Heuristic fallback filtering kept ${finalNews.length}/${normalizedArticles.length} relevant news articles for "${companyName}".`);
    return finalNews;
  }
};

export default fetchLatestNews;
