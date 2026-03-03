"use client";
import React from "react";

interface ScrollingTextProps {
  text?: string;
  speed?: number;
}

export default function ContinuousScrollingText({
  text = "Build Your Career • Master New Skills • AI-Powered Guidance • Achieve Your Goals • ",
  speed = 25,
}: ScrollingTextProps) {
  return (
    <div className="relative w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-y border-neutral-200 dark:border-neutral-800 py-3">

      <style jsx>{`
        @keyframes scroll-continuous {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .scroll-container {
          display: flex;
          width: max-content;
          animation: scroll-continuous ${speed}s linear infinite;
        }

        .scroll-text {
          white-space: nowrap;
          padding-right: 3rem;
          font-weight: 500;
          font-size: 0.95rem;
          color: #404040;
        }

        :global(.dark) .scroll-text {
          color: #d4d4d4;
        }
      `}</style>

      <div className="scroll-container">
        <span className="scroll-text">{text}</span>
        <span className="scroll-text" aria-hidden="true">
          {text}
        </span>
      </div>

      {/* Soft fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-neutral-100 dark:from-neutral-900 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-neutral-100 dark:from-neutral-900 to-transparent pointer-events-none"></div>
    </div>
  );
}