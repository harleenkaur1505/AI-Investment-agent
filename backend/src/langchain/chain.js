import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { RunnableSequence } from '@langchain/core/runnables';
import { companyAnalysisPrompt } from './promptTemplate.js';
import { analysisOutputParser } from './outputParser.js';
import config from '../config/index.js';

// Fallback to ensure that GOOGLE_API_KEY environment variable is set
if (config.geminiApiKey && !process.env.GOOGLE_API_KEY) {
  process.env.GOOGLE_API_KEY = config.geminiApiKey;
}

// Configure the Google Gemini model
const model = new ChatGoogleGenerativeAI({
  apiKey: config.geminiApiKey,
  model: 'gemini-flash-latest',
  modelName: 'gemini-flash-latest',
  temperature: 0.2,
});

// Construct the runnable sequence chain
export const analysisChain = RunnableSequence.from([
  {
    companyName: (input) => input.companyName,
    industry: (input) => input.industry,
    sector: (input) => input.sector,
    description: (input) => input.description,
    marketCap: (input) => input.marketCap,
    revenue: (input) => input.revenue,
    revenueGrowth: (input) => input.revenueGrowth,
    eps: (input) => input.eps,
    peRatio: (input) => input.peRatio,
    profitMargin: (input) => input.profitMargin,
    operatingMargin: (input) => input.operatingMargin,
    returnOnEquity: (input) => input.returnOnEquity,
    newsArticles: (input) => input.newsArticles,
    format_instructions: () => analysisOutputParser.getFormatInstructions(),
  },
  companyAnalysisPrompt,
  model,
  analysisOutputParser,
]);
