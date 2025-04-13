import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AnalysisResult } from "@/lib/schema";
import { Gauge } from "@suyalcinkaya/gauge";
import { ConfidenceBadge } from "./confidence-badge";
import {
  FileText,
  SpellCheck,
  FileScan,
  ShieldPlus,
  ChartNoAxesColumn,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export default function ResumeReview({
  analysisResult,
  onReset,
}: {
  analysisResult: AnalysisResult;
  onReset: () => void;
}) {
  const {
    scores,
    overallImpression,
    typos,
    atsAnalysis,
    strengths,
    weaknesses,
  } = analysisResult;

  const sectionRefs = {
    overall: React.useRef<HTMLDivElement>(null),
    typos: React.useRef<HTMLDivElement>(null),
    ats: React.useRef<HTMLDivElement>(null),
    strengths: React.useRef<HTMLDivElement>(null),
    weaknesses: React.useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (type: string) => {
    const ref = sectionRefs[type as keyof typeof sectionRefs];
    ref?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Score Gauges */}
      <div className="mx-auto w-fit max-w-3xl py-12">
        <div className="grid grid-cols-2 gap-2 md:flex">
          {Object.entries(scores).map(([type, score]) => (
            <Card
              key={type}
              className={`hover:bg-primary/10 cursor-pointer shadow-xs transition-colors ${
                type === "overall" ? "bg-primary/5 border-2" : ""
              }`}
              onClick={() => scrollToSection(type)}
            >
              <CardHeader className="justif-start flex">
                <CardTitle
                  className={`w-full text-left text-sm font-normal capitalize md:text-base ${
                    type === "overall" ? "font-medium" : "text-muted-foreground"
                  }`}
                >
                  {type === "weaknesses" ? "improvements" : type}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="hidden lg:block">
                  <Gauge
                    value={score}
                    size="lg"
                    showValue
                    showAnimation
                    strokeWidth={type === "overall" ? 8 : 6}
                  />
                </div>

                <div className="lg:hidden">
                  <Gauge
                    value={score}
                    size="md"
                    showValue
                    showAnimation
                    strokeWidth={type === "overall" ? 8 : 10}
                  />
                </div>
                <p className="text-muted-foreground mt-2 text-center text-xs">
                  {type === "overall" && "Overall resume strength"}
                  {type === "typos" && "Grammar and Spelling"}
                  {type === "ats" && "Applicant tracking readiness"}
                  {type === "strengths" && "Notable resume qualities"}
                  {type === "weaknesses" && "Areas for enhancement"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Overall Impression */}
      <div className="mx-auto mb-8 max-w-3xl" ref={sectionRefs.overall}>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center gap-2">
            <FileText className="text-primary" />
            <CardTitle>Overall Impression</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-outside list-disc space-y-4 pl-4">
              <li>{overallImpression}</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Typos Section */}
      <div className="mx-auto mb-8 max-w-3xl" ref={sectionRefs.typos}>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center gap-2">
            <SpellCheck className="text-primary" />
            <CardTitle>Typos and Grammatical Errors</CardTitle>
          </CardHeader>
          <CardContent>
            {typos.length === 0 ? (
              <p className="text-muted-foreground">
                Everything looks good here!
              </p>
            ) : (
              <ul className="list-outside list-disc space-y-4 pl-4">
                {typos.map((typo, index) => (
                  <li key={index}>
                    <div>
                      <p className="inline">{typo.error}</p>{" "}
                      <ConfidenceBadge variant={typo.confidence} size="sm" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ATS Friendliness Section */}
      <div className="mx-auto mb-8 max-w-3xl" ref={sectionRefs.ats}>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center gap-2">
            <FileScan className="text-primary" />
            <CardTitle>ATS Friendliness</CardTitle>
          </CardHeader>
          <CardContent>
            {atsAnalysis.length === 0 ? (
              <p className="text-muted-foreground">
                Everything looks good here!
              </p>
            ) : (
              <ul className="list-outside list-disc space-y-4 pl-4">
                {atsAnalysis.map((item, index) => (
                  <li key={index}>
                    <div>
                      <p className="inline">{item.suggestion}</p>{" "}
                      <ConfidenceBadge variant={item.confidence} size="sm" />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Strengths Section */}
      <div className="mx-auto mb-8 max-w-3xl" ref={sectionRefs.strengths}>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center gap-2">
            <ShieldPlus className="text-primary" />
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            {strengths.length === 0 ? (
              <p className="text-muted-foreground">
                Everything looks good here!
              </p>
            ) : (
              <ul className="list-outside list-disc space-y-4 pl-4">
                {strengths.map((strength, index) => (
                  <li key={index}>
                    <div>
                      <p className="inline">{strength.point}</p>{" "}
                      <ConfidenceBadge
                        variant={strength.confidence}
                        size="sm"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Weaknesses Section */}
      <div className="mx-auto mb-8 max-w-3xl" ref={sectionRefs.weaknesses}>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center gap-2">
            <ChartNoAxesColumn className="text-primary" />
            <CardTitle>Areas for Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            {weaknesses.length === 0 ? (
              <p className="text-muted-foreground">
                Everything looks good here!
              </p>
            ) : (
              <ul className="list-outside list-disc space-y-4 pl-4">
                {weaknesses.map((weakness, index) => (
                  <li key={index}>
                    <div>
                      <p className="inline">{weakness.suggestion}</p>{" "}
                      <ConfidenceBadge
                        variant={weakness.confidence}
                        size="sm"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mx-auto mt-12 mb-8 flex justify-center">
        <Button
          onClick={onReset}
          className="bg-primary hover:bg-primary/90 cursor-pointer px-6 py-3 font-medium text-white"
          size={"lg"}
        >
          Try Another Resume
        </Button>
      </div>
    </div>
  );
}
