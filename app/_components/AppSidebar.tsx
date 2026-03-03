"use client"

import React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Layers,
  Inbox,
  Calendar,
  Wallet,
  UserCircle,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

const items = [
  { title: "Workspace", url: "/dashboard", icon: Layers },
  { title: "AI Tools", url: "/ai-tools", icon: Inbox },
  { title: "History", url: "/my-history", icon: Calendar },
  { title: "Billing", url: "/billing", icon: Wallet },
  { title: "Profile", url: "/profile", icon: UserCircle },
]

export function AppSidebar() {
  const path = usePathname()

  return (
    <Sidebar
      className="
        bg-white dark:bg-neutral-900
        border-r border-neutral-200 dark:border-neutral-800
        flex flex-col
      "
    >
      {/* ================= HEADER ================= */}
      <SidebarHeader>
        <div className="px-6 py-8 flex flex-col items-center border-b border-neutral-200 dark:border-neutral-800">
           <Image
              src="/mentorship.png"
              alt="CareerForge Logo"
              width={36}
              height={36}
              className="bg-white rounded-xl p-1 dark:invert"
            />
          <h2 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            CareerForge
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            AI Career Platform
          </p>
        </div>
      </SidebarHeader>

      {/* ================= MENU ================= */}
      <SidebarContent className="flex-1 px-4 py-6">
        <SidebarMenu className="space-y-2">

          {items.map((item) => {
            const isActive = path.startsWith(item.url)

            return (
              <SidebarMenuItem key={item.title}>
                <Link
                  href={item.url}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    transition-all duration-200
                    ${
                      isActive
                        ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-black"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {item.title}
                  </span>
                </Link>
              </SidebarMenuItem>
            )
          })}

        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}