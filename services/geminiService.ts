
import { GoogleGenAI, Type } from "@google/genai";
import { Prediction, KeyboardTheme } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getNextWordPredictions(context: string): Promise<string[]> {
    if (!context.trim()) return ['Hello', 'I am', 'The'];

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Given the sentence context: "${context}", predict exactly 3 likely next words. 
                  Provide them as a simple comma-separated list of words only.`,
        config: {
          temperature: 0.7,
          maxOutputTokens: 20,
        },
      });

      const text = response.text || '';
      return text.split(',').map(s => s.trim().replace(/[".]/g, '')).slice(0, 3);
    } catch (error) {
      console.error('Gemini prediction error:', error);
      return ['next', 'and', 'the'];
    }
  }

  async generateThemeFromPrompt(prompt: string): Promise<Partial<KeyboardTheme> | null> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a color palette for an Android keyboard based on this description: "${prompt}".
                  Return a JSON object with properties: background, keyBackground, keyText, accent, accentText, suggestionText.
                  Colors must be in hex format.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              background: { type: Type.STRING },
              keyBackground: { type: Type.STRING },
              keyText: { type: Type.STRING },
              accent: { type: Type.STRING },
              accentText: { type: Type.STRING },
              suggestionText: { type: Type.STRING },
            },
            required: ["background", "keyBackground", "keyText", "accent", "accentText", "suggestionText"]
          }
        },
      });

      const jsonStr = response.text.trim();
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error('Gemini theme error:', error);
      return null;
    }
  }

  async assistantHelp(text: string): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `As an AI keyboard assistant, help me complete or improve this text: "${text}". 
                  Keep it brief and natural.`,
        config: {
          maxOutputTokens: 50,
        }
      });
      return response.text || '';
    } catch (error) {
      return "Unable to assist right now.";
    }
  }
}

export const geminiService = new GeminiService();
