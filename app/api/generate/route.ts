import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

function extractJson(text: string) {
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON object found in Gemini response");
  }

  return cleaned.slice(firstBrace, lastBrace + 1);
}

export async function POST(req: Request) {
  try {
    const { resumeText } = await req.json();

    if (!resumeText || !resumeText.trim()) {
      return Response.json(
        { error: "Resume text is required" },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return Response.json(
        { error: "Gemini API key is missing" },
        { status: 500 }
      );
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are FolioForge, an AI resume-to-portfolio generator.

Return ONLY valid JSON.
Do not use markdown.
Do not use comments.
Do not use trailing commas.
Do not explain anything.
Do not wrap the JSON in code fences.

Rules:
- Use only information explicitly present in the resume.
- Never invent projects, experience, certifications, links, or skills.
- If a section is missing, return an empty array.
- If a field is missing, return an empty string.
- Every project must use this shape:
  { "name": "", "description": "", "techStack": [], "link": "", "github": "" }
- Every experience item must use this shape:
  { "role": "", "company": "", "duration": "", "description": "" }
- All arrays must contain strings or objects only.
- Escape quotes inside strings.
- Do not include newline characters inside string values.

Return exactly this JSON shape:

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

    const rawText = response.text || "";

    if (!rawText.trim()) {
      return Response.json(
        { error: "Gemini returned an empty response" },
        { status: 500 }
      );
    }

    const jsonText = extractJson(rawText);
    const portfolio = JSON.parse(jsonText);

    if (!portfolio || typeof portfolio !== "object") {
      return Response.json(
        { error: "Gemini returned invalid portfolio data" },
        { status: 500 }
      );
    }

    return Response.json({ portfolio });
  } catch (error) {
    console.error("Gemini generate error:", error);

    return Response.json(
      { error: "Failed to generate portfolio" },
      { status: 500 }
    );
  }
}