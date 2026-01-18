'use server';

/**
 * @fileOverview An AI-powered tool to analyze and score the readability and maintainability of code snippets.
 *
 * - analyzeCodeReadability - A function that handles the code readability analysis process.
 * - AnalyzeCodeReadabilityInput - The input type for the analyzeCodeReadability function.
 * - AnalyzeCodeReadabilityOutput - The return type for the analyzeCodeReadability function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeCodeReadabilityInputSchema = z.object({
  codeSnippet: z
    .string()
    .describe('The code snippet to be analyzed for readability and maintainability.'),
});
export type AnalyzeCodeReadabilityInput = z.infer<typeof AnalyzeCodeReadabilityInputSchema>;

const AnalyzeCodeReadabilityOutputSchema = z.object({
  readabilityScore: z
    .number()
    .describe('A numerical score representing the readability of the code (0-100).'),
  maintainabilityScore: z
    .number()
    .describe('A numerical score representing the maintainability of the code (0-100).'),
  suggestions: z
    .string()
    .describe('Suggestions for improving the readability and maintainability of the code.'),
});
export type AnalyzeCodeReadabilityOutput = z.infer<typeof AnalyzeCodeReadabilityOutputSchema>;

export async function analyzeCodeReadability(
  input: AnalyzeCodeReadabilityInput
): Promise<AnalyzeCodeReadabilityOutput> {
  return analyzeCodeReadabilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeCodeReadabilityPrompt',
  input: {schema: AnalyzeCodeReadabilityInputSchema},
  output: {schema: AnalyzeCodeReadabilityOutputSchema},
  prompt: `You are an AI code analysis tool that evaluates code snippets for readability and maintainability.

You will receive a code snippet as input. Analyze the code and provide:

1.  A readability score (0-100).
2.  A maintainability score (0-100).
3.  Suggestions for improving the code's readability and maintainability.

Code Snippet:
\`\`\`{{{codeSnippet}}}\`\`\`

Ensure that the scores and suggestions are aligned with code analysis best practices.
`,
});

const analyzeCodeReadabilityFlow = ai.defineFlow(
  {
    name: 'analyzeCodeReadabilityFlow',
    inputSchema: AnalyzeCodeReadabilityInputSchema,
    outputSchema: AnalyzeCodeReadabilityOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
