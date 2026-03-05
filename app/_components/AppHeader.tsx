"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState } from "react"
import { useUser, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
function AppHeader() {
  const { user } = useUser()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`
        sticky top-0 z-40 w-full
        transition-all duration-300
        backdrop-blur supports-[backdrop-filter]:bg-white/80
        dark:supports-[backdrop-filter]:bg-neutral-900/80
        border-b
        ${isScrolled
          ? "shadow-sm border-neutral-200 dark:border-neutral-800"
          : "border-neutral-200 dark:border-neutral-800"}
      `}
    >
      <div className="px-6 h-16 flex items-center justify-between">

        {/* ================= LEFT SIDE ================= */}
        <div className="flex items-center gap-4">

          <SidebarTrigger
            className="
              h-10 w-10
              rounded-xl
              bg-neutral-100 dark:bg-neutral-900
              hover:bg-neutral-200 dark:hover:bg-neutral-700
              transition
              flex items-center justify-center
            "
          />

          {/* Always show brand (better UX) */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">

              <Image
                src="/mentorship.png"
                alt="CareerForge Logo"
                width={36}
                height={36}
                className="bg-white rounded-xl p-1 dark:invert"
              />

              <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                CareerForge
              </h2>

            </Link>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-4">

          {user && (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-05 rounded-full ring-2 ring-neutral-200 dark:ring-neutral-700"
                },
              }}
            />
          )}

        </div>
      </div>
    </header>
  )
}

export default AppHeader