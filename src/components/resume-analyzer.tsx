import { useState } from "react";
import FileUpload from "./file-upload";
import ResumeReview from "./resume-review";
import useAnalysisResult from "@/hooks/useAnalysisResult";
import { AnalysisResult } from "@/lib/schema";
import { encodeFileAsBase64 } from "@/lib/utils";

export default function ResumeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate, data: analysisResult, isPending } = useAnalysisResult();

  const handleFileSelected = async (file: File) => {
    setSelectedFile(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    const base64File = await encodeFileAsBase64(selectedFile);
    mutate({
      file: base64File,
      name: selectedFile.name,
      type: selectedFile.type,
    });
  };

  if (analysisResult) {
    return <ResumeReview analysisResult={analysisResult} />;
  }

  return (
    <FileUpload
      onFileSelected={handleFileSelected}
      onAnalyze={handleAnalyze}
      isAnalyzing={isPending}
      selectedFile={selectedFile}
    />
  );
}
