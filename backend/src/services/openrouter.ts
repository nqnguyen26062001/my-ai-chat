import axios from 'axios';

export async function getOpenRouterAIResponse(prompt: string): Promise<string> {
  const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
  const apiKey = process.env.OPENROUTER_API_KEY; // Replace with your actual environment variable

  try {
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

    const data = response.data;
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in getAIResponse:', error);
    throw new Error('Failed to get AI response');
  }
}
