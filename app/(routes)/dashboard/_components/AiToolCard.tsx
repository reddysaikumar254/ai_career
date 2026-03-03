"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import axios from "axios"
import ResumeUploadDialog from "./ResumeUploadDialog"
import RoadmapGeneratorDialog from "./RoadmapGeneratorDialog"
import { RocketIcon } from "@radix-ui/react-icons"
import { v4 as uuidv4 } from "uuid"

interface TOOL {
  name: string
  desc: string
  icon: string
  button: string
  path: string
}

type AIToolProps = {
  tool: TOOL
}

function AiToolCard({ tool }: AIToolProps) {
  if (!tool) return null

  const id = uuidv4()
  const router = useRouter()

  const [openResumeUpload, setOpenResumeUpload] = useState(false)
  const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false)

  const onClickButton = async () => {
    if (tool.name === "AI Resume Analyzer") {
      setOpenResumeUpload(true)
      return
    }

    if (tool.path === "/ai-tools/ai-roadmap-agent") {
      setOpenRoadmapDialog(true)
      return
    }

    try {
      await axios.post("/api/history", {
        recordId: id,
        content: null,
        aiAgentType: tool.path,
      })

      router.push(tool.path + "/" + id)
    } catch (error: any) {
      alert(
        "Failed to create record: " +
        (error?.response?.data?.error || error?.message)
      )
    }
  }

  return (
    <div
      className="
        h-full
        group relative
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        rounded-2xl
        p-6
        shadow-sm
        hover:shadow-md
        hover:-translate-y-1
        transition-all duration-200
        flex flex-col
      "
    >
      {/* Badge */}
      <div className="
        absolute top-4 right-4
        text-xs px-3 py-1 rounded-full
        bg-neutral-100 dark:bg-neutral-800
        text-neutral-700 dark:text-neutral-300
        flex items-center gap-1
      ">
        <RocketIcon className="w-3 h-3" />
        AI Tool
      </div>

      {/* Content Area (flex-1 makes equal height work) */}
      <div className="flex-1 flex flex-col">

        {/* Icon */}
        <div className="
          p-4 rounded-xl
          bg-neutral-100 dark:bg-neutral-800
          w-fit mb-5
        ">
          <Image
            src={tool.icon}
            alt={tool.name}
            width={40}
            height={40}
          />
        </div>

        {/* Title */}
        <h2 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-neutral-100">
          {tool.name}
        </h2>

        {/* Description (pushes button down automatically) */}
        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-1 leading-relaxed">
          {tool.desc}
        </p>
      </div>

      {/* Button always stays bottom */}
      <Button
        onClick={onClickButton}
        className="
          mt-6
          w-full
          rounded-xl
          bg-neutral-900 text-white
          dark:bg-neutral-100 dark:text-black
          font-medium
          hover:scale-[1.02]
          transition
        "
      >
        {tool.button}
      </Button>

      {/* Dialogs */}
      <ResumeUploadDialog
        openResumeUpload={openResumeUpload}
        setOpenResumeDialog={setOpenResumeUpload}
      />

      <RoadmapGeneratorDialog
        openDialog={openRoadmapDialog}
        setOpenDialog={setOpenRoadmapDialog}
      />
    </div>
  )
}

export default AiToolCard