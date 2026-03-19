"use client"

import ReactMarkdown from "react-markdown"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import type { Message } from "@/lib/types"
import { cn } from "@/lib/utils"

export function ChatMessage({ message }: { message: Message }) {
  const isChad = message.role === "chad"

  return (
    <div className={cn("flex gap-3", !isChad && "flex-row-reverse")}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback
          className={cn(
            "text-xs font-bold",
            isChad
              ? "bg-red-600 text-white"
              : "bg-primary text-primary-foreground",
          )}
        >
          {isChad ? "C" : "U"}
        </AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed sm:max-w-[75%]",
          isChad
            ? "bg-muted text-foreground"
            : "bg-primary text-primary-foreground",
        )}
      >
        {isChad ? (
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              ul: ({ children }) => (
                <ul className="mb-2 ml-4 list-disc last:mb-0">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="mb-2 ml-4 list-decimal last:mb-0">{children}</ol>
              ),
              li: ({ children }) => <li className="mb-0.5">{children}</li>,
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-")
                if (isBlock) {
                  return (
                    <code className="my-2 block overflow-x-auto rounded-lg bg-black/20 p-3 font-mono text-xs">
                      {children}
                    </code>
                  )
                }
                return (
                  <code className="rounded bg-black/20 px-1.5 py-0.5 font-mono text-xs">
                    {children}
                  </code>
                )
              },
              pre: ({ children }) => <>{children}</>,
              blockquote: ({ children }) => (
                <blockquote className="my-2 border-l-2 border-foreground/30 pl-3 italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        ) : (
          message.content
        )}
      </div>
    </div>
  )
}
