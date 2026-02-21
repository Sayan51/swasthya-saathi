
export const streamHealthAdvice = async (prompt: string, onChunk: (text: string) => void) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt, language: 'en', conversationHistory: [] }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from API');
    }

    const data = await response.json();
    if (data.response) {
      onChunk(data.response);
    } else {
      onChunk("I'm sorry, I received an empty response. Please try again.");
    }
  } catch (error) {
    console.error("AI Service Error:", error);
    onChunk("\n\n*Error: I'm having trouble connecting to my health database. Please try again or visit a local clinic.*");
  }
};
