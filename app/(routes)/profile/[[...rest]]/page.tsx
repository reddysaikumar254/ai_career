"use client"

import React from "react"
import { UserProfile, SignOutButton } from "@clerk/nextjs"
import { LogOut, User } from "lucide-react"

const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 px-8 py-16">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* ================= HEADER ================= */}
        <div className="flex items-start justify-between gap-6 flex-wrap">

          {/* Left Section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              <User className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                Account Settings
              </h1>
              <p className="text-neutral-600 dark:text-neutral-400">
                Manage your profile, email, security, and preferences.
              </p>
            </div>
          </div>

          {/* Right Section - Sign Out */}
          <SignOutButton redirectUrl="/">
            <button
              className="
                flex items-center gap-2
                px-5 py-2.5 rounded-xl
                bg-neutral-900 text-white
                dark:bg-neutral-100 dark:text-black
                font-medium
                hover:scale-105
                transition
              "
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </SignOutButton>

        </div>

        {/* ================= PROFILE CARD ================= */}
        <div
          className="
            bg-white dark:bg-neutral-900
            border border-neutral-200 dark:border-neutral-800
            rounded-2xl p-10 shadow-sm
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