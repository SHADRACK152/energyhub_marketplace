const fetch = require('node-fetch');

// Simple LLM adapter that uses OpenAI's Chat Completions API when OPENAI_API_KEY is set.
// Returns { reply } or null if not configured or on failure.
async function queryLLM(message, opts = {}) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  try {
    const payload = {
      model: opts.model || 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: opts.system || 'You are Ena, a helpful assistant for an energy marketplace.' },
        { role: 'user', content: message }
      ],
      max_tokens: opts.maxTokens || 250,
      temperature: opts.temperature == null ? 0.2 : opts.temperature
    };

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('LLM query failed:', res.status, text);
      return null;
    }

    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content;
    return { reply };
  } catch (err) {
    console.error('LLM query error:', err.message || err);
    return null;
  }
}

module.exports = { queryLLM };
