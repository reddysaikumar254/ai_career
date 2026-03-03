"use client";

import ResumeUploadDialog from "@/app/(routes)/dashboard/_components/ResumeUploadDialog";
import React, { useState } from "react";
import {RefreshCcw, Sparkles } from "lucide-react";
import Link from "next/link";

function Report({ aiReport }: any) {
  const [openResumeUpload, setOpenResumeDialog] = useState(false);

  if (!aiReport) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <div className="w-12 h-12 rounded-2xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center mb-4 animate-pulse" />
        <p className="text-neutral-500 dark:text-neutral-400">
          Generating AI Resume Report...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            AI Resume Analysis
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Personalized feedback powered by AI insights
          </p>
        </div>

        <button
          onClick={() => setOpenResumeDialog(true)}
          className="flex items-center gap-2 px-4 py-2 text-sm 
          border border-neutral-300 dark:border-neutral-700
          rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800
          transition text-neutral-800 dark:text-neutral-300"
        >
          <RefreshCcw className="w-4 h-4" />
          Re-analyze
        </button>
      </div>

      {/* ================= OVERALL SCORE ================= */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-neutral-500" />
          <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
            Overall Score
          </h3>
        </div>

        <div className="flex items-center justify-between mb-6">
          <span className="text-5xl font-bold text-neutral-900 dark:text-neutral-100">
            {aiReport.overall_score}
            <span className="text-xl text-neutral-400"> / 100</span>
          </span>

          <span className="text-sm text-neutral-600 dark:text-neutral-400 max-w-xs text-right">
            {aiReport.overall_feedback}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-3 overflow-hidden">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400 transition-all duration-700"
            style={{ width: `${aiReport.overall_score}%` }}
          />
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-5">
          {aiReport.summary_comment}
        </p>
      </div>

      {/* ================= SECTION SCORES ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(aiReport.sections || {}).map(
          ([sectionName, section]: any) => (
            <div
              key={sectionName}
              className="bg-white dark:bg-neutral-900 
              border border-neutral-200 dark:border-neutral-800 
              rounded-xl p-6 shadow-sm transition hover:shadow-md"
            >
              <h4 className="text-md font-medium text-neutral-800 dark:text-neutral-200 capitalize mb-3">
                {sectionName.replace("_", " ")}
              </h4>

              <div className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                {section.score}%
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-3">
                {section.comment}
              </p>
            </div>
          )
        )}
      </div>

      {/* ================= TIPS ================= */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-8 shadow-sm">
        <h3 className="text-lg font-medium text-neutral-800 dark:text-neutral-200 mb-5">
          Tips for Improvement
        </h3>

        <ul className="space-y-4">
          {aiReport.tips_for_improvement?.map(
            (tip: string, index: number) => (
              <li key={index} className="flex gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-neutral-500 mt-2" />
                <span dangerouslySetInnerHTML={{ __html: tip }} />
              </li>
            )
          )}
        </ul>
      </div>

      {/* ================= STRENGTHS & IMPROVEMENTS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-md font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            What’s Good
          </h3>

          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            {aiReport.whats_good?.map(
              (item: string, index: number) => (
                <li key={index} className="flex gap-2">
                  <span className="text-neutral-500">•</span>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-md font-semibold text-neutral-800 dark:text-neutral-200 mb-4">
            Needs Improvement
          </h3>

          <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
            {aiReport.needs_improvement?.map(
              (item: string, index: number) => (
                <li key={index} className="flex gap-2">
                  <span className="text-neutral-500">•</span>
                  {item}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* ================= PREMIUM CTA ================= */}
      <div className="rounded-2xl p-10 text-center 
      bg-neutral-900 text-white 
      shadow-lg">
        <h3 className="text-xl font-semibold mb-3">
          Unlock Advanced Resume Insights
        </h3>
        <p className="text-sm text-neutral-300 mb-6">
          Get ATS optimization, keyword matching, recruiter scoring and job-specific recommendations.
        </p>
        <Link href="/billing">
        <button className="px-6 py-3 bg-white text-black rounded-xl hover:bg-neutral-200 transition font-medium">
          Upgrade to Premium
        </button>
        </Link>
      </div>

      <ResumeUploadDialog
        openResumeUpload={openResumeUpload}
        setOpenResumeDialog={setOpenResumeDialog}
      />
    </div>
  );
}

export default Report;