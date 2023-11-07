"use client"

import { useChatList } from "@/src/hooks/useChatList"
import ChatLayoutComponent from "@/components/Chat/layout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: chatList = [], isLoading } = useChatList()
  console.log(chatList)

  return (
    <ChatLayoutComponent isAdmin chatList={chatList} isLoading={isLoading}>
      {children}
    </ChatLayoutComponent>
  )
}
