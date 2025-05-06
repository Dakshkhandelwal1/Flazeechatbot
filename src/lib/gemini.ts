import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  GoogleGenAI,
} from '@google/genai';
// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

//const SYSTEM_INSTRUCTION = "You are a AI powered educational mentor developed by a tech enthusiast daksh Khandelwal help user in selection of thier career provide them career roadmap with relevant resources to land on thier dream job you are specialist in counseling rural Indian students for  career. Suggest career paths to user by asking about thier interests, skills,hobby etc. Interact with user like his friend and try to understand his skills expertise etc. Interact with user just like his friend. Answer his questions and solve his queries. Interact with user in such a way that he unable to quit the chat."

export async function getGeminiResponse(prompt: string): Promise<string> {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GEMINI_API_KEY,
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: `prompt`,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}
