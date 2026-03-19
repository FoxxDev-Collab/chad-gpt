export type Message = {
  id: string
  role: "user" | "chad"
  content: string
  timestamp: Date
}

export type Chat = {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}
