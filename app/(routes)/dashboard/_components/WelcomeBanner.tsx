"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { RocketIcon } from "@radix-ui/react-icons"
import Link from "next/link"

const WelcomeBanner = () => {
  return (
    <div
      className="
        p-10 rounded-3xl
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow-sm
      "
    >
      {/* 👇 Removed max-w-3xl */}
      <div className="w-full">

        {/* Top Row */}
        <div className="flex items-center justify-between mb-6">

          <div
            className="
              inline-flex items-center gap-2
              px-4 py-1 rounded-full
              bg-neutral-100 dark:bg-neutral-800
              text-neutral-700 dark:text-neutral-300
              text-sm font-medium
            "
          >
            <RocketIcon className="w-4 h-4" />
            AI Career Assistant
          </div>

          {/* <Link href="/ai-tools">
            <Button
              className="
                bg-neutral-900 text-white
                dark:bg-neutral-100 dark:text-black
                font-medium px-5 py-2.5 rounded-xl
                transition hover:scale-105
              "
            >
              Get Started
            </Button>
          </Link> */}

        </div>

        <h2 className="font-semibold text-4xl text-neutral-900 dark:text-neutral-100 leading-tight mb-4">
          Welcome to CareerForge
        </h2>

        <p className="text-neutral-600 dark:text-neutral-400 text-lg leading-relaxed max-w-2xl">
          Make smarter career decisions with personalized AI guidance,
          structured learning roadmaps, and powerful resume optimization —
          built to accelerate your professional growth.
        </p>

      </div>
    </div>
  )
}

export default WelcomeBanner