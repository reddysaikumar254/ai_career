"use client"

import React from "react"
import {
  StarIcon,
  ChatBubbleIcon,
  ArrowTopRightIcon,
} from "@radix-ui/react-icons"

const questionList = [
  "What skills do I need for a data analyst role?",
  "How do I switch careers to UX design?",
]

interface EmptyStateProps {
  selectedQuestion: (question: string) => void
}

function EmptyState({ selectedQuestion }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-16 px-4">

      <div
        className="
        w-full max-w-2xl p-10 rounded-3xl
        bg-neutral-50 dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow-lg shadow-neutral-200/40 dark:shadow-black/40
        transition-all duration-300
        "
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">

          <div className="flex items-center justify-center gap-2 mb-3">
            <StarIcon className="w-5 h-5 text-neutral-500" />
            <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
              Ask your AI Career Agent
            </h2>
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
            Get personalized career guidance. Try one of these suggestions
            or ask your own question.
          </p>
        </div>

        {/* Suggestions */}
        <div className="space-y-4">
          {questionList.map((question, index) => (
            <button
              key={index}
              onClick={() => selectedQuestion(question)}
              className="
              group w-full text-left
              p-5 rounded-xl
              bg-white dark:bg-neutral-800
              border border-neutral-200 dark:border-neutral-700
              hover:border-neutral-300 dark:hover:border-neutral-600
              hover:shadow-md
              transition-all duration-200
              "
            >
              <div className="flex items-start justify-between pr-6">
                <div className="flex items-start gap-3">
                  <ChatBubbleIcon className="mt-1 w-4 h-4 text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors" />
                  <span className="text-sm text-neutral-700 dark:text-neutral-300">
                    {question}
                  </span>
                </div>

                <ArrowTopRightIcon className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmptyState