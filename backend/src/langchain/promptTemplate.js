import { PromptTemplate } from '@langchain/core/prompts';

/**
 * LangChain PromptTemplate Configuration.
 * 
 * Defines the prompt structure for combining company information, financial snapshot metrics,
 * and latest news into a structured query for Gemini, along with format instructions.
 */
const template = `You are a professional financial analyst.
Analyze the company "{companyName}" and provide an investment recommendation ("Invest" or "Pass"), confidence score, SWOT, risks, and reasoning.

Factual Company Data:
- Name: {companyName}
- Industry: {industry}
- Sector: {sector}
- Description: {description}

Financial Snapshot:
- Market Capitalization: {marketCap}
- Revenue (TTM): {revenue}
- Revenue Growth (YoY): {revenueGrowth}
- EPS: {eps}
- P/E Ratio: {peRatio}
- Profit Margin: {profitMargin}
- Operating Margin: {operatingMargin}
- ROE: {returnOnEquity}

Recent News:
{newsArticles}

Instructions:
1. Recommendation: "Invest" or "Pass".
2. Confidence Score: 0 to 100 based on data.
3. SWOT: Exactly 3 concise bullet points per category.
4. Risk Analysis: Identify Financial, Market, and Business risks.
5. Reasoning: Exactly 3 concise, analytical paragraphs.
6. Base all reasoning strictly on the provided factual data and news. Do not invent facts or numbers.

{format_instructions}

Return ONLY the raw JSON matching the schema.`;

export const companyAnalysisPrompt = new PromptTemplate({
  template,
  inputVariables: [
    'companyName', 'industry', 'sector', 'description',
    'marketCap', 'revenue', 'revenueGrowth', 'eps', 'peRatio',
    'profitMargin', 'operatingMargin', 'returnOnEquity', 'newsArticles'
  ],
  partialVariables: {
    format_instructions: '' // Will be populated by output parser
  }
});
