"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ChatArea } from "@/components/chat-area"
import { ChatStoreProvider } from "@/lib/chat-store"
import { ThemeToggle } from "@/components/theme-toggle"
import { CreateAccountGag } from "@/components/create-account-gag"

export default function Page() {
  return (
    <ChatStoreProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex h-svh flex-1 flex-col overflow-hidden">
          <div className="flex items-center border-b p-2">
            <SidebarTrigger />
            <span className="ml-2 text-sm font-medium">ChadGPT</span>
            <div className="ml-auto flex items-center gap-1">
              <CreateAccountGag />
              <ThemeToggle />
            </div>
          </div>
          <ChatArea />
        </main>
      </SidebarProvider>
    </ChatStoreProvider>
  )
}
