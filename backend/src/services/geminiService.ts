import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

// Suplimax script generator — structured input
export async function generateScript(
  features: string,
  tone: string,
  audience: string,
  style: string
): Promise<string> {
  const prompt = `
Generate a promotional video script (15–30 seconds) for Suplimax Energy Drink.
Tone: ${tone}
Audience: ${audience}
Style: ${style}
Key features: ${features}

The script should be energetic, concise, and include sound or voiceover cues.
`;

  const result = await ai.models.generateContent({
    model: "models/gemini-1.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No script returned from Gemini");
  return text.trim();
}

// Real Estate script generator — free-form prompt input
export async function generateScriptFromPrompt(
  prompt: string
): Promise<string> {
  const result = await ai.models.generateContent({
    model: "models/gemini-1.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
  });

  const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No script returned from Gemini");
  return text.trim();
}
