import { Request, Response } from "express";
import { generateScript } from "../services/geminiService";

export const createSuplimaxContent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { features, tone, audience, style } = req.body;

  if (!features || !tone || !audience || !style) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  try {
    const script = await generateScript(features, tone, audience, style);
    res.status(200).json({ script });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate script." });
  }
};
