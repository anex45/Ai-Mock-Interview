import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// The API key will be accessed server-side only
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        // Disable thinking for faster response and lower cost
        thinkingConfig: {
          thinkingBudget: 0,
        },
      }
    });

    return NextResponse.json({ 
      text: response.text,
      success: true 
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to generate content",
        details: error.message 
      },
      { status: 500 }
    );
  }
}