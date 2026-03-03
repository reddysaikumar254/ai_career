"use client"

import { Handle, Position } from "@xyflow/react"
import { ExternalLink } from "lucide-react"
import React from "react"

function TurboNode({ data }: any) {
  return (
    <div
      className="
        group
        w-64 min-h-[140px]
        rounded-2xl
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
        p-5 text-left
      "
      style={{ pointerEvents: "auto" }}
    >

      {/* Title */}
      <div className="
        font-semibold
        text-sm
        text-neutral-900 dark:text-white
        mb-2
        break-words line-clamp-2
      ">
        {data?.title || "Untitled"}
      </div>

      {/* Description */}
      <p className="
        text-xs
        text-neutral-600 dark:text-neutral-400
        leading-relaxed
        break-words line-clamp-4
      ">
        {data?.description || "No description provided."}
      </p>

      {/* Resource Link */}
      {data?.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="
            mt-4
            inline-flex items-center gap-1.5
            text-xs font-medium
            text-neutral-700 dark:text-neutral-300
            hover:text-black dark:hover:text-white
            transition-colors
          "
        >
          View Resource
          <ExternalLink
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      )}

      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        className="
          !w-3 !h-3
          !bg-neutral-400 dark:!bg-neutral-500
          !border-2 !border-white dark:!border-neutral-900
          shadow
        "
      />

      {/* Bottom Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="
          !w-3 !h-3
          !bg-neutral-400 dark:!bg-neutral-500
          !border-2 !border-white dark:!border-neutral-900
          shadow
        "
      />
    </div>
  )
}

export default TurboNode