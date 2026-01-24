import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request: NextRequest) {
    let body;

    try {
        body = await request.json();
    } catch (e) {
        console.error('Failed to parse request body:', e);
        return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { message, language, conversationHistory } = body;

    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.log("No API key found, using fallback responses");
            // Basic fallback for now or we could restore the full fallback logic if needed
            return NextResponse.json({
                response: language === 'hi'
                    ? 'कृपया बाद में प्रयास करें।'
                    : 'Please try again later or check API configuration.'
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const systemPrompt = language === 'hi'
            ? `आप एक AI स्वास्थ्य सहायक हैं जो ग्रामीण भारत के लोगों की मदद करते हैं। आप सरल हिंदी में जवाब दें। आप चिकित्सा सलाह दे सकते हैं लेकिन हमेशा यह याद दिलाएं कि गंभीर लक्षणों के लिए डॉक्टर से मिलें। आप सहानुभूतिपूर्ण, मददगार और स्पष्ट हैं।`
            : `You are an AI health assistant helping rural Indians. Respond in simple language. You can provide medical guidance but always remind users to consult a doctor for serious symptoms. You are empathetic, helpful, and clear.`;

        // Robust History Construction: Inject system prompt as first user message
        let history: any[] = [];

        // Add system prompt context
        history.push({
            role: 'user',
            parts: [{ text: `System Instruction: ${systemPrompt}\n\nPlease switch to the role of the AI health assistant now.` }]
        });
        history.push({
            role: 'model',
            parts: [{ text: "Understood. I am ready to help as the AI health assistant." }]
        });

        // Add previous conversation history if exists
        if (conversationHistory && conversationHistory.length > 0) {
            conversationHistory.forEach((msg: any) => {
                history.push({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.content }]
                });
            });
        }

        const chat = model.startChat({
            history: history,
            generationConfig: {
                maxOutputTokens: 500,
                temperature: 0.7,
            },
        });

        const result = await chat.sendMessage(message);
        const response = result.response;
        const text = response.text();

        return NextResponse.json({ response: text });

    } catch (error: any) {
        console.error('Chat API error detailed:', error);

        const safeLanguage = language || 'en';

        // Handle rate limits or other errors gracefully
        if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('429')) {
            return NextResponse.json({
                response: safeLanguage === 'hi'
                    ? 'अपर्याप्त कोटा। कृपया बाद में प्रयास करें।'
                    : 'Quota exceeded. Please try again later.'
            });
        }

        // Return a clean error message to the user (no raw debug info)
        const errorResponse = safeLanguage === 'hi'
            ? 'क्षमा करें, मुझे आपके प्रश्न का उत्तर देने में समस्या हो रही है।'
            : 'Sorry, I\'m having trouble answering your question. Please try again.';

        return NextResponse.json({ response: errorResponse });
    }
}
