"use client"

import React, { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { File, Loader2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

interface Props {
  openResumeUpload: boolean
  setOpenResumeDialog: (open: boolean) => void
}

function ResumeUploadDialog({
  openResumeUpload,
  setOpenResumeDialog,
}: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (openResumeUpload) {
      setFile(null)
    }
  }, [openResumeUpload])

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a valid PDF file")
      return
    }

    setFile(selectedFile)
  }

  const onUploadAndAnalyze = async () => {
    if (!file) {
      alert("Please select a PDF file")
      return
    }

    try {
      setLoading(true)

      const recordId = uuidv4()
      const formData = new FormData()
      formData.append("recordId", recordId)
      formData.append("resumeFile", file)

      await axios.post("/api/ai-resume-agent", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setOpenResumeDialog(false)
      router.push("/ai-tools/ai-resume-analyzer/" + recordId)
    } catch (error: any) {
      alert(
        error?.response?.data?.error ||
        error?.message ||
        "Failed to upload resume"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
  <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
    <DialogContent
      className="
        max-w-md rounded-2xl
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow-lg
      "
    >

      {/* 🔥 Wrap Everything In Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!loading && file) {
            onUploadAndAnalyze()
          }
        }}
      >

        {/* ================= HEADER ================= */}
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Upload Resume (PDF)
          </DialogTitle>

          <DialogDescription className="text-neutral-600 dark:text-neutral-400 text-sm">
            Upload your resume to receive AI-powered analysis and improvement tips.
          </DialogDescription>
        </DialogHeader>

        {/* ================= UPLOAD AREA ================= */}
        <div className="mt-6">
          <label
            htmlFor="resumeUpload"
            className="
              flex flex-col items-center justify-center
              p-8 rounded-xl
              border-2 border-dashed
              border-neutral-300 dark:border-neutral-700
              cursor-pointer
              hover:bg-neutral-50 dark:hover:bg-neutral-800
              transition-all duration-200
            "
          >
            <File className="h-10 w-10 text-neutral-500 mb-3" />

            {file ? (
              <div className="text-center">
                <p className="text-neutral-800 dark:text-neutral-200 font-medium">
                  {file.name}
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Ready to analyze
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-neutral-800 dark:text-neutral-200 font-medium">
                  Click to upload PDF
                </p>
                <p className="text-xs text-neutral-500 mt-1">
                  Only PDF files are supported
                </p>
              </div>
            )}
          </label>

          <input
            type="file"
            id="resumeUpload"
            accept="application/pdf"
            className="hidden"
            onChange={onFileChange}
          />
        </div>

        {/* ================= FOOTER ================= */}
        <DialogFooter className="mt-8 flex gap-3">

          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenResumeDialog(false)}
          >
            Cancel
          </Button>

          {/* 👇 Important: type="submit" */}
          <Button
            type="submit"
            disabled={!file || loading}
            className="
              bg-neutral-900 text-white
              dark:bg-neutral-100 dark:text-black
              font-medium
            "
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Upload & Analyze
              </>
            )}
          </Button>

        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
)
}

export default ResumeUploadDialog