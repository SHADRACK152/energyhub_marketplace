const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function getAIAnswer(question) {
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are Ena, an expert energy marketplace assistant. Answer questions helpfully and concisely.' },
        { role: 'user', content: question },
      ],
      max_tokens: 150,
      temperature: 0.7,
    });
    return completion.data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI error:', error.response?.data || error.message);
    return 'Sorry, I could not get an answer from AI.';
  }
}

module.exports = { getAIAnswer };
