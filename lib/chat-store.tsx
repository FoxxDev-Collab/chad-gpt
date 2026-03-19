"use client"

import {
  createContext,
  useCallback,
  useContext,
  useReducer,
  type ReactNode,
} from "react"
import type { Chat, Message } from "./types"

type State = {
  chats: Chat[]
  activeChatId: string | null
}

type Action =
  | { type: "NEW_CHAT" }
  | { type: "SELECT_CHAT"; chatId: string }
  | { type: "DELETE_CHAT"; chatId: string }
  | { type: "ADD_MESSAGE"; chatId: string; message: Message }

function generateId() {
  return crypto.randomUUID()
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "NEW_CHAT": {
      const chat: Chat = {
        id: generateId(),
        title: "New Chat",
        messages: [],
        createdAt: new Date(),
      }
      return {
        chats: [chat, ...state.chats],
        activeChatId: chat.id,
      }
    }
    case "SELECT_CHAT":
      return { ...state, activeChatId: action.chatId }
    case "DELETE_CHAT": {
      const chats = state.chats.filter((c) => c.id !== action.chatId)
      return {
        chats,
        activeChatId:
          state.activeChatId === action.chatId
            ? (chats[0]?.id ?? null)
            : state.activeChatId,
      }
    }
    case "ADD_MESSAGE": {
      return {
        ...state,
        chats: state.chats.map((chat) => {
          if (chat.id !== action.chatId) return chat
          const messages = [...chat.messages, action.message]
          const title =
            chat.messages.length === 0 && action.message.role === "user"
              ? action.message.content.slice(0, 40) +
                (action.message.content.length > 40 ? "..." : "")
              : chat.title
          return { ...chat, messages, title }
        }),
      }
    }
  }
}

type ChatStore = State & {
  newChat: () => void
  selectChat: (id: string) => void
  deleteChat: (id: string) => void
  addMessage: (chatId: string, message: Message) => void
  activeChat: Chat | undefined
}

const ChatStoreContext = createContext<ChatStore | null>(null)

export function ChatStoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    chats: [],
    activeChatId: null,
  })

  const newChat = useCallback(() => dispatch({ type: "NEW_CHAT" }), [])
  const selectChat = useCallback(
    (chatId: string) => dispatch({ type: "SELECT_CHAT", chatId }),
    [],
  )
  const deleteChat = useCallback(
    (chatId: string) => dispatch({ type: "DELETE_CHAT", chatId }),
    [],
  )
  const addMessage = useCallback(
    (chatId: string, message: Message) =>
      dispatch({ type: "ADD_MESSAGE", chatId, message }),
    [],
  )

  const activeChat = state.chats.find((c) => c.id === state.activeChatId)

  return (
    <ChatStoreContext.Provider
      value={{
        ...state,
        newChat,
        selectChat,
        deleteChat,
        addMessage,
        activeChat,
      }}
    >
      {children}
    </ChatStoreContext.Provider>
  )
}

export function useChatStore() {
  const ctx = useContext(ChatStoreContext)
  if (!ctx) throw new Error("useChatStore must be used within ChatStoreProvider")
  return ctx
}
