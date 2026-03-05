"use client"

import React from "react"
import AiToolCard from "./AiToolCard"
import { RocketIcon } from "@radix-ui/react-icons"

export const aiToolsList = [
  {
    name: "AI Career Q&A Chat",
    desc: "Chat live with your personal AI career mentor.",
    icon: "/chatbot.png",
    button: "Let's Chat",
    path: "/ai-tools/ai-chat",
  },
  {
    name: "AI Resume Analyzer",
    desc: "Optimize and improve your resume instantly.",
    icon: "/resume.png",
    button: "Analyze Now",
    path: "/ai-tools/ai-resume-analyzer",
  },
  {
    name: "Career Roadmap Generator",
    desc: "Generate a complete personalized career roadmap.",
    icon: "/roadmap.png",
    button: "Generate Now",
    path: "/ai-tools/ai-roadmap-agent",
  },
  {
    name: "Cover Letter Generator",
    desc: "Create professional job-winning cover letters.",
    icon: "/cover.png",
    button: "Create Now",
    path: "/ai-tools/cover-letter-generator",
  },
]

const AiToolsList = () => {
  return (
    <section className="mt-16 space-y-12">

      {/* ================= HEADER ================= */}
      <div className="flex items-start gap-3 sm:gap-4">

        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center transition-transform hover:scale-105">
          <RocketIcon className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700 dark:text-neutral-300" />
        </div>

        <div className="space-y-1">

          <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
            Available AI Tools
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Explore AI-powered tools designed to accelerate your career growth,
            enhance your resume, and generate personalized career roadmaps.
          </p>

        </div>

      </div>

      {/* ================= GRID ================= */}
      <div className="
        grid grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
        gap-8
        items-stretch
      ">
        {aiToolsList.map((tool, index) => (
          <div key={index} className="h-full">
            <AiToolCard tool={tool} />
          </div>
        ))}
      </div>

    </section>
  )
}

export default AiToolsList