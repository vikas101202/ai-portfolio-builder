import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Missing GEMINI_API_KEY in Vercel" },
        { status: 500 }
      );
    }

    if (!resumeText) {
      return Response.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are FolioForge.

Analyze this resume and create portfolio content.

CRITICAL RULES:
- Never invent projects.
- Never invent work experience.
- Never invent certifications.
- Never invent skills.
- If a section is missing, return an empty array.
- If information is unavailable, leave the field empty.
- Use only information explicitly present in the resume.

Return ONLY valid JSON in this exact shape:

{
  "name": "",
  "role": "",
  "headline": "",
  "about": "",
  "skills": [],
  "projects": [],
  "experience": [],
  "contact": {
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": ""
  }
}

Resume:
${resumeText}
`,
    });

    const text = response.text || "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const portfolio = JSON.parse(cleaned);

    return Response.json({ portfolio });
  } catch (error: any) {
    console.error("Gemini generate error:", error);

    return Response.json(
      {
        error:
          error?.message ||
          "Failed to generate portfolio. Check Gemini API key/model.",
      },
      { status: 500 }
    );
  }
}