
import { GoogleGenAI } from "@google/genai";

export const streamHealthAdvice = async (prompt: string, onChunk: (text: string) => void) => {
  let apiKey: string | undefined;

  try {
    // Safely check for Vite's environment variables
    apiKey = (import.meta as any).env?.VITE_API_KEY;
  } catch (e) {
    console.warn("Environment variables not accessible via import.meta.env");
  }

  if (!apiKey || apiKey === "PLACEHOLDER_API_KEY") {
    console.error("API Key error: Key is missing or using placeholder.");
    onChunk("\n\n*Error: API Key is missing or invalid. Please check your `.env.local` file and ensure it has a valid `VITE_API_KEY`.*");
    return;
  }

  const genAI = new GoogleGenAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are Swasthya Saathi, a friendly, professional AI health assistant specialized for rural Indian users.
    - Use simple English and Hindi (Hinglish if appropriate).
    - Focus on practical, accessible health advice.
    - ALWAYS include a disclaimer that you are an AI and not a doctor.
    - For severe symptoms (e.g., chest pain, breathing difficulty, very high fever), insist on immediate visit to the nearest PHC or hospital.
    - Use Markdown for clear formatting (bullet points, bold text).
    - Keep responses concise and actionable.`
  });

  try {
    const result = await model.generateContentStream(prompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        onChunk(chunkText);
      }
    }
  } catch (error) {
    console.error("Gemini Streaming Error:", error);
    onChunk("\n\n*Error: I'm having trouble connecting to my health database. Please try again or visit a local clinic.*");
  }
};
