import { GoogleGenerativeAI, GenerativeModel } from '@google/generative-ai';

// Load environment variables from .env file
require('dotenv').config();

// Access your API key (ensure it's set in your .env file)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  throw new Error('Gemini API key is missing. Please set GEMINI_API_KEY in your .env file');
}

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Define the model you want to use
const MODEL_NAME = "gemini-1.5-flash"; // A good balance of speed and capability
// Other options include "gemini-1.5-pro", "gemini-pro", "gemini-pro-vision" (for image inputs)

export async function getGeminiAIResponse(prompt: string, maxRetries: number = 3): Promise<string> {
  if (!GEMINI_API_KEY) {
    return 'Configuration Error: Gemini API key is missing. Please set GEMINI_API_KEY in your .env file.';
  }

  const model: GenerativeModel = genAI.getGenerativeModel({ model: MODEL_NAME });

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();

    } catch (error: any) { // Use 'any' or a more specific type if you know it
      console.error(`Attempt ${attempt} failed:`, error.message);

      // Check for specific Google AI Studio errors (like rate limits, quota)
      if (error && typeof error === 'object' && 'statusCode' in error) {
        if (error.statusCode === 429) { // Too Many Requests / Quota Exceeded
          if (attempt < maxRetries) {
            const delay = 1000 * Math.pow(2, attempt - 1); // Exponential backoff
            console.warn(`Gemini API quota exceeded or rate limited (429). Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue; // Retry the loop
          } else {
            return 'Gemini API quota exceeded or rate limited after multiple retries. Please check your Google AI Studio usage.';
          }
        } else if (error.statusCode === 400) {
          return `Gemini API Error (400 Bad Request): ${error.message}. Check your prompt/model.`;
        } else if (error.statusCode === 403) {
          return `Gemini API Error (403 Forbidden): Your API key might not have permission, or billing is not set up. ${error.message}`;
        }
      }
      // Handle network errors or other unexpected errors
      else if (error.message && (error.message.includes('network') || error.message.includes('timeout'))) {
         if (attempt < maxRetries) {
            const delay = 1000 * Math.pow(2, attempt - 1);
            console.warn(`Network error or timeout. Retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            continue;
        } else {
            return 'Network error: Could not connect to Gemini service or request timed out.';
        }
      }

      // If it's a non-retriable error or all retries failed
      return `An unexpected error occurred with Gemini: ${error.message}`;
    }
  }

  // Fallback if somehow execution reaches here without returning
  return 'Failed to get a response from Gemini after all retries.';
}

