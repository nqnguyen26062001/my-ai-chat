import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY;

export const getAIResponse = async (prompt: string): Promise<string> => {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 150,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  return response.data.choices[0].text.trim();
};