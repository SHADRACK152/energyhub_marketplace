const axios = require('axios');

// Hugging Face Inference API (free tier, limited models)
const HF_API_URL = 'https://api-inference.huggingface.co/models/google/gemma-7b-it';

async function getAIAnswer(question) {
  try {
    const response = await axios.post(HF_API_URL, {
      inputs: question,
      parameters: {
        max_new_tokens: 150,
        temperature: 0.7,
      }
    }, {
      headers: {
        'Accept': 'application/json',
        // No API key needed for public models (rate limits apply)
      }
    });
    // Hugging Face returns an array of generated text
    if (response.data && Array.isArray(response.data) && response.data[0]?.generated_text) {
      return response.data[0].generated_text;
    }
    // Some models return just 'generated_text'
    if (response.data && response.data.generated_text) {
      return response.data.generated_text;
    }
    return 'Sorry, I could not get an answer from the free AI model.';
  } catch (error) {
    console.error('Hugging Face error:', error.response?.data || error.message);
    return 'Sorry, I could not get an answer from the free AI model.';
  }
}

module.exports = { getAIAnswer };
