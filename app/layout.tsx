import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import Provider from "./provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://careerforge.ai"), // change to your real domain

  title: {
    default: "CareerForge – AI Career Platform",
    template: "%s | CareerForge",
  },

  description:
    "CareerForge is an AI-powered career platform that helps you analyze resumes, generate roadmaps, and build a smarter job search strategy.",

  keywords: [
    "AI career coach",
    "resume analyzer",
    "career roadmap generator",
    "AI resume review",
    "job preparation tools",
    "career growth platform",
  ],

  authors: [{ name: "CareerForge Team" }],

  openGraph: {
    title: "CareerForge – AI Career Platform",
    description:
      "Smarter career decisions powered by AI. Resume analysis, career roadmaps, and intelligent coaching in one platform.",
    url: "https://careerforge.ai",
    siteName: "CareerForge",
    images: [
      {
        url: "/og-image.png", // Add this image inside /public
        width: 1200,
        height: 630,
        alt: "CareerForge AI Career Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CareerForge – AI Career Platform",
    description:
      "AI-powered career growth tools for students and professionals.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
  },

  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geist.variable} bg-slate-950 text-white antialiased`}
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}