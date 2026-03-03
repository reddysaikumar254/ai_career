"use client"

import { Button } from "@/components/ui/button"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState, useCallback, useRef } from "react"
import { Loader2, Map, Download } from "lucide-react"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import * as htmlToImage from "html-to-image"

import RoadmapCanvas from "../_components/RoadmapCanvas"
import RoadmapGeneratorDialog from "@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog"

function RoadmapResultPage() {
  const { roadmapid } = useParams()
  const router = useRouter()

  const [roadMapDetails, setRoadMapDetails] = useState<any>()
  const [loading, setLoading] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)

  const canvasRef = useRef<HTMLDivElement>(null)

  const fetchRoadmap = useCallback(async () => {
    if (!roadmapid) return

    try {
      const result = await axios.get(
        "/api/history?recordId=" + roadmapid
      )

      setRoadMapDetails(result.data?.content)
    } catch (error) {
      console.error("Fetch error:", error)
    } finally {
      setLoading(false)
    }
  }, [roadmapid])

  useEffect(() => {
    fetchRoadmap()
  }, [fetchRoadmap])

  /* ================= DOWNLOAD FUNCTION ================= */

const downloadImage = async () => {
  if (!canvasRef.current) return

  try {
    // Select ONLY the actual flow viewport
    const viewport = canvasRef.current.querySelector(
      ".react-flow__viewport"
    ) as HTMLElement

    if (!viewport) return

    const dataUrl = await htmlToImage.toPng(viewport, {
      backgroundColor: "#ffffff",
      pixelRatio: 2,
    })

    const link = document.createElement("a")
    link.download = "roadmap.png"
    link.href = dataUrl
    link.click()
  } catch (err) {
    console.error("Download failed:", err)
  }
}

  /* ================= LOADER ================= */

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="bg-white dark:bg-neutral-900 border rounded-2xl p-8 shadow-lg text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-sm text-neutral-500">
            Loading your roadmap...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-8 pt-10 pb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT PANEL */}
        <div className="bg-white dark:bg-neutral-900 border rounded-2xl p-8 shadow-sm space-y-6 h-fit">

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
                dark:text-neutral-400
                dark:hover:bg-neutral-800
                dark:hover:text-white
              "
            >
              <ArrowLeftIcon className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
              Return to AI Tools
            </button>
          </div>

          {/* Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <Map className="w-5 h-5" />
            </div>

            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              {roadMapDetails?.roadmapTitle || "Roadmap"}
            </h2>
          </div>

          {/* Description */}
          <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-4">
            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">
                Description
              </p>
              <p className="mt-2">
                {roadMapDetails?.description || "No description available."}
              </p>
            </div>

            <div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">
                Duration
              </p>
              <p className="mt-1">
                {roadMapDetails?.duration || "Not specified"}
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setOpenDialog(true)}
          >
            + Create New Roadmap
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={downloadImage}
          >
            <Download className="w-4 h-4" />
            Download Roadmap
          </Button>

        </div>

        {/* RIGHT PANEL */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 border rounded-2xl shadow-sm h-[78vh] overflow-hidden">
          {roadMapDetails ? (
            <RoadmapCanvas
              ref={canvasRef}
              initialNodes={roadMapDetails?.initialNodes}
              initialEdges={roadMapDetails?.initialEdges}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400 space-y-3">
              <Map className="w-10 h-10 opacity-40" />
              <p>No roadmap data found</p>
            </div>
          )}
        </div>
      </div>

      <RoadmapGeneratorDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      />
    </div>
  )
}

export default RoadmapResultPage