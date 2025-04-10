import { useState } from "react";
import FileUpload from "./file-upload";
import ResumeReview from "./resume-review";
import useAnalysisResult from "@/hooks/useAnalysisResult";
import { encodeFileAsBase64 } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export default function ResumeAnalyzer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { mutate, data, isPending, reset } = useAnalysisResult();

  const handleReset = () => {
    setSelectedFile(null);
    reset();
  };

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

  // Handle non-resume PDFs or errors detected by the AI
  if (data && data.scores.overall === 0) {
    return (
      <div className="mx-auto mt-4 max-w-3xl p-8">
        <Card className="rounded-lg border-none bg-yellow-50 p-4 text-yellow-800 shadow-amber-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Unable to Analyze Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data.overallImpression}</p>
            <Button
              onClick={handleReset}
              className="mt-4 cursor-pointer rounded bg-yellow-100 px-4 py-2 text-yellow-800 hover:bg-yellow-200"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (data && selectedFile) {
    return <ResumeReview analysisResult={data} onReset={handleReset} />;
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
