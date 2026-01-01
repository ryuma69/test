'use server';

/**
 * @fileOverview Generates a detailed report explaining the suitability and future worth of a career stream.
 *
 * - generateDetailedReport - A function that generates the detailed report.
 * - DetailedReportInput - The input type for the generateDetailedReport function.
 * - DetailedReportOutput - The return type for the generateDetailedReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetailedReportInputSchema = z.object({
  careerStream: z.string().describe('The name of the career stream.'),
  userFeedback: z.string().describe('The user feedback on the career stream.'),
  quizAnswers: z.array(z.string()).describe('The answers from the personality quiz.'),
});
export type DetailedReportInput = z.infer<typeof DetailedReportInputSchema>;

const DetailedReportOutputSchema = z.object({
  report: z.string().describe('A detailed report explaining the suitability and future worth of the career stream.'),
});
export type DetailedReportOutput = z.infer<typeof DetailedReportOutputSchema>;

export async function generateDetailedReport(input: DetailedReportInput): Promise<DetailedReportOutput> {
  return detailedReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detailedReportPrompt',
  input: {schema: DetailedReportInputSchema},
  output: {schema: DetailedReportOutputSchema},
  prompt: `You are a career counselor writing a simple, clear report for parents of a 10th-grade student. Use simple English.

The student has shown interest in the '{{{careerStream}}}' stream.
Their quiz answers were: {{{quizAnswers}}}.
Their feedback on a simulation was: {{{userFeedback}}}.

Based on this, write a report covering these points in separate paragraphs:
1.  **Child's Strengths:** Based on the quiz, what is your child naturally good at? (e.g., "Your child seems to be a logical thinker who enjoys solving problems.")
2.  **Stream Suitability:** Explain in simple terms why the '{{{careerStream}}}' stream is a good fit for these strengths.
3.  **Future Job Prospects:** List 3-4 sample job titles available in this stream in the future (e.g., "Software Developer, Data Analyst"). Keep the job titles straightforward.
`,
});

const detailedReportFlow = ai.defineFlow(
  {
    name: 'detailedReportFlow',
    inputSchema: DetailedReportInputSchema,
    outputSchema: DetailedReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
