// Vercel Serverless Function — /api/chat
// API key stays here on the server — never exposed to browser or GitHub

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS — allow your Vercel domain and custom domain
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { contents } = req.body;
  if (!contents || !Array.isArray(contents)) {
    return res.status(400).json({ error: 'Missing contents array' });
  }

  // API key read from Vercel Environment Variable — NEVER hardcoded
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured on server' });
  }

  // Try each model until one works
  const models = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-1.5-flash',
    'gemini-pro',
  ];

  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const geminiRes = await fetch(url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: 350,
            temperature    : 0.75,
            topP           : 0.9,
          }
        })
      });

      const data = await geminiRes.json();

      // Model not found — try next
      if (geminiRes.status === 404 || data.error?.status === 'NOT_FOUND') {
        console.log(`Model ${model} not found, trying next...`);
        continue;
      }

      // Rate limited — return 429 so frontend can show countdown
      if (geminiRes.status === 429) {
        return res.status(429).json({ error: 'Rate limited', retryAfter: 65 });
      }

      // Auth error
      if (geminiRes.status === 403 || geminiRes.status === 401) {
        return res.status(403).json({ error: 'Invalid API key' });
      }

      // Other error
      if (!geminiRes.ok || data.error) {
        console.error(`Gemini error on ${model}:`, data.error);
        continue;
      }

      // Success — return reply text
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) { continue; }

      return res.status(200).json({ reply: text, model });

    } catch (err) {
      console.error(`Fetch error on ${model}:`, err.message);
      continue;
    }
  }

  // All models failed
  return res.status(500).json({ error: 'All models failed' });
}
