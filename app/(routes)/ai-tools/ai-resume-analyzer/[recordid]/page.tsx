"use client"

import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState, useCallback } from "react"
import { Loader2, FileText } from "lucide-react"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Report from "./_components/Report"

function AiResumeAnalyzer() {
  const { recordid } = useParams()
  const router = useRouter()

  const [pdfUrl, setPdfUrl] = useState<string | undefined>()
  const [aiReport, setAiReport] = useState<any>()
  const [loading, setLoading] = useState(true)

  const fetchResumeRecord = useCallback(async () => {
    if (!recordid) return

    try {
      const result = await axios.get(
        "/api/history?recordId=" + recordid
      )

      setPdfUrl(result.data?.metaData)
      setAiReport(result.data?.content)
    } catch (error) {
      console.error("Error fetching resume:", error)
    } finally {
      setLoading(false)
    }
  }, [recordid])

  useEffect(() => {
    setLoading(true)
    fetchResumeRecord()
  }, [fetchResumeRecord])

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-10 shadow-lg text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-neutral-600 dark:text-neutral-300 mb-4" />
          <p className="text-neutral-600 dark:text-neutral-400 text-sm">
            Analyzing your resume with AI...
          </p>
        </div>
      </div>
    )
  }

  /* ================= MAIN UI ================= */
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">

      {/* 🔙 Back Link (Same Style as Roadmap Page) */}
      <div className="max-w-7xl mx-auto px-8 pt-8 pb-2">
        <button
          onClick={() => router.push("/dashboard")}
          className="
      group
      inline-flex items-center gap-2
      text-sm font-medium
      text-neutral-600
      hover:text-neutral-900
      transition-colors duration-200
      dark:text-neutral-400
      dark:hover:text-white
    "
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
          Back to Dashboard
        </button>
      </div>

      {/* 🔥 Main Grid */}
      <div className="h-[85vh] grid grid-cols-1 lg:grid-cols-2 border-t border-neutral-200 dark:border-neutral-800">

        {/* LEFT: AI REPORT */}
        <div className="border-r border-neutral-200 dark:border-neutral-800 overflow-y-auto bg-neutral-50 dark:bg-neutral-950">
          {aiReport ? (
            <Report aiReport={aiReport} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-2">
              <FileText className="w-10 h-10 opacity-40" />
              <p>No AI report available</p>
            </div>
          )}
        </div>

        {/* RIGHT: RESUME PREVIEW */}
        <div className="flex flex-col bg-white dark:bg-neutral-900">

          {/* Header */}
          <div className="p-6 border-b border-neutral-200 dark:border-neutral-800 sticky top-0 bg-white dark:bg-neutral-900 z-10">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Resume Preview
            </h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Live preview of your uploaded resume
            </p>
          </div>

          {/* PDF Preview */}
          <div className="flex-1 overflow-hidden">
            {pdfUrl ? (
              <iframe
                key={pdfUrl}
                src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full"
                style={{ border: "none" }}
                title="Resume Preview"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-3">
                <FileText className="w-10 h-10 opacity-40" />
                <p>No resume preview available</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default AiResumeAnalyzer