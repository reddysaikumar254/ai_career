"use client"

import React from "react"
import { UserProfile } from "@clerk/nextjs"
import { User } from "lucide-react"

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">

          {/* Left Section */}
          <div className="flex items-center gap-4">

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-700 dark:text-neutral-300" />
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Account Settings
              </h1>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                Manage your profile, email, security, and preferences.
              </p>
            </div>

          </div>

        </div>

        {/* ================= PROFILE CARD ================= */}
        <div
          className="
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-800
          rounded-2xl
          p-4 sm:p-6 lg:p-10
          shadow-sm
          "
        >

          {/* Clerk Style Override */}
          <style>{`
            .cl-rootBox,
            .cl-userProfile,
            .cl-userProfilePage {
              width: 100% !important;
              max-width: 100% !important;
            }

            .cl-card {
              border-radius: 16px !important;
              border: 1px solid rgba(0,0,0,0.08) !important;
              box-shadow: none !important;
            }

            .dark .cl-card {
              border: 1px solid rgba(255,255,255,0.08) !important;
            }
          `}</style>

          <UserProfile routing="path" path="/profile" />

        </div>

      </div>
    </div>
  )
}

export default ProfilePage