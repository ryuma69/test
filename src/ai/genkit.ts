import {genkit} from 'genkit';
import {config} from 'dotenv';

config();

// Dynamically load the google-genai plugin only when an API key is present.
// This prevents a hard crash at module evaluation if GEMINI_API_KEY is missing.
const plugins = [] as any[];

if (process.env.GEMINI_API_KEY) {
  try {
    // Use require to avoid importing the plugin at module load time (avoids plugin init errors)
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { googleAI } = require('@genkit-ai/google-genai');
    plugins.push(googleAI({ apiKey: process.env.GEMINI_API_KEY }));
  } catch (err) {
    // If the plugin fails to load, log a warning and proceed without it so the app remains functional.
    // The original error was: FAILED_PRECONDITION: Please pass in the API key or set the GEMINI_API_KEY
    // We handle that more gracefully here.
    // eslint-disable-next-line no-console
    console.warn('google-genai plugin could not be loaded:', err);
  }
} else {
  // eslint-disable-next-line no-console
  console.warn('GEMINI_API_KEY is not set; google-genai plugin disabled. Set GEMINI_API_KEY to enable it.');
}

const model = process.env.GENKIT_MODEL || 'googleai/gemini-1.0';

if (!process.env.GENKIT_MODEL) {
  // eslint-disable-next-line no-console
  console.info(`GENKIT_MODEL not set. Using default model: '${model}'. Set GENKIT_MODEL to override.`);
}

if (process.env.GEMINI_API_KEY && plugins.length === 0) {
  // eslint-disable-next-line no-console
  console.warn('GEMINI_API_KEY is set but the google-genai plugin failed to load; model calls may fail at runtime.');
}

export const ai = genkit({
  plugins,
  model,
});
