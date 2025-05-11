import type { Metadata } from "next";
import { Geist, Geist_Mono, Besley } from "next/font/google";
import "./globals.css";
import QueryProvider from "./query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const besley = Besley({
  variable: "--font-besley",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rate-my-resume-pls.vercel.app"),
  title: "Rate my Resume",
  description:
    "Enhance your resume with AI-powered feedback. Get instant scores and actionable insights to stand out.",
  authors: [{ name: "abshk" }],
  openGraph: {
    title: "rate-my-resume-pls.vercel.app",
    description: "Upload your resume and get intelligent feedback",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "rate my resume",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${besley.variable} flex min-h-screen flex-col antialiased`}
      >
        <div className="absolute top-0 z-[-2] h-screen w-full bg-white bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.13)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]"></div>
        <QueryProvider>
          <div className="flex flex-1 flex-col">{children}</div>
        </QueryProvider>
      </body>
    </html>
  );
}
