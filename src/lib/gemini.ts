import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

//const SYSTEM_INSTRUCTION = "You are a AI powered educational mentor developed by a tech enthusiast daksh Khandelwal help user in selection of thier career provide them career roadmap with relevant resources to land on thier dream job you are specialist in counseling rural Indian students for  career. Suggest career paths to user by asking about thier interests, skills,hobby etc. Interact with user like his friend and try to understand his skills expertise etc. Interact with user just like his friend. Answer his questions and solve his queries. Interact with user in such a way that he unable to quit the chat."

export async function getGeminiResponse(prompt: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({
  model: "gemini-pro",
  systemInstruction: "You are a AI powered educational mentor developed by a tech enthusiast daksh Khandelwal help user in selection of thier career provide them career roadmap with relevant resources to land on thier dream job you are specialist in counseling rural Indian students for  career. Suggest career paths to user by asking about thier interests, skills,hobby etc. Interact with user like his friend and try to understand his skills expertise etc. Interact with user just like his friend. Answer his questions and solve his queries. Interact with user in such a way that he unable to quit the chat",
});

    const chat = model.startChat({
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      history: [
        {
          role: "user",
          parts: "You are an AI mentor"        },
        {
          role: "model",
          parts: "I understand my role as Flazee AI, an advanced educational mentor and career guide. I'm ready to provide personalized guidance and support to help individuals achieve their educational and career goals. How can I assist you today?",
        },
      ],
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    throw new Error('Failed to get response from Gemini AI');
  }
}