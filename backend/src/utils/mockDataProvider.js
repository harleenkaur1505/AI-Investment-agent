import logger from './logger.js';

// Standard mock data for specific companies
const mockCompanies = {
  AAPL: {
    companyOverview: {
      name: 'Apple Inc.',
      symbol: 'AAPL',
      industry: 'Electronic Computers',
      sector: 'Technology',
      ceo: 'Timothy Donald Cook',
      headquarters: 'One Apple Park Way, Cupertino, CA 95014',
      description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company also sells various related services. It operates through Americas, Europe, Greater China, Japan, and Rest of Asia Pacific segments.',
      website: 'https://www.apple.com',
      exchange: 'NASDAQ',
      country: 'USA',
      employees: '164000',
      fiscalYearEnd: 'September'
    },
    financialSnapshot: {
      marketCap: '$3.35 Trillion',
      revenue: '$385.70 Billion',
      revenueGrowth: '2.50%',
      eps: '$6.13',
      peRatio: '31.20',
      dividendYield: '0.55%',
      fiftyTwoWeekHigh: '$237.49',
      fiftyTwoWeekLow: '$164.08',
      beta: '1.28',
      profitMargin: '25.80%',
      operatingMargin: '30.12%',
      returnOnEquity: '154.20%'
    },
    revenueTrend: [
      { year: '2023', price: 175.50 },
      { year: '2024', price: 189.20 },
      { year: '2025', price: 215.80 }
    ],
    latestNews: [
      {
        headline: 'Apple Unveils New AI Features For Next-Gen iPhone Lineup',
        source: 'TechCrunch',
        publishedDate: '2026-07-05',
        summary: 'Apple hosted its developer event showcasing advanced on-device intelligence capabilities integrated directly into its hardware and operating system layers, signaling a massive push into user-centric AI services.',
        url: 'https://techcrunch.com/apple-ai'
      },
      {
        headline: 'App Store Ecosystem Generated Record Billions In Transactions Last Year',
        source: 'Wall Street Journal',
        publishedDate: '2026-07-03',
        summary: 'An independent study shows that the App Store ecosystem continues to act as a massive economic engine, scaling global developer billings and sales while maintaining high security.',
        url: 'https://wsj.com/apple-app-store'
      },
      {
        headline: 'Apple Supply Chain Shifts Focus Towards Sourcing From India and Vietnam',
        source: 'Bloomberg',
        publishedDate: '2026-06-29',
        summary: 'Apple is rapidly expanding its production footprints outside traditional assembly bases, scaling manufacturing facilities in Vietnam and India to diversify geopolitical risk exposure.',
        url: 'https://bloomberg.com/apple-supply'
      }
    ],
    aiAnalysis: {
      recommendation: {
        decision: 'Invest',
        confidence: 88,
        summary: 'Apple remains an exceptional investment because of its massive software services ecosystem, high brand loyalty, and aggressive integration of user-focused AI features.'
      },
      swotAnalysis: {
        strengths: [
          'High customer retention rate and unrivaled premium brand positioning.',
          'Robust Services division (iCloud, Apple Music, App Store) generating high-margin recurring cash flows.',
          'Exceptional balance sheet strength with immense capital return programs (buybacks/dividends).'
        ],
        weaknesses: [
          'Heavy reliance on iPhone sales which represent a major portion of total revenue.',
          'Increasing antitrust scrutiny and legal challenges globally regarding App Store fees.',
          'Higher premium valuation multiple (P/E ~31) compared to historical long-term averages.'
        ],
        opportunities: [
          'Monetizing native AI features through premium subscriptions and device refresh cycles.',
          'Expanding digital health and wearable technology sectors with advanced sensors.',
          'Scaling market share in emerging regions like India where premium segment penetration is low.'
        ],
        threats: [
          'Geopolitical tensions affecting supply chain logistics in Asia.',
          'Intense competition in the consumer electronic and AI spaces from competitors like Samsung and Google.',
          'Economic slowdowns restricting luxury and premium discretionary tech spend.'
        ]
      },
      riskAnalysis: {
        financialRisk: 'Relatively low operational financial risk, although revenue growth has cooled. Debt levels are minimal compared to liquid assets.',
        marketRisk: 'Susceptible to hardware demand cycles and global supply chain logistics constraints.',
        businessRisk: 'Legal and regulatory pressure from EU/US antitrust laws targeting ecosystem locking mechanisms.'
      },
      aiReasoning: {
        reasoning: [
          'Apple Inc. represents a highly defensive core tech holding. The company continues to sustain industry-leading operating margins (30.12%) and generates unmatched free cash flows.',
          'The newly announced on-device AI suite provides a catalyst for an upcoming iPhone upgrade cycle, which should accelerate near-term hardware revenue growth.',
          'With a Return on Equity exceeding 150%, Apple proves highly efficient in using capital. While the valuation is slightly elevated at 31.2x P/E, its resilient moat justifies the premium.'
        ]
      }
    }
  },
  MSFT: {
    companyOverview: {
      name: 'Microsoft Corporation',
      symbol: 'MSFT',
      industry: 'Services-Prepackaged Software',
      sector: 'Technology',
      ceo: 'Satya Nadella',
      headquarters: 'One Microsoft Way, Redmond, WA 98052',
      description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. Its Productivity and Business Processes segment includes Office, Exchange, SharePoint, Microsoft Teams, Microsoft 365 Security and Compliance, and Skype.',
      website: 'https://www.microsoft.com',
      exchange: 'NASDAQ',
      country: 'USA',
      employees: '221000',
      fiscalYearEnd: 'June'
    },
    financialSnapshot: {
      marketCap: '$3.15 Trillion',
      revenue: '$245.10 Billion',
      revenueGrowth: '14.20%',
      eps: '$11.80',
      peRatio: '34.80',
      dividendYield: '0.72%',
      fiftyTwoWeekHigh: '$468.35',
      fiftyTwoWeekLow: '$380.20',
      beta: '1.15',
      profitMargin: '36.20%',
      operatingMargin: '43.10%',
      returnOnEquity: '38.50%'
    },
    revenueTrend: [
      { year: '2023', price: 340.50 },
      { year: '2024', price: 415.80 },
      { year: '2025', price: 442.20 }
    ],
    latestNews: [
      {
        headline: 'Microsoft Azure Claims Top Spot In Enterprise AI Cloud Spend',
        source: 'Forbes',
        publishedDate: '2026-07-06',
        summary: 'Recent market surveys indicate Microsoft Cloud Azure has captured a major share of new enterprise AI workloads, boosted by its partnerships with industry-leading LLM providers.',
        url: 'https://forbes.com/microsoft-azure-ai'
      },
      {
        headline: 'Copilot Productivity Features Now Integrated Across Global Enterprise Clients',
        source: 'Reuters',
        publishedDate: '2026-07-01',
        summary: 'Microsoft reports positive early feedback on Copilot integration across enterprise packages, validating Satya Nadella\'s strategic focus on AI-assisted workflow productivity tools.',
        url: 'https://reuters.com/microsoft-copilot'
      }
    ],
    aiAnalysis: {
      recommendation: {
        decision: 'Invest',
        confidence: 92,
        summary: 'Microsoft represents a top-tier buy opportunity due to its leadership in enterprise cloud computing, strategic AI infrastructure integration, and superb profitability.'
      },
      swotAnalysis: {
        strengths: [
          'Dominant footprint in enterprise workspace software and operating systems.',
          'Early-mover advantage in commercial generative AI infrastructure and developer tools.',
          'Unrivaled operational efficiency with operating margins exceeding 43%.'
        ],
        weaknesses: [
          'Increasing hardware licensing dependency slowdown in traditional PC categories.',
          'Integration risks from large-scale acquisitions (e.g. Activision Blizzard).',
          'Elevated growth expectations baked into high price-to-earnings multiple.'
        ],
        opportunities: [
          'Further expansion of Azure Cloud margins as AI model deployment scale increases.',
          'Additional monetization of Copilot services across enterprise office portfolios.',
          'Growth of gaming and virtual workspaces following recent console and content acquisitions.'
        ],
        threats: [
          'Fierce public cloud competition from Amazon Web Services (AWS) and Google Cloud.',
          'Global regulatory pushback on acquisitions and software ecosystem bundlings.',
          'Cybersecurity incidents and complex system vulnerabilities targeting enterprise clients.'
        ]
      },
      riskAnalysis: {
        financialRisk: 'Negligible. Highly liquid with massive operating cash flow supporting both R&D and dividend distributions.',
        marketRisk: 'Moderate valuation risk if AI monetization growth curves experience a slowdown.',
        businessRisk: 'Security audit concerns and potential vendor lock-in resistance from major enterprise buyers.'
      },
      aiReasoning: {
        reasoning: [
          'Microsoft Corporation remains the gold standard for enterprise software. The cloud division (Azure) is driving double-digit revenue growth (14.20% YoY), reflecting highly resilient institutional demand.',
          'By embedding generative AI across its suite (Office, Windows, GitHub), Microsoft has created concrete, high-margin software upsells, ahead of most competitors in the SaaS sector.',
          'An operating margin of 43.10% and return on equity of 38.50% showcase premier operational excellence. Despite a P/E of 34.8, MSFT offers unmatched downside protection and secular growth upside.'
        ]
      }
    }
  }
};

// Generates dynamic mock data if the user queries a ticker not in the static catalog
const generateDynamicMock = (symbol) => {
  const cleanSymbol = symbol.toUpperCase().trim();
  
  // Format basic values
  const name = `${cleanSymbol.charAt(0) + cleanSymbol.slice(1).toLowerCase()} Global Corp`;
  const sector = 'Industrial Technology';
  const industry = 'Engineering & Digital Solutions';
  const ceo = 'Sarah Jenkins';
  const description = `${name} is a hypothetical global enterprise specializing in ${industry} and supply chain automation services. This is simulated mock data returned because the workspace is configured with mock API keys.`;

  return {
    companyOverview: {
      name,
      symbol: cleanSymbol,
      industry,
      sector,
      ceo,
      headquarters: '100 Innovation Way, Boston, MA 02110',
      description,
      website: `https://www.${cleanSymbol.toLowerCase()}-global.com`,
      exchange: 'NYSE',
      country: 'USA',
      employees: '45000',
      fiscalYearEnd: 'December'
    },
    financialSnapshot: {
      marketCap: '$45.20 Billion',
      revenue: '$12.80 Billion',
      revenueGrowth: '8.40%',
      eps: '$3.45',
      peRatio: '18.50',
      dividendYield: '1.80%',
      fiftyTwoWeekHigh: '$75.00',
      fiftyTwoWeekLow: '$52.20',
      beta: '1.05',
      profitMargin: '12.10%',
      operatingMargin: '15.40%',
      returnOnEquity: '16.80%'
    },
    revenueTrend: [
      { year: '2023', price: 58.20 },
      { year: '2024', price: 62.50 },
      { year: '2025', price: 71.10 }
    ],
    latestNews: [
      {
        headline: `${cleanSymbol} Global Reports Stable Quarterly Performance and EPS Beat`,
        source: 'Financial Times',
        publishedDate: '2026-07-04',
        summary: `${name} announced fiscal third-quarter results exceeding analyst expectations, led by automation contract expansions and strict operational overhead management.`,
        url: `https://ft.com/${cleanSymbol.toLowerCase()}-earnings`
      },
      {
        headline: `Strategic Cost Optimization Plans Set To Boost ${cleanSymbol} Margins By Next Year`,
        source: 'MarketWatch',
        publishedDate: '2026-06-28',
        summary: `Analysts react positively to the management\'s cost savings program, expecting operational efficiency gains to reflect in margins by late fiscal 2026.`,
        url: `https://marketwatch.com/${cleanSymbol.toLowerCase()}-margins`
      }
    ],
    aiAnalysis: {
      recommendation: {
        decision: 'Invest',
        confidence: 72,
        summary: `Based on a simulated study, ${name} offers a reasonable investment value, supported by attractive PE ratios and stable organic growth.`
      },
      swotAnalysis: {
        strengths: [
          'Steady revenue growth (8.40% YoY) and solid operating margins.',
          'Diversified customer base reducing single-industry downturn exposure.',
          'Reasonable debt-to-equity ratio offering balanced balance sheet safety.'
        ],
        weaknesses: [
          'Moderate vulnerability to macroeconomic manufacturing slow-downs.',
          'Lower research and development expenditure relative to high-growth tech peers.',
          'Geographic operational fragmentation leading to logistics overheads.'
        ],
        opportunities: [
          'Expanding automation software integrations to upscale high-margin segments.',
          'Growth through regional service acquisitions in European and Asian markets.',
          'Enhancing digital analytics services to build multi-year software retainer streams.'
        ],
        threats: [
          'Increasing competition from consolidated global engineering firms.',
          'Currency headwinds due to extensive overseas manufacturing facilities.',
          'Potential supply chain bottlenecks slowing equipment rollouts.'
        ]
      },
      riskAnalysis: {
        financialRisk: 'Low-to-moderate. Stable earnings generation covers debt service obligations comfortably.',
        marketRisk: 'Sensitive to capital expenditure budgets of industrial customers and general interest rate adjustments.',
        businessRisk: 'Operational execution risks in adapting services to cutting-edge cloud software layers.'
      },
      aiReasoning: {
        reasoning: [
          `${name} represents a stable mid-cap option within the industrial technology sector. An attractive P/E of 18.5 makes it value-friendly compared to broader market multiples.`,
          'The steady revenue growth profile (8.40%) paired with a secure dividend yield of 1.80% suggests reliable, defensive performance in varying market conditions.',
          'We evaluate the recommendation at "Invest" with 72% confidence, acknowledging that while it lacks high-octane growth drivers, its structural fundamentals are sound.'
        ]
      }
    }
  };
};

/**
 * Returns mock company overview and snapshot data.
 */
export const getMockCompanyData = (symbol) => {
  const cleanSymbol = symbol.toUpperCase().trim();
  logger.info(`[Mock Provider] Generating company data for: "${cleanSymbol}"`);

  if (cleanSymbol === 'FAIL' || cleanSymbol === 'ERROR') {
    throw new Error('Yahoo Finance API is rate limited. Please wait 1 minute.');
  }

  // Check static catalog first
  if (mockCompanies[cleanSymbol]) {
    const { companyOverview, financialSnapshot } = mockCompanies[cleanSymbol];
    return { companyOverview, financialSnapshot };
  }

  // Match common synonyms in lower-case
  const queryLower = cleanSymbol.toLowerCase();
  if (queryLower === 'apple' || queryLower.includes('apple inc')) {
    return {
      companyOverview: mockCompanies.AAPL.companyOverview,
      financialSnapshot: mockCompanies.AAPL.financialSnapshot,
    };
  }
  if (queryLower === 'microsoft' || queryLower.includes('microsoft corp')) {
    return {
      companyOverview: mockCompanies.MSFT.companyOverview,
      financialSnapshot: mockCompanies.MSFT.financialSnapshot,
    };
  }

  // In mock mode, if a company is searched that is NOT in the valid catalog,
  // we consider it non-existent and throw a "not found" error to match real API behavior.
  throw new Error(`Company with symbol "${symbol}" was not found on Yahoo Finance.`);
};

/**
 * Returns mock monthly adjusted stock pricing for chart trends.
 */
export const getMockChartData = (symbol) => {
  const cleanSymbol = symbol.toUpperCase().trim();
  logger.info(`[Mock Provider] Generating chart data for: "${cleanSymbol}"`);
  
  if (mockCompanies[cleanSymbol]) {
    return {
      revenueTrend: mockCompanies[cleanSymbol].revenueTrend,
      comparisonMetrics: []
    };
  }
  
  const generated = generateDynamicMock(cleanSymbol);
  return {
    revenueTrend: generated.revenueTrend,
    comparisonMetrics: []
  };
};

/**
 * Returns mock news articles.
 */
export const getMockNews = (companyName) => {
  const name = companyName.toUpperCase().trim();
  logger.info(`[Mock Provider] Generating news data for: "${companyName}"`);
  
  for (const ticker of Object.keys(mockCompanies)) {
    if (name.includes(ticker) || mockCompanies[ticker].companyOverview.name.toUpperCase().includes(name)) {
      return mockCompanies[ticker].latestNews;
    }
  }
  
  const generated = generateDynamicMock(companyName);
  return generated.latestNews;
};

/**
 * Returns mock investment recommendation and AI SWOT/risks.
 */
export const getMockAIResponse = (companyName, companyOverview, financialSnapshot) => {
  const name = companyName.toUpperCase().trim();
  logger.info(`[Mock Provider] Generating simulated AI analysis for: "${companyName}"`);

  if (name.includes('GEMINI_FAIL') || name.includes('LLM_ERROR')) {
    throw new Error('Google Gemini API returned a 503 Service Unavailable error.');
  }
  
  for (const ticker of Object.keys(mockCompanies)) {
    if (name.includes(ticker) || mockCompanies[ticker].companyOverview.name.toUpperCase().includes(name)) {
      return mockCompanies[ticker].aiAnalysis;
    }
  }
  
  const generated = generateDynamicMock(companyName);
  return generated.aiAnalysis;
};
