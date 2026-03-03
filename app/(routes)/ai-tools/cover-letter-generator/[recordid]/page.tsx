"use client"

import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import CoverLetterForm from "../_components/CoverLetterForm"
import { Loader2, Download, RotateCcw, Copy } from "lucide-react"
import {
  FileTextIcon,
  InfoCircledIcon,
  CheckCircledIcon,
  ClockIcon,
  RocketIcon,
  ArrowLeftIcon
} from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter } from "next/navigation"


function CoverLetterDetail() {
  const { recordid } = useParams()

  const [coverLetterData, setCoverLetterData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [copied, setCopied] = useState(false)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const router = useRouter()

  useEffect(() => {
  const fetchCoverLetter = async () => {
    try {
      const result = await axios.get(
        "/api/history?recordId=" + recordid
      )

      const storedContent = result.data?.content

      if (storedContent?.coverLetter) {
        setCoverLetterData(storedContent)
        setLastUpdated(
          new Date(result.data?.createdAt || Date.now())
        )
      } else {
        setCoverLetterData(null)
      }
      console.log("Fetched history:", result.data)

    } 
    catch (error) {
      console.error("Error fetching cover letter:", error)
    } finally {
      setLoading(false)
    }
  }

  if (recordid) {
    fetchCoverLetter()
  }
}, [recordid])

  const downloadCoverLetter = () => {
    if (!coverLetterData?.coverLetter) return

    const blob = new Blob(
      [coverLetterData.coverLetter],
      { type: "text/plain" }
    )

    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "cover-letter.txt"
    link.click()
  }

  const copyCoverLetter = async () => {
    if (!coverLetterData?.coverLetter) return

    try {
      await navigator.clipboard.writeText(coverLetterData.coverLetter)
      setCopied(true)

      // Reset after 2 seconds
      setTimeout(() => {
        setCopied(false)
      }, 2000)

    } catch (error) {
      console.error("Copy failed:", error)
    }
  }

  const wordCount = coverLetterData?.coverLetter
    ? coverLetterData.coverLetter.trim().split(/\s+/).length
    : 0

  const charCount = coverLetterData?.coverLetter?.length || 0

  /* ================= Loading ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[75vh]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (showForm) {
    return (
      <CoverLetterForm
        recordId={recordid as string}
        onGenerated={(generatedText) => {
          setCoverLetterData({ coverLetter: generatedText })
          setShowForm(false)
          setLastUpdated(new Date())
        }}
      />
    )
  }

  /* ================= Main UI ================= */

  return (
    <div className="max-w-6xl mx-auto px-6 pt-10 pb-12">

      {/* GRID CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm space-y-6">

          {/* Back Button */}
          <div>
            <button
              onClick={() => router.push("/ai-tools")}
              className="
              group
              inline-flex items-center gap-2
              px-3 py-1.5
              rounded-lg
              text-sm font-medium
              text-neutral-600
              hover:bg-neutral-100
              hover:text-neutral-900
              transition-all duration-200
            "
            >
              <ArrowLeftIcon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Return to AI Tools
            </button>
          </div>

          {/* Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileTextIcon className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-semibold text-gray-900">
                Generated Cover Letter
              </h2>
            </div>

            {coverLetterData?.coverLetter && lastUpdated && (
              <span className="text-xs text-gray-400">
                Updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
          </div>

          {/* CONTENT */}
          {coverLetterData?.coverLetter ? (
            <>
              <div className="bg-gray-50 border rounded-xl p-8 max-h-[500px] overflow-y-auto text-[15px] leading-relaxed text-gray-800 whitespace-pre-wrap shadow-inner">
                {coverLetterData.coverLetter}
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Words: {wordCount}</span>
                <span>Characters: {charCount}</span>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={downloadCoverLetter}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>

                <Button
                  onClick={copyCoverLetter}
                  variant={copied ? "default" : "outline"}
                  className={`flex-1 transition-all ${copied ? "bg-green-600 hover:bg-green-600 text-white" : ""
                    }`}
                >
                  {copied ? "✓ Copied Successfully" : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>

                <Button
                  onClick={() => setShowForm(true)}
                  variant="outline"
                  className="flex-1"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Regenerate
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-16 space-y-4 text-gray-500">
              <RocketIcon className="w-10 h-10 mx-auto text-gray-300" />
              <p>No cover letter generated yet.</p>
              <Button variant="outline" onClick={() => setShowForm(true)}>
                Create Cover Letter
              </Button>
            </div>
          )}
        </div>

        {/* RIGHT SECTION */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm space-y-7 h-fit">

          <div className="flex items-center gap-3">
            <InfoCircledIcon className="w-5 h-5 text-neutral-500" />
            <h3 className="font-semibold text-lg text-neutral-900">
              Cover Letter Info
            </h3>
          </div>

          <div className="flex items-center gap-2 text-sm text-neutral-600">
            {coverLetterData?.coverLetter ? (
              <>
                <CheckCircledIcon className="w-4 h-4 text-neutral-500" />
                <span>Generated</span>
              </>
            ) : (
              <>
                <ClockIcon className="w-4 h-4 text-neutral-400" />
                <span>Pending</span>
              </>
            )}
          </div>

          <div>
            <p className="font-medium text-neutral-800 mb-3">
              Optimization Tips
            </p>
            <ul className="space-y-2 text-sm text-neutral-600 list-disc pl-5">
              <li>Always customize for each company</li>
              <li>Match keywords from job description</li>
              <li>Keep it under 400 words</li>
              <li>Focus on measurable achievements</li>
              <li>Maintain confident but humble tone</li>
              <li>Avoid generic statements</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-neutral-200 text-xs text-neutral-400 leading-relaxed">
            AI-generated content should be reviewed and proofread before submission.
          </div>

        </div>
      </div>
    </div>
  )
}

export default CoverLetterDetail