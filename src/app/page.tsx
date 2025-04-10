"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import ResumeAnalyzer from "@/components/resume-analyzer";

export default function HeroSection() {
  return (
    <>
      <main className="flex-1">
        <section className="relative">
          <div className="relative pt-24">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <div className="text-center sm:mx-auto sm:w-10/12 lg:mt-0 lg:mr-auto lg:w-4/5">
                <a
                  href="https://github.com/buneeIsSlo/rate-my-resume"
                  target="_blank"
                  className="mx-auto flex w-fit items-center gap-2 rounded-(--radius) border p-1 pr-3"
                >
                  <span className="bg-primary/10 text-primary rounded-full px-3 py-0.5 text-xs font-medium md:py-1">
                    ⭐ GitHub
                  </span>
                  <span className="block h-4 w-px bg-(--color-border)"></span>
                  <ArrowRight className="text-primary size-4" />
                </a>

                <h1 className="mt-4 font-[besley] text-2xl md:text-5xl xl:text-5xl xl:[line-height:1.125]">
                  Refine your Resume <br /> Land your{" "}
                  <span className="decoration-primary italic underline decoration-wavy decoration-2">
                    Dream
                  </span>{" "}
                  job
                </h1>
                <p className="text-muted-foreground mx-auto mt-4 hidden max-w-xl text-wrap sm:block md:text-lg">
                  Upload your resume and receive intelligent feedback to help
                  you stand out to employers and applicant tracking systems.
                </p>
                <p className="text-muted-foreground mx-auto mt-4 block max-w-[24ch] text-base text-wrap sm:hidden">
                  Upload & Get intelligent resume feedback.
                </p>
              </div>
              <ResumeAnalyzer />
            </div>
          </div>
        </section>
      </main>
      <footer className="mx-auto w-full max-w-7xl px-6 py-4 md:px-12">
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-4 text-center text-xs">
          <p>
            Built with{" "}
            <a
              href="https://sdk.vercel.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Vercel AI SDK
            </a>{" "}
            and{" "}
            <a
              href="https://ai.google.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Google Gemini API
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
