import axios from 'axios';

export async function getAIResponse(message: string) {
  const API_KEY = process.env.API_KEY;
  const model = 'gemini-pro'; // Gemini GPT model

  try {
    const response = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
      {
        contents: [{
          parts: [
            {
              text: message
            }
          ]
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini GPT API Error:', error);
    return 'Sorry, I’m unable to respond right now. Please try again later.';
  }
}
