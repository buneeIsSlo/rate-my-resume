import { AnalysisResultSchema } from "@/lib/schema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function POST(req: Request) {
  try {
    const { file, type } = await req.json();
    const model = google("gemini-2.0-flash-exp");

    const result = await generateObject({
      model,
      schema: AnalysisResultSchema,
      messages: [
        {
          role: "system",
          content:
            "You're a resume expert who gives thoughtful, easy-to-understand feedback. FIRST, verify this is actually a resume/CV document by looking for typical resume elements like work experience, education, skills, contact info, etc. If this is NOT a resume/CV, respond with empty arrays for all list fields, set all scores to 0, and use the overallImpression field to explain that this doesn't appear to be a resume and why. If it IS a resume, look at structure, formatting, content, and how the resume works overall. Be detailed and clear, and stick to what works best in resumes today. Only mention the candidate's name in the 'overallImpression' part. Everywhere else, keep the tone helpful and focused.",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Can you take a look at this resume and give some solid feedback? Please cover: 1) How well the experience, skills, and education are shown, 2) Formatting and layout, 3) How clear and professional the wording is, 4) Whether it's likely to pass an ATS scan, and 5) Your overall impression with some personal advice for the candidate. Include clear suggestions for anything that could be stronger.",
            },
            {
              type: "file",
              data: file,
              mimeType: type,
            },
          ],
        },
      ],
    });

    return Response.json(result.object);
  } catch (error) {
    console.error("Error processing resume:", error);
    return Response.json(
      {
        typos: [],
        atsAnalysis: [],
        strengths: [],
        weaknesses: [],
        overallImpression: `Error processing file: ${(error as Error).message}. Please try again with a different file.`,
        scores: {
          overall: 0,
          typos: 0,
          ats: 0,
          strengths: 0,
          weaknesses: 0,
        },
      },
      { status: 500 },
    );
  }
}
