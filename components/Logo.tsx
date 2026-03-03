"use client";
import React from "react";

interface LogoProps {
  width?: number;
  height?: number;
  animated?: boolean;
  className?: string;
}

export default function Logo({
  width = 32,
  height = 32,
  animated = false,
  className = "",
}: LogoProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animated ? "transition-transform duration-300 hover:scale-105" : ""} ${className}`}
    >
      {/* Minimal circular frame */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="currentColor"
        strokeOpacity="0.15"
        strokeWidth="2"
      />

      {/* Forge / upward growth mark */}
      <rect
        x="14"
        y="26"
        width="20"
        height="4"
        rx="1.5"
        fill="currentColor"
      />

      <path
        d="M24 10 L24 22"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M24 10 L20 15 M24 10 L28 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}