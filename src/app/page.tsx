"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Menu, Rocket, X } from "lucide-react";

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
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
              <div className="x-auto relative z-20 mx-auto mt-8 max-w-lg sm:mt-12">
                <div className="absolute inset-0 -top-8 left-1/2 -z-20 h-56 w-full -translate-x-1/2 [background-image:linear-gradient(to_bottom,transparent_98%,theme(colors.blue.200/75%)_98%),linear-gradient(to_right,transparent_94%,_theme(colors.blue.200/75%)_94%)] [background-size:16px_35px] [mask:radial-gradient(black,transparent_95%)] dark:opacity-10"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
