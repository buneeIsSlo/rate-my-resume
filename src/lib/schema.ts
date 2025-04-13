import { z } from "zod";

const Confidence = z
  .enum(["low", "medium", "high"])
  .describe("Confidence level: low, medium, or high.");

const TypoSchema = z
  .object({
    error: z
      .string()
      .describe("String describing the typo and the suggested correction"),
    location: z
      .string()
      .describe(
        "String indicating where the error occurs, such as the line number",
      ),
    confidence: Confidence.describe("Confidence level of the typo detection"),
  })
  .describe("Schema for individual typos detected in the resume");

const AtsAnalysisSchema = z
  .object({
    suggestion: z
      .string()
      .describe("Suggestion for improving ATS compatibility"),
    confidence: Confidence.describe("Confidence level for the ATS suggestion"),
  })
  .describe("Schema for ATS analysis suggestions");

const StrengthSchema = z
  .object({
    point: z.string().describe("A highlighted strength in the resume"),
    confidence: Confidence.describe(
      "Confidence level for the identified strength",
    ),
  })
  .describe("Schema for individual strengths in the resume");

const WeaknessSchema = z
  .object({
    suggestion: z.string().describe("Suggestion for improvement in the resume"),
    confidence: Confidence.describe(
      "Confidence level for the identified weakness",
    ),
  })
  .describe("Schema for individual weaknesses in the resume");

export const AnalysisResultSchema = z.object({
  typos: z
    .array(TypoSchema)
    .describe("An array of typos detected in the resume"),
  atsAnalysis: z
    .array(AtsAnalysisSchema)
    .describe("An array of ATS improvement suggestions"),
  strengths: z
    .array(StrengthSchema)
    .describe("An array of strengths identified in the resume"),
  weaknesses: z
    .array(WeaknessSchema)
    .describe("An array of weaknesses or areas for improvement"),
  overallImpression: z
    .string()
    .describe(
      "A brief summary of the resume's overall effectiveness and professionalism",
    ),
  scores: z
    .object({
      overall: z
        .number()
        .min(0)
        .max(100)
        .describe("Overall resume score on a scale of 0 to 100"),
      typos: z
        .number()
        .min(0)
        .max(100)
        .describe("Score for typos on a scale of 0 to 100"),
      ats: z
        .number()
        .min(0)
        .max(100)
        .describe("Score for ATS friendliness on a scale of 0 to 100"),
      strengths: z
        .number()
        .min(0)
        .max(100)
        .describe("Score for strengths on a scale of 0 to 100"),
      weaknesses: z
        .number()
        .min(0)
        .max(100)
        .describe(
          "Score for weaker areas on a scale of 0 to 100 (higher = better/fewer improvements needed)",
        ),
    })
    .describe("An object containing scores for each analysis category"),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;
