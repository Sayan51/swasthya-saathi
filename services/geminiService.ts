
import { GoogleGenAI } from "@google/genai";

export const getGeminiResponse = async (prompt: string) => {
  let apiKey: string | undefined;

  try {
    apiKey = (import.meta as any).env?.VITE_API_KEY;
  } catch (e) {
    console.warn("Environment variables not accessible via import.meta.env");
  }

  if (!apiKey || apiKey === "PLACEHOLDER_API_KEY") {
    console.error("API Key error: Key is missing or using placeholder.");
    return "Error: API Key is missing or invalid. Please check your setup.";
  }

  const genAI = new GoogleGenAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are Swasthya Saathi, a helpful and empathetic health assistant for rural Indians. 
    Keep your language simple. Provide guidance on symptoms, general health, and hygiene. 
    Always include a disclaimer that you are an AI and not a substitute for a real doctor. 
    If symptoms sound serious (chest pain, high fever for days, etc.), strongly advise visiting the nearest Primary Health Centre (PHC).
    Format your response in simple markdown with clear bullet points. If requested, provide information in Hindi or English.`
  });

  try {
    const response = await model.generateContent(prompt);
    const text = response.response.text();
    return text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Something went wrong. Please check your connection and try again.";
  }
};
