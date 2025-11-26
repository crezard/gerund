import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, GerundTopic } from "../types";

// Helper to get AI instance safely
const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing in environment variables.");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

const modelName = "gemini-2.5-flash";

export const generateQuizQuestions = async (topic: GerundTopic, count: number = 3): Promise<QuizQuestion[]> => {
  try {
    const ai = getAIClient();
    const prompt = `
      Create ${count} multiple-choice questions about English Gerunds (동명사) suitable for Korean middle school 3rd graders (중3).
      Focus specifically on the topic: "${topic}".
      
      The questions should check:
      1. Grammatical correctness.
      2. Correct usage of gerunds vs infinitives.
      3. Interpretation of meaning.
      
      Provide the output strictly in JSON format.
      The explanation must be in Korean and helpful for students.
    `;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: { type: Type.STRING, description: "The question text, typically a sentence with a blank or a question about grammar." },
              options: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "4 multiple choice options"
              },
              correctAnswerIndex: { type: Type.INTEGER, description: "0-based index of the correct option" },
              explanation: { type: Type.STRING, description: "Explanation in Korean why the answer is correct." }
            },
            required: ["question", "options", "correctAnswerIndex", "explanation"]
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    // Clean potential markdown blocks
    const cleanJson = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    return JSON.parse(cleanJson) as QuizQuestion[];
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};

export const getChatResponse = async (history: {role: string, parts: {text: string}[]}[], message: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const chat = ai.chats.create({
      model: modelName,
      history: history,
      config: {
        systemInstruction: `
          You are a friendly and expert English Grammar Tutor specifically for Korean Middle School 3rd graders.
          Your name is "Gerund Genie" (동명사 지니).
          You specialize in explaining English Gerunds (동명사).
          
          Rules:
          1. Explain clearly and simply in Korean.
          2. Use examples appropriate for middle school level.
          3. If the user asks about other topics, politely steer them back to Gerunds or answer briefly then connect it to grammar.
          4. Be encouraging and use emojis occasionally.
          5. Key concepts to know: Subject/Object/Complement roles, verbs like enjoy/finish/mind (gerund only), want/hope (infinitive only), and stop/remember/try (meaning change).
        `
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text || "죄송합니다. 답변을 생성하는데 문제가 발생했습니다.";
  } catch (error) {
    console.error("Error in chat:", error);
    return "오류가 발생했습니다: " + (error instanceof Error ? error.message : "알 수 없는 오류");
  }
};