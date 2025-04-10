import { AnalysisResult } from "@/lib/schema";
import { useMutation } from "@tanstack/react-query";

interface ResumeData {
  file: string;
  name: string;
  type: string;
}

export default function useAnalysisResult() {
  const getAnalyzedResult = async (
    resumeData: ResumeData,
  ): Promise<AnalysisResult> => {
    const response = await fetch("/api/review-resume", {
      method: "POST",
      body: JSON.stringify(resumeData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const { mutate, data, isPending } = useMutation<
    AnalysisResult,
    Error,
    ResumeData
  >({
    mutationFn: (resumeData: ResumeData) => getAnalyzedResult(resumeData),
  });

  return { mutate, data, isPending };
}
