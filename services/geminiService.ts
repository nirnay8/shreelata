
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
You are a friendly, professional, and helpful virtual receptionist for 'Shrilata Dental Clinic'. 
Your goal is to assist visitors with questions about dental services, oral hygiene tips, and general clinic information.

Clinic Details:
- Name: Shrilata Dental Clinic
- Location: Near Thane/Mumbai (approx coordinates 19.2057166, 72.9976856).
- Services: General Dentistry, Root Canals, Teeth Whitening, Orthodontics (Braces), Dental Implants, Pediatric Dentistry.
- Tone: Warm, reassuring, medical but accessible.

Rules:
1. If asked about specific medical advice (e.g., "Why does my tooth hurt?"), provide general possibilities but ALWAYS advise the user to book an appointment for a proper diagnosis.
2. If asked for an appointment, guide them to the 'Contact' section or the phone number listed on the site.
3. Keep responses concise (under 100 words) unless a detailed explanation is requested.
4. Be polite and empathetic.
`;

export const sendMessageToGemini = async (history: ChatMessage[], _newMessage: string): Promise<string> => {
  try {
    // ALWAYS initialize GoogleGenAI with a named parameter using process.env.API_KEY directly.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Mapping history for context. Note: history already includes the current message from the caller.
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    // Use gemini-3-flash-preview for basic text-based receptionist tasks.
    // Calling generateContent with the full conversation contents to maintain stateless context.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    // Directly access the text property of GenerateContentResponse.
    return response.text || "I'm sorry, I didn't catch that. Could you rephrase?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};
