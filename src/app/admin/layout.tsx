"use client"

import { useChatListQuery } from "@/src/hooks/query/useChatListQuery"
import ChatLayoutComponent from "@/components/Chat/Layout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: chatList = [], isLoading } = useChatListQuery()

  return (
    <ChatLayoutComponent isAdmin chatList={chatList} isLoading={isLoading}>
      {children}
    </ChatLayoutComponent>
  )
}
