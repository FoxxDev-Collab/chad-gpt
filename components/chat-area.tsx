"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChatInput } from "@/components/chat-input"
import { ChatMessage } from "@/components/chat-message"
import { useChatStore } from "@/lib/chat-store"
import type { Message } from "@/lib/types"

const SUGGESTIONS = [
  "I forgot my password again, can you reset it?",
  "There's a site down again",
  "An operator can't login for some reason",
  "ePO is blocking something again, how do I fix it?",
  "Did you submit your WAR on Friday?",
  "Nessus flagged a bunch of critical findings, now what?",
  "The STIG scan failed on half the servers",
  "Can you just give me admin access real quick?",
]

export function ChatArea() {
  const { activeChat, addMessage, newChat } = useChatStore()
  const [isTyping, setIsTyping] = useState(false)
  const [streamingContent, setStreamingContent] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)
  const pendingMessageRef = useRef<string | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat?.messages, isTyping, streamingContent])

  const sendMessage = useCallback(
    async (content: string, chatId: string) => {
      const userMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content,
        timestamp: new Date(),
      }
      addMessage(chatId, userMsg)

      setIsTyping(true)
      setStreamingContent("")

      try {
        const apiMessages =
          activeChat?.messages
            .map((m) => ({
              role: (m.role === "chad" ? "assistant" : "user") as
                | "user"
                | "assistant",
              content: m.content,
            }))
            .concat([{ role: "user" as const, content }]) ?? [
            { role: "user" as const, content },
          ]

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: apiMessages }),
        })

        if (!res.ok) throw new Error("API error")

        const reader = res.body?.getReader()
        if (!reader) throw new Error("No reader")

        const decoder = new TextDecoder()
        let fullContent = ""

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split("\n")
          for (const line of lines) {
            if (!line.startsWith("data: ") || line === "data: [DONE]") continue
            try {
              const data = JSON.parse(line.slice(6)) as { text: string }
              fullContent += data.text
              setStreamingContent(fullContent)
            } catch {
              // skip
            }
          }
        }

        const chadMsg: Message = {
          id: crypto.randomUUID(),
          role: "chad",
          content: fullContent,
          timestamp: new Date(),
        }
        addMessage(chatId, chadMsg)
      } catch {
        const errorMsg: Message = {
          id: crypto.randomUUID(),
          role: "chad",
          content:
            "*sighs heavily* Great, even my own chat interface is broken now. Typical. Try again, I guess.",
          timestamp: new Date(),
        }
        addMessage(chatId, errorMsg)
      } finally {
        setIsTyping(false)
        setStreamingContent("")
      }
    },
    [activeChat?.messages, addMessage],
  )

  const handleSend = useCallback(
    (content: string) => {
      if (!activeChat) {
        newChat()
        pendingMessageRef.current = content
        return
      }
      sendMessage(content, activeChat.id)
    },
    [activeChat, newChat, sendMessage],
  )

  useEffect(() => {
    if (pendingMessageRef.current && activeChat) {
      const content = pendingMessageRef.current
      pendingMessageRef.current = null
      sendMessage(content, activeChat.id)
    }
  }, [activeChat, sendMessage])

  const MAX_USER_MESSAGES = 20
  const userMessageCount =
    activeChat?.messages.filter((m) => m.role === "user").length ?? 0
  const isAtLimit = userMessageCount >= MAX_USER_MESSAGES

  // Empty state
  if (!activeChat || activeChat.messages.length === 0) {
    return (
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-8 p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Chad<span className="text-primary">GPT</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              &ldquo;Do I look like ChatGPT???&rdquo;
            </p>
          </div>
          <div className="grid max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="rounded-xl border border-border bg-card p-3 text-left text-sm transition-colors hover:bg-accent"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 p-4">
          {activeChat.messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isTyping && streamingContent && (
            <ChatMessage
              message={{
                id: "streaming",
                role: "chad",
                content: streamingContent,
                timestamp: new Date(),
              }}
            />
          )}
          {isTyping && !streamingContent && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                C
              </div>
              <div className="rounded-2xl bg-muted px-4 py-2.5 text-sm">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce [animation-delay:0.15s]">
                    .
                  </span>
                  <span className="animate-bounce [animation-delay:0.3s]">
                    .
                  </span>
                </span>
              </div>
            </div>
          )}
          {isAtLimit && (
            <div className="mx-auto my-4 max-w-md rounded-xl border border-border bg-muted/50 px-4 py-3 text-center text-sm text-muted-foreground">
              Chad has left the chat. &ldquo;I&apos;m not getting paid enough
              for this. Did you even make a ticket?&rdquo;
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>
      <ChatInput onSend={handleSend} disabled={isTyping || isAtLimit} />
    </div>
  )
}
