"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ChatArea } from "@/components/chat-area"
import { ChatStoreProvider } from "@/lib/chat-store"

export default function Page() {
  return (
    <ChatStoreProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          <div className="flex items-center border-b p-2">
            <SidebarTrigger />
            <span className="ml-2 text-sm font-medium">ChadGPT</span>
          </div>
          <ChatArea />
        </main>
      </SidebarProvider>
    </ChatStoreProvider>
  )
}
