#!/usr/bin/env node
require('dotenv').config();

const key = process.env.GEMINI_API_KEY;
if (!key) {
  console.error('GEMINI_API_KEY is not set. Please add it to your .env.local or environment and try again.');
  process.exit(1);
}

const base = 'https://generativelanguage.googleapis.com/v1beta';
const listUrl = `${base}/models?key=${encodeURIComponent(key)}`;

(async () => {
  try {
    const res = await fetch(listUrl);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`ListModels failed: ${res.status} ${res.statusText} - ${text}`);
    }

    const body = await res.json();
    const models = body.models || body;
    if (!models || models.length === 0) {
      console.log('No models found for this key.');
      return;
    }

    console.log(`Found ${models.length} models:`);
    for (const m of models) {
      const name = m.name || m.model || m.id || '<unknown>';
      console.log(`- ${name}`);
      if (m.supportedMethods) {
        console.log(`  Supported methods: ${m.supportedMethods.join(', ')}`);
      }
      if (m.displayName) console.log(`  Display name: ${m.displayName}`);
    }
  } catch (err) {
    console.error('Error while probing models:', err?.message || err);
    process.exit(1);
  }
})();
