"use server";

import { analyzeCodeReadability, AnalyzeCodeReadabilityOutput } from "@/ai/flows/code-readability-analyzer";

interface FormState {
  result?: AnalyzeCodeReadabilityOutput;
  error?: string;
}

export async function analyzeCode(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const codeSnippet = formData.get("codeSnippet");

  if (typeof codeSnippet !== "string" || !codeSnippet.trim()) {
    return { error: "Please provide a code snippet to analyze." };
  }

  try {
    const result = await analyzeCodeReadability({ codeSnippet });
    return { result };
  } catch (e: any) {
    console.error("AI analysis failed:", e);
    return { error: e.message || "An unexpected error occurred during analysis. Please try again." };
  }
}
