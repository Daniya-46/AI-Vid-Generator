import { Request, Response } from "express";
import { generateScriptFromPrompt } from "../services/geminiService";

interface RealEstateRequest {
  tourStyle: string;
}

export const createRealEstateVideo = async (
  req: Request<unknown, unknown, RealEstateRequest>,
  res: Response
): Promise<void> => {
  const { tourStyle } = req.body;

  if (!tourStyle) {
    res.status(400).json({ error: "Tour style is required." });
    return;
  }

  const listing = {
    address: "12012 Crest Ct, Beverly Hills, CA 90210",
    price: "$10,183,985",
    bedrooms: 5,
    bathrooms: 6.5,
    squareFeet: "6,100",
    features: [
      "Luxury estate",
      "Three-car garage",
      "Landscaped grounds",
      "Elegant entrance with grand staircase",
      "Modern design",
      "Prime Beverly Hills location",
    ],
  };

  const prompt = `
Generate a short virtual video tour script (30–60 seconds) for a real estate listing in ${tourStyle} style.

Property details:
- Address: ${listing.address}
- Price: ${listing.price}
- Bedrooms: ${listing.bedrooms}
- Bathrooms: ${listing.bathrooms}
- Square Footage: ${listing.squareFeet}
- Features: ${listing.features.join(", ")}

Make the script vivid and immersive, include voiceover suggestions and ambient sounds if helpful.
`;

  try {
    const script = await generateScriptFromPrompt(prompt);
    res.status(200).json({
      script,
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // placeholder
    });
  } catch (err) {
    console.error("Real estate generation failed:", err);
    res.status(500).json({ error: "Failed to generate video tour script." });
  }
};
