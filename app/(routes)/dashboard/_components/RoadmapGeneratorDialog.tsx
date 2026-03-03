"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Sparkles } from "lucide-react"
import { v4 } from "uuid"
import axios from "axios"
import { useRouter } from "next/navigation"

interface Props {
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
}

function RoadmapGeneratorDialog({ openDialog, setOpenDialog }: Props) {
  const [userInput, setUserInput] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const GenerateRoadmap = async () => {
    if (!userInput.trim()) {
      alert("Please enter a position or skill")
      return
    }

    const roadmapId = v4()

    try {
      setLoading(true)

      await axios.post("/api/ai-roadmap-agent", {
        roadmapId,
        userInput: userInput.trim(),
      })

      setOpenDialog(false)
      setUserInput("")
     router.push(`/ai-tools/ai-roadmap-agent/${roadmapId}`)
    } catch (error: any) {
      alert(
        error?.response?.data?.error ||
        error?.message ||
        "Failed to generate roadmap"
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogContent
        className="
          max-w-md rounded-2xl
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          shadow-lg
        "
      >
        {/* ================= HEADER ================= */}
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Generate Career Roadmap
          </DialogTitle>

          <DialogDescription className="text-neutral-600 dark:text-neutral-400 text-sm">
            Enter a role or skill to create a personalized learning roadmap.
          </DialogDescription>
        </DialogHeader>

        {/* ================= INPUT ================= */}
        <div className="mt-6 space-y-3">
          <Input
            placeholder="e.g. Full Stack Developer, Data Science, Cloud DevOps"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="
              border-neutral-300 dark:border-neutral-700
              bg-white dark:bg-neutral-900
              text-black dark:text-white
              placeholder:text-neutral-400 dark:placeholder:text-neutral-500
              caret-black dark:caret-white
              focus-visible:ring-2 focus-visible:ring-neutral-500
            "
          />

          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Your roadmap will include structured skills, tools, and learning resources.
          </p>
        </div>

        {/* ================= FOOTER ================= */}
        <DialogFooter className="mt-8 gap-3">
          <Button
            variant="outline"
            onClick={() => setOpenDialog(false)}
          >
            Cancel
          </Button>

          <Button
            onClick={GenerateRoadmap}
            disabled={loading || !userInput.trim()}
            className="
              bg-neutral-900 text-white
              dark:bg-neutral-100 dark:text-black
              font-medium
            "
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default RoadmapGeneratorDialog