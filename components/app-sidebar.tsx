"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ChadLogo } from "@/components/chad-logo"
import { useChatStore } from "@/lib/chat-store"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const { chats, activeChatId, selectChat, deleteChat, newChat } =
    useChatStore()

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <ChadLogo />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          {chats.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton
                asChild
                isActive={chat.id === activeChatId}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => selectChat(chat.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") selectChat(chat.id)
                  }}
                  className="group cursor-pointer"
                >
                  <span className="truncate">{chat.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteChat(chat.id)
                    }}
                    className="ml-auto opacity-0 transition-opacity group-hover:opacity-100"
                    aria-label="Delete chat"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-3.5 w-3.5"
                    >
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        {chats.length === 0 && (
          <p className="px-3 py-6 text-center text-xs text-muted-foreground">
            No chats yet. Go bother Chad.
          </p>
        )}
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Button onClick={newChat} variant="outline" className="w-full">
          + New Chat
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
