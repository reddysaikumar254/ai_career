"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios"
import React, { useState } from "react"
import { Loader2, FileText } from "lucide-react"
import {
  BackpackIcon,
  PersonIcon,
  FileTextIcon,
} from "@radix-ui/react-icons"
import { useRouter } from "next/navigation"

interface CoverLetterFormProps {
  recordId: string
  onGenerated?: (generatedText: string) => void
}

function CoverLetterForm({ recordId, onGenerated }: CoverLetterFormProps) {

  const router = useRouter() // 🔥 router added

  const [jobTitle, setJobTitle] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [generatedCoverLetter, setGeneratedCoverLetter] = useState("")

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      setError("Please upload a valid PDF file.")
      return
    }

    setResumeFile(file)
    setError("")
  }

  const generateCoverLetter = async () => {
    try {
      setError("")

      if (!jobTitle.trim() || !companyName.trim()) {
        setError("Job title and company name are required.")
        return
      }

      if (!resumeFile) {
        setError("Please upload your resume PDF.")
        return
      }

      setLoading(true)

      const formData = new FormData()
      formData.append("recordId", recordId)
      formData.append("jobTitle", jobTitle)
      formData.append("companyName", companyName)
      formData.append("jobDescription", jobDescription)
      formData.append("resumeFile", resumeFile)

      const result = await axios.post(
        "/api/cover-letter-agent",
        formData
      )

      const generatedText = result.data.coverLetter

      setGeneratedCoverLetter(generatedText)

      if (onGenerated) {
        onGenerated(generatedText)
      }

    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.error ||
        err?.message ||
        "Failed to generate cover letter"

      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow-sm my-8 space-y-8">

      <div className="flex items-center gap-2">
        <FileTextIcon className="w-5 h-5 text-gray-700" />
        <h2 className="text-xl font-semibold text-gray-900">
          Generate Cover Letter
        </h2>
      </div>

      <div className="space-y-6">

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <BackpackIcon className="w-4 h-4" />
            Job Title *
          </label>
          <Input
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="e.g., Software Engineer"
            disabled={loading}
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <PersonIcon className="w-4 h-4" />
            Company Name *
          </label>
          <Input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., Google"
            disabled={loading}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description (optional)"
            disabled={loading}
            className="w-full min-h-[110px] p-3 border rounded-md"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Resume (PDF) *
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={onFileChange}
            className="hidden"
            id="resume-upload"
            disabled={loading}
          />

          <label
            htmlFor="resume-upload"
            className="flex items-center justify-center gap-3 border border-dashed border-gray-300 rounded-md p-5 cursor-pointer hover:bg-gray-50 transition"
          >
            <FileText className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {resumeFile
                ? resumeFile.name
                : "Click to upload your resume"}
            </span>
          </label>
        </div>

        {error && (
          <div className="bg-gray-100 border text-gray-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* 🔥 Buttons Row */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="w-full"
          >
            Cancel
          </Button>

          <Button
            onClick={generateCoverLetter}
            disabled={
              loading ||
              !jobTitle.trim() ||
              !companyName.trim() ||
              !resumeFile
            }
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Cover Letter"
            )}
          </Button>
        </div>

      </div>
    </div>
  )
}

export default CoverLetterForm