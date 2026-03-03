"use client"

import React, { useMemo, forwardRef } from "react"
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import TurboNode from "./TurboNode"

const nodeTypes = {
  turbo: TurboNode,
}

const RoadmapCanvas = forwardRef<HTMLDivElement, any>(
  ({ initialNodes, initialEdges }, ref) => {

    const nodes = useMemo(() => {
      return (initialNodes || []).map((node: any) => ({
        ...node,
        type: node.type || "turbo",
      }))
    }, [initialNodes])

    return (
      <div
        ref={ref}
        className="w-full h-full p-6 bg-neutral-50 dark:bg-neutral-950 rounded-2xl overflow-hidden"
      >
        <div
          className={`
            w-full h-full
            rounded-2xl overflow-hidden
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            shadow-xl shadow-neutral-200/40 dark:shadow-black/40
          `}
        >
          <ReactFlow
            nodes={nodes}
            edges={initialEdges || []}
            nodeTypes={nodeTypes}
            fitView
            proOptions={{ hideAttribution: true }}
          >

            <MiniMap
              nodeColor={() => "#171717"}
              pannable
              zoomable
              position="top-right"
              className="!z-40 !bg-white dark:!bg-neutral-900 !border !border-neutral-300 dark:!border-neutral-700 !rounded-xl !shadow-lg"
            />

            <Controls
              position="bottom-right"
              showInteractive={false}
              className="!z-50 !bg-white dark:!bg-neutral-900 !border !border-neutral-300 dark:!border-neutral-700 !rounded-xl !shadow-lg"
            />

            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="#d4d4d4"
            />

          </ReactFlow>

          <style jsx global>{`
            .react-flow__controls-button {
              background: white !important;
              color: #171717 !important;
              border-bottom: 1px solid #e5e5e5 !important;
            }

            .dark .react-flow__controls-button {
              background: #171717 !important;
              color: white !important;
              border-bottom: 1px solid #333 !important;
            }

            .react-flow__controls-button svg {
              fill: currentColor !important;
            }

            .react-flow__controls-button:hover {
              background: #f3f4f6 !important;
            }

            .dark .react-flow__controls-button:hover {
              background: #262626 !important;
            }
          `}</style>

        </div>
      </div>
    )
  }
)

RoadmapCanvas.displayName = "RoadmapCanvas"

export default RoadmapCanvas