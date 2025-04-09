import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  FileWarning,
  Loader,
  Loader2,
  Upload,
} from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { Button } from "./ui/button";
import useAnalysisResult from "@/hooks/useAnalysisResult";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  selectedFile: File | null;
  className?: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function FileUpload({
  onFileSelected,
  onAnalyze,
  isAnalyzing,
  selectedFile,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF, DOC, or TXT file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size must be less than 2MB");
      return;
    }

    onFileSelected(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile],
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile],
  );

  const handleButtonClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const {
    mutate: analyzeResume,
    data: analysisResult,
    isPending,
  } = useAnalysisResult();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        onAnalyze();
      }}
      className={cn("mx-auto mt-12 w-full max-w-md", className)}
    >
      <div
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all",
          isDragging ? "border-primary/50 bg-gray-100" : "",
          error ? "border-destructive/50" : "border-muted-foreground/25",
          "hover:border-primary/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileInputChange}
          accept=".pdf,.doc,.docx"
          disabled={isAnalyzing}
        />

        {selectedFile ? (
          <div className="animate-fade-in flex flex-col items-center">
            <CheckCircle2 className="text-primary mb-4 h-10 w-10" />
            <p className="font-medium">{selectedFile.name}</p>
            <p className="text-muted-foreground text-sm">
              {(selectedFile.size / 1024).toFixed(0)} KB
            </p>
            <span className="text-muted-foreground/50 font-normal">or</span>
            <Button
              className="text-muted-foreground h-fit cursor-pointer p-0 text-sm font-normal"
              variant={"link"}
              onClick={handleButtonClick}
              type="button"
            >
              Select a different file
            </Button>
          </div>
        ) : (
          <>
            <Upload className="text-muted-foreground mb-4 h-10 w-10" />
            <p className="mb-1 text-lg font-medium">Upload your resume</p>
            <p className="text-muted-foreground mb-4 text-sm">
              Drop your file here or click to browse
            </p>
          </>
        )}

        {!isAnalyzing && !selectedFile && (
          <Button
            onClick={handleButtonClick}
            variant="secondary"
            disabled={isAnalyzing}
            className="mt-2 cursor-pointer"
            type="button"
          >
            Select file
          </Button>
        )}

        {error && (
          <div className="text-destructive animate-fade-in mt-4 flex items-center text-sm font-medium">
            <FileWarning className="mr-1 h-4 w-4" />
            {error}
          </div>
        )}
      </div>

      <div className="mt-2">
        {!selectedFile && (
          <p className="text-muted-foreground text-center text-xs">
            Supported formats: PDF, DOC, DOCX (Max 2MB)
          </p>
        )}

        {selectedFile && (
          <Button
            type="submit"
            className="mt-2 w-full cursor-pointer"
            disabled={isAnalyzing}
          >
            Analyze resume
          </Button>
        )}

        {isAnalyzing && (
          <div className="mx-auto mt-2 flex w-fit animate-pulse items-center gap-1">
            <Loader className="size-4 animate-spin" />
            <p className="">This may take a few seconds, please wait...</p>
          </div>
        )}
      </div>

      {/* <div className="x-auto relative z-20 mx-auto mt-8 max-w-lg sm:mt-12">
        <div className="absolute inset-0 -top-8 left-1/2 -z-20 h-56 w-full -translate-x-1/2 [background-image:linear-gradient(to_bottom,transparent_98%,theme(colors.blue.200/75%)_98%),linear-gradient(to_right,transparent_94%,_theme(colors.blue.200/75%)_94%)] [background-size:16px_35px] [mask:radial-gradient(black,transparent_95%)] dark:opacity-10"></div>
      </div> */}
    </form>
  );
}
