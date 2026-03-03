"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import axios from "axios"
import { Loader2 } from "lucide-react"

export default function AiChatBase() {
  const router = useRouter()

  useEffect(() => {
    const createChat = async () => {
      try {
        const id = uuidv4()

        await axios.post("/api/history", {
          recordId: id,
          content: null,
          aiAgentType: "/ai-tools/ai-chat",
        })

        router.replace("/ai-tools/ai-chat/" + id)
      } catch (error) {
        console.error("Chat creation failed")
      }
    }

    createChat()
  }, [router])

  return (
    <div className="h-[90vh] flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 px-6">
      
      <div className="w-full max-w-md p-10 rounded-3xl 
        bg-white dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        shadow-xl shadow-neutral-200/40 dark:shadow-black/40
        text-center
      ">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800">
            <Loader2 className="h-6 w-6 animate-spin text-neutral-600 dark:text-neutral-300" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-2">
          Preparing Your AI Chat
        </h2>

        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          Setting up your personalized career session...
        </p>

      </div>
    </div>
  )
}