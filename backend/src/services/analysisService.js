import logger from '../utils/logger.js';
import { resolveSymbolAndProfile, fetchCompanyAndChartData } from './yahooFinanceService.js';
import fetchLatestNews from './newsService.js';
import { analysisChain } from '../langchain/chain.js';
import config from '../config/index.js';
import { getMockAIResponse } from '../utils/mockDataProvider.js';

const isMockKey = (key) => !key || key.includes('mock') || key.includes('your_');

/**
 * Orchestrates the optimized company analysis workflow.
 * Leverages parallel fetches and payload reductions to maximize speed.
 */
class AnalysisService {
  /**
   * Runs the full analysis for a given company name or symbol.
   *
   * @param {string} companyName - The company name or ticker submitted by the user.
   * @returns {Promise<Object>} Structured analysis payload.
   */
  async analyzeCompany(companyName) {
    logger.info(`Starting performance-optimized analysis for: "${companyName}"`);

    // 1. Resolve ticker symbol and cache profile early
    let resolution;
    try {
      resolution = await resolveSymbolAndProfile(companyName);
      if (!resolution) {
        logger.warn(`Company symbol/profile not found for query: "${companyName}"`);
        return {
          success: false,
          message: "Company not found. Please enter a valid publicly listed company."
        };
      }
    } catch (error) {
      logger.error(`Early symbol resolution failed for query "${companyName}": ${error.message}`);
      throw error;
    }

    const { symbol, profile } = resolution;

    // 2. Concurrently fetch all financials (including charts) and news
    const [financials, latestNews] = await Promise.all([
      fetchCompanyAndChartData(symbol, profile),
      fetchLatestNews(companyName).catch((err) => {
        logger.error(`News fetch failed, proceeding with empty news: ${err.message}`);
        return [];
      })
    ]);

    const { companyOverview, financialSnapshot, revenueTrend, comparisonMetrics } = financials;

    logger.info(`Yahoo Finance financials and news streams retrieved in parallel for: "${symbol}"`);

    let aiResult;
    if (isMockKey(config.geminiApiKey)) {
      logger.info(`[Analysis Service] Mock Gemini API key detected. Generating simulated AI response.`);
      aiResult = getMockAIResponse(companyName, companyOverview, financialSnapshot);
    } else {
      try {
        // Payload Reduction 1: Limit news to exactly 3 recent articles
        const limitedNews = latestNews ? latestNews.slice(0, 3) : [];
        const newsArticlesStr = limitedNews.length > 0
          ? limitedNews.map((article, idx) => 
              `Article ${idx + 1}:\nHeadline: ${article.headline}\nSource: ${article.source}\nDate: ${article.publishedDate}\nSummary: ${article.summary}`
            ).join('\n\n')
          : 'No recent news articles found for this company.';

        // Payload Reduction 2: Limit description to first 3 sentences to save token size
        const limitSentences = (text, limit = 3) => {
          if (!text) return '';
          const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text];
          return sentences.slice(0, limit).join('').trim();
        };

        const shortDescription = limitSentences(companyOverview.description, 2);

        const aiInput = {
          companyName: companyOverview.name || companyName,
          industry: companyOverview.industry,
          sector: companyOverview.sector,
          description: shortDescription,
          marketCap: financialSnapshot.marketCap,
          revenue: financialSnapshot.revenue,
          revenueGrowth: financialSnapshot.revenueGrowth,
          eps: financialSnapshot.eps,
          peRatio: financialSnapshot.peRatio,
          profitMargin: financialSnapshot.profitMargin,
          operatingMargin: financialSnapshot.operatingMargin,
          returnOnEquity: financialSnapshot.returnOnEquity,
          newsArticles: newsArticlesStr,
        };

        logger.info(`Invoking Gemini with timeout race: ${config.geminiTimeoutMs}ms`);

        // Timeout promise wrapping
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('AI analysis request timed out.')), config.geminiTimeoutMs)
        );

        aiResult = await Promise.race([
          analysisChain.invoke(aiInput),
          timeoutPromise
        ]);
      } catch (error) {
        logger.error(`AI analysis call failed: ${error.message}`, error);
        
        if (error.message.includes('timed out')) {
          return {
            success: false,
            message: "AI analysis timed out. Please try again."
          };
        }

        const isQuotaOrRateLimit = error.message.includes('429') || 
                                   error.message.toLowerCase().includes('quota') || 
                                   error.message.toLowerCase().includes('rate limit');
        
        if (isQuotaOrRateLimit) {
          logger.warn(`Gemini API Quota Exceeded/Rate Limited (429). Falling back to mock AI analysis response to prevent downtime.`);
          aiResult = getMockAIResponse(companyOverview.name || companyName, companyOverview, financialSnapshot);
        } else {
          throw new Error(`AI analysis failed: ${error.message || 'Unknown error occurred during AI analysis.'}`);
        }
      }
    }

    // Return structured JSON response matching visual guidelines
    return {
      success: true,
      recommendation: aiResult.recommendation,
      swotAnalysis: aiResult.swotAnalysis,
      riskAnalysis: aiResult.riskAnalysis,
      aiReasoning: aiResult.aiReasoning,

      companyOverview,
      financialSnapshot,
      financialCharts: {
        revenueTrend,
        comparisonMetrics,
      },
      latestNews,
    };
  }
}

export default new AnalysisService();
