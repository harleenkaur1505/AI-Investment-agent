import { StructuredOutputParser } from '@langchain/core/output_parsers';
import { z } from 'zod';

/**
 * LangChain OutputParser Configuration.
 * 
 * Defines the structured output schema using Zod and exports the StructuredOutputParser.
 * This ensures Google Gemini returns a strictly conforming, machine-readable JSON structure
 * exactly matching the schema defined in the project specifications.
 */
export const analysisOutputParser = StructuredOutputParser.fromZodSchema(
  z.object({
    recommendation: z.object({
      decision: z.enum(['Invest', 'Pass']).describe('Investment recommendation, must be either Invest or Pass'),
      confidence: z.number().int().min(0).max(100).describe('Confidence score from 0 to 100 representing certainty of decision'),
      summary: z.string().describe('A concise 1-2 sentence summary of the recommendation'),
    }),
    swotAnalysis: z.object({
      strengths: z.array(z.string()).describe('List of 3 strengths'),
      weaknesses: z.array(z.string()).describe('List of 3 weaknesses'),
      opportunities: z.array(z.string()).describe('List of 3 opportunities'),
      threats: z.array(z.string()).describe('List of 3 threats'),
    }),
    riskAnalysis: z.object({
      financialRisk: z.string().describe('Detailed explanation of the financial risk'),
      marketRisk: z.string().describe('Detailed explanation of the market risk'),
      businessRisk: z.string().describe('Detailed explanation of the business/operational risk'),
    }),
    aiReasoning: z.union([
      z.object({
        reasoning: z.array(z.string()).describe('List of 3 distinct paragraphs of analysis supporting the recommendation'),
      }),
      z.array(z.string()).describe('List of 3 distinct paragraphs of analysis supporting the recommendation')
    ]).transform((val) => {
      if (Array.isArray(val)) {
        return { reasoning: val };
      }
      return val;
    }),
  })
);
