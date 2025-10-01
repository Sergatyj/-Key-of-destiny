
import { GoogleGenAI } from "@google/genai";

const getApiKey = (): string => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    // In a real application, you'd handle this more gracefully.
    // For this environment, we'll alert the user.
    console.error("API key is missing. Please set the API_KEY environment variable.");
    throw new Error("API ключ не налаштовано.");
  }
  return apiKey;
};

// Initialize the Gemini client.
// It's initialized outside the function to avoid re-creating it on every call.
let ai: GoogleGenAI;
try {
  ai = new GoogleGenAI({ apiKey: getApiKey() });
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

export const getDestinyAnalysis = async (dob: string, questions: string[]): Promise<string> => {
  if (!ai) {
     throw new Error("Сервіс AI недоступний. Перевірте налаштування API ключа.");
  }

  const model = "gemini-2.5-flash";

  const allQuestions = questions.join("\n");
  const prompt = `Зроби розбір матриці долі, відповідаючи на ці питання для дати народження ${dob}:\n\n${allQuestions}\n\nНадай відповідь українською мовою. Відповідь має бути структурованою, детальною та надихаючою.`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Не вдалося отримати відповідь від AI.");
  }
};
