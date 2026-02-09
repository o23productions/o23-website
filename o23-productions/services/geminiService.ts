import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedIdea } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateContentIdeas = async (topic: string): Promise<GeneratedIdea[]> => {
  if (!process.env.API_KEY) {
    console.warn("API Key not found, returning mock data");
    return [
      {
        title: "AI & The Future of Filmmaking",
        format: "Short-form Vertical (Reels/TikTok)",
        synopsis: "A fast-paced montage comparing traditional CGI with new GenAI tools, ending with a hook about O23's workflow."
      },
      {
        title: "How We Scaled to 1000 Replicas",
        format: "LinkedIn Carousel / Blog Post",
        synopsis: "Technical deep dive into the infrastructure behind O23's content engine, focusing on efficiency and throughput."
      },
      {
        title: "The Human in the Loop",
        format: "YouTube Video Essay",
        synopsis: "An exploration of why human creativity is the essential spark that guides the AI factory, featuring interviews with O23 editors."
      }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a creative director at a high-tech content production company called O23 Productions. 
      Generate 3 distinct content ideas based on the topic: "${topic}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              format: { type: Type.STRING },
              synopsis: { type: Type.STRING },
            },
            required: ["title", "format", "synopsis"],
          },
        },
      }
    });

    const text = response.text || "[]";
    const ideas = JSON.parse(text) as GeneratedIdea[];
    return ideas;
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback in case of error
    return [
      {
        title: `Error generating for ${topic}`,
        format: "System Alert",
        synopsis: "Please check API configuration or try again later."
      }
    ];
  }
};