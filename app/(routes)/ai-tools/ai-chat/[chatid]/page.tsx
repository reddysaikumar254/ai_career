"use client"

import React, { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Loader2,
  Send,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Share2,
  RefreshCw,
} from "lucide-react"
import EmptyState from "../_components/EmptyState"
import axios from "axios"
import ReactMarkdown from "react-markdown"
import { useParams, useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import {
  ArrowLeftIcon,
  CopyIcon,
  Link2Icon,
  TwitterLogoIcon,
  LinkedInLogoIcon
} from "@radix-ui/react-icons"
// import { Reddit } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"

type Message = {
  content: string
  role: "user" | "assistant"
  type: string
}

function AiChat() {
  const [userInput, setUserInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [messageList, setMessageList] = useState<Message[]>([])

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [likedIndex, setLikedIndex] = useState<number | null>(null)
  const [dislikedIndex, setDislikedIndex] = useState<number | null>(null)

  const [shareOpen, setShareOpen] = useState(false)
  const [shareContent, setShareContent] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)

  const { chatid }: any = useParams()
  const router = useRouter()
  const bottomRef = useRef<HTMLDivElement | null>(null)

  /* FETCH HISTORY */
  useEffect(() => {
    if (chatid) fetchMessages()
  }, [chatid])

  const fetchMessages = async () => {
    try {
      const result = await axios.get("/api/history?recordId=" + chatid)
      setMessageList(result?.data?.content || [])
    } catch {
      setMessageList([])
    }
  }

  /* AUTO SCROLL */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messageList, loading])

  /* SEND MESSAGE */
  const onSend = async () => {
    if (!userInput.trim()) return

    const userMessage: Message = {
      content: userInput,
      role: "user",
      type: "text",
    }

    setMessageList((prev) => [...prev, userMessage])
    setUserInput("")
    setLoading(true)

    try {
      const result = await axios.post("/api/ai-career-chat-agent", {
        userInput,
      })

      setMessageList((prev) => [
        ...prev,
        {
          content: result.data?.content || "No response",
          role: "assistant",
          type: "text",
        },
      ])
    } catch {
      alert("Failed to get response")
    } finally {
      setLoading(false)
    }
  }

  /* SAVE TO DB */
  useEffect(() => {
    if (messageList.length > 0 && chatid) saveMessages()
  }, [messageList])

  const saveMessages = async () => {
    try {
      await axios.put("/api/history", {
        content: messageList,
        recordId: chatid,
      })
    } catch {
      console.log("Save failed")
    }
  }

  /* NEW CHAT */
  const onNewChat = async () => {
    const id = uuidv4()

    await axios.post("/api/history", {
      recordId: id,
      content: null,
      aiAgentType: "/ai-tools/ai-chat",
    })

    router.replace("/ai-tools/ai-chat/" + id)
  }

  /* ACTIONS */
  const handleCopy = async (text: string, index: number) => {
    await navigator.clipboard.writeText(text)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleLike = (index: number) => {
    setLikedIndex(index)
    setDislikedIndex(null)
  }

  const handleDislike = (index: number) => {
    setDislikedIndex(index)
    setLikedIndex(null)
  }

  const handleShare = (text: string) => {
    setShareContent(text)
    setShareOpen(true)
  }

  const handleRegenerate = async () => {
    const lastUser = [...messageList]
      .reverse()
      .find((m) => m.role === "user")
    if (!lastUser) return

    setLoading(true)
    try {
      const result = await axios.post("/api/ai-career-chat-agent", {
        userInput: lastUser.content,
      })

      setMessageList((prev) => [
        ...prev,
        {
          content: result.data?.content || "No response",
          role: "assistant",
          type: "text",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[92vh] max-w-5xl mx-auto px-6">

      {/* HEADER */}
      <div className="flex items-center justify-between py-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h2 className="font-semibold text-2xl text-neutral-900 dark:text-neutral-100">
            AI Career Assistant
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Personalized career insights powered by AI
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>

          <Button onClick={onNewChat}>
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto py-8 space-y-6">

        {messageList.length === 0 && (
          <EmptyState selectedQuestion={(q: string) => setUserInput(q)} />
        )}

        {messageList.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${message.role === "user" ? "items-end" : "items-start"
              }`}
          >
            <div
              className={`max-w-[75%] px-5 py-4 rounded-2xl text-sm shadow-sm ${message.role === "user"
                  ? "bg-neutral-900 text-white"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border"
                }`}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>

            {message.role === "assistant" && (
              <div className="flex items-center gap-4 mt-2 text-neutral-500 flex-wrap">

                <ThumbsUp
                  onClick={() => handleLike(index)}
                  className={`w-4 h-4 cursor-pointer ${likedIndex === index && "text-green-600"
                    }`}
                />

                <ThumbsDown
                  onClick={() => handleDislike(index)}
                  className={`w-4 h-4 cursor-pointer ${dislikedIndex === index && "text-red-600"
                    }`}
                />

                <div className="flex items-center gap-1 cursor-pointer">
                  <CopyIcon
                    onClick={() => handleCopy(message.content, index)}
                    className={`w-4 h-4 transition ${copiedIndex === index
                        ? "text-green-600"
                        : "hover:text-neutral-800 dark:hover:text-white"
                      }`}
                  />
                  {copiedIndex === index && (
                    <span className="text-xs text-green-600">
                      Copied!
                    </span>
                  )}
                </div>

                <Share2
                  onClick={() => handleShare(message.content)}
                  className="w-4 h-4 cursor-pointer"
                />

                <RefreshCw
                  onClick={handleRegenerate}
                  className="w-4 h-4 cursor-pointer"
                />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-neutral-500">
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating response...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="border-t py-5">
        <div className="flex gap-3">
          <Input
            placeholder="Ask about skills, roadmap, career switch..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
          />
          <Button onClick={onSend} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send />}
          </Button>
        </div>
      </div>

      {/* SHARE DIALOG */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen} >
        <DialogContent
          className="
      max-w-lg
      rounded-3xl
overflow-hidden
      border border-neutral-800
      bg-neutral-900
      text-white
      shadow-2xl
      p-8
    "
        >

          {/* Close Button */}
          <DialogClose className="absolute right-5 top-5 text-neutral-400 hover:text-white transition">

          </DialogClose>

          {/* Header */}
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-left">
              Share Conversation
            </DialogTitle>
            <p className="text-sm text-neutral-400 mt-1">
              Share this AI response with your network
            </p>
          </DialogHeader>

          {/* Divider */}
          <div className="border-t border-neutral-800 mt-5" />

          {/* Preview Card */}
          <div
            className="
        mt-6
        rounded-xl
        border border-neutral-700
        bg-neutral-800/60
        backdrop-blur-xl
        p-6
        text-sm
        relative  
      "
          >
            <div className="max-h-40 overflow-y-auto text-neutral-200 leading-relaxed">
              {shareContent}
            </div>
          </div>

          {/* Share Icons */}
          <div className="flex justify-center items-center gap-10 mt-10">

            {/* Copy */}
            <div
              onClick={async () => {
                await navigator.clipboard.writeText(window.location.href)
                setLinkCopied(true)
                setTimeout(() => setLinkCopied(false), 2000)
              }}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center group-hover:scale-105 transition">
                <Link2Icon className="w-5 h-5 text-black" />
              </div>
              <p className="text-xs mt-3 text-neutral-400">
                {linkCopied ? "Link Copied!" : "Copy link"}
              </p>
            </div>

            {/* X */}
            <div
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    shareContent
                  )}`,
                  "_blank"
                )
              }
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center group-hover:scale-105 transition">
                <TwitterLogoIcon className="w-5 h-5 text-black" />
              </div>
              <p className="text-xs mt-3 text-neutral-400">X</p>
            </div>

            {/* LinkedIn */}
            <div
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    window.location.href
                  )}`,
                  "_blank"
                )
              }
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center group-hover:scale-105 transition">
                <LinkedInLogoIcon className="w-5 h-5 text-black" />
              </div>
              <p className="text-xs mt-3 text-neutral-400">LinkedIn</p>
            </div>

          </div>

        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AiChat