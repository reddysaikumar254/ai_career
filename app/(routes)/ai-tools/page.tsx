"use client"

import React from "react"
import { Sparkles } from "lucide-react"
import AiToolsList from "../dashboard/_components/AiToolsList"

function AiTools() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

      <div className="max-w-7xl mx-auto px-8 py-12 space-y-10">

        {/* ================= HEADER ================= */}
        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </div>

            <h2 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
              AI Career Tools
            </h2>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed">
            Explore intelligent tools designed to accelerate your career growth,
            optimize your resume, generate learning roadmaps, and get personalized
            AI career guidance.
          </p>

        </div>

        {/* ================= TOOLS GRID ================= */}
        <div className="
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          rounded-2xl p-8 shadow-sm
        ">
          <AiToolsList />
        </div>

      </div>
    </div>
  )
}

export default AiTools