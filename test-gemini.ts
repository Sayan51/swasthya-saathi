import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDjcv7QAfbxJFIcpXMEmV9Z0WTl8DQzctE";
const genAI = new GoogleGenerativeAI(apiKey);

const models = ["gemini-flash-latest"];

async function run() {
    console.log("Testing Gemini API with key:", apiKey.substring(0, 10) + "...");

    for (const modelName of models) {
        console.log(`\nTrying model: ${modelName}`);
        try {
            const model = genAI.getGenerativeModel({ model: modelName });
            const result = await model.generateContent("Hello");
            console.log(`SUCCESS with ${modelName}:`, result.response.text());
            return; // Exit on first success
        } catch (e: any) {
            console.error(`FAILED with ${modelName}:`, e.message || e);
        }
    }
}

run();
