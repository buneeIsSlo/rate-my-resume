import { cn } from "@/lib/utils";
import { CheckCircle2, FileWarning, Upload } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { Button } from "./ui/button";

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  isAnalyzing: boolean;
  className?: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

export default function FileUpload({
  onFileSelected,
  isAnalyzing,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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

    setSelectedFile(file);
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

  return (
    <div className={cn("mx-auto mt-12 w-full max-w-md", className)}>
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

        {!isAnalyzing && (
          <Button
            onClick={handleButtonClick}
            variant="secondary"
            disabled={isAnalyzing}
            className="mt-2 cursor-pointer"
          >
            {selectedFile ? "Replace File" : "Select File"}
          </Button>
        )}

        {error && (
          <div className="text-destructive animate-fade-in mt-4 flex items-center text-sm font-medium">
            <FileWarning className="mr-1 h-4 w-4" />
            {error}
          </div>
        )}
      </div>

      <p className="text-muted-foreground mt-2 text-center text-xs">
        Supported formats: PDF, DOC, DOCX (Max 2MB)
      </p>

      <div className="x-auto relative z-20 mx-auto mt-8 max-w-lg sm:mt-12">
        <div className="absolute inset-0 -top-8 left-1/2 -z-20 h-56 w-full -translate-x-1/2 [background-image:linear-gradient(to_bottom,transparent_98%,theme(colors.blue.200/75%)_98%),linear-gradient(to_right,transparent_94%,_theme(colors.blue.200/75%)_94%)] [background-size:16px_35px] [mask:radial-gradient(black,transparent_95%)] dark:opacity-10"></div>
      </div>
    </div>
  );
}
