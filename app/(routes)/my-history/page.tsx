"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import History from "../dashboard/_components/History"
import {
  ClockIcon,
  ActivityLogIcon,
  BookmarkIcon,
} from "@radix-ui/react-icons"

function MyHistory() {
  const [totalSessions, setTotalSessions] = useState(0)
  const [thisMonth, setThisMonth] = useState(0)
  const [savedSessions, setSavedSessions] = useState(0)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/api/history")
        console.log("API RESPONSE:", res.data)
        const sessions = res.data || []

        // Total Sessions
        setTotalSessions(sessions.length)

        // This Month
        const now = new Date()
        const currentMonth = now.getMonth()
        const currentYear = now.getFullYear()

        const monthlySessions = sessions.filter((item: any) => {
          const date = new Date(item.createdAt)
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          )
        })

        setThisMonth(monthlySessions.length)

        // Saved Sessions
        const saved = sessions.filter(
          (item: any) => item.isSaved === true
        )

        setSavedSessions(saved.length)

      } catch (error) {
        console.error("Error fetching stats:", error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="min-h-screen px-8 py-16 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto space-y-12">

        {/* ================= HEADER ================= */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
            </div>

            <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100">
              Your Activity
            </h1>
          </div>

          <p className="text-neutral-600 dark:text-neutral-400">
            Track and manage all your AI sessions and generated reports.
          </p>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* Total Sessions */}
          <StatCard
            icon={<ActivityLogIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />}
            label="Total Sessions"
            value={totalSessions}
          />

          {/* This Month */}
          <StatCard
            icon={<ClockIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />}
            label="This Month"
            value={thisMonth}
          />

          {/* Saved Sessions */}
          <StatCard
            icon={<BookmarkIcon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />}
            label="Saved Sessions"
            value={savedSessions}
          />

        </div>

        {/* ================= HISTORY ================= */}
        <div>
          <History />
        </div>

      </div>
    </div>
  )
}

/* ================= REUSABLE CARD ================= */

function StatCard({ icon, label, value }: any) {
  return (
    <div className="
      bg-white dark:bg-neutral-900
      border border-neutral-200 dark:border-neutral-800
      rounded-2xl p-6 shadow-sm
    ">
      <div className="flex items-center gap-3 mb-3">
        {icon}
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {label}
        </p>
      </div>

      <h3 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        {value}
      </h3>
    </div>
  )
}

export default MyHistory

