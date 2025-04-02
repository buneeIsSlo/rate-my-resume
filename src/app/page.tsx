"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Menu, Rocket, X } from "lucide-react";
import FileUpload from "@/components/file-upload";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <>
      <main className="">
        <section className="relative">
          <div className="relative py-24">
            <div className="mx-auto max-w-7xl px-6 md:px-12">
              <div className="text-center sm:mx-auto sm:w-10/12 lg:mt-0 lg:mr-auto lg:w-4/5">
                <Link
                  href="/"
                  className="mx-auto flex w-fit items-center gap-2 rounded-(--radius) border p-1 pr-3"
                >
                  <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-xs font-medium">
                    Gemini API
                  </span>
                  <span className="block h-4 w-px bg-(--color-border)"></span>
                  <ArrowRight className="text-primary size-4" />
                </Link>

                <h1 className="mt-4 font-[besley] text-4xl md:text-5xl xl:text-5xl xl:[line-height:1.125]">
                  Refine your Resume <br /> Land your Dream job
                </h1>
                <p className="text-muted-foreground mx-auto mt-4 hidden max-w-xl text-lg text-wrap sm:block">
                  Upload your resume and receive intelligent feedback to help
                  you stand out to employers and applicant tracking systems.
                </p>
                <p className="text-muted-foreground mx-auto mt-4 block max-w-xl text-lg text-wrap sm:hidden">
                  Upload & Get intelligent resume feedback.
                </p>
              </div>
              <FileUpload
                isAnalyzing={false}
                onFileSelected={() => console.log("yeah")}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
