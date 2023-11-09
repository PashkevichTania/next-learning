"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { createChatRequest } from "@/lib/serverRequests"
import ChatLayoutComponent from "@/components/Chat/Layout"
import { queryClient } from "@/lib/queryClient"
import { useChatListQuery } from "@/hooks/query/useChatListQuery"

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const router = useRouter()

  const { data: chatList = [], isLoading } = useChatListQuery(session?.user.id)

  const handleStartChat = useCallback(() => {
    const newRoomId = crypto.randomUUID()
    createChatRequest({ roomId: newRoomId, userId: session?.user.id || "" }).then(() =>
      queryClient.invalidateQueries({ queryKey: ["chats"] })
    )
    router.push(`/chat/${newRoomId}`)
  }, [router, session])

  return (
    <ChatLayoutComponent
      isAdmin={false}
      chatList={chatList}
      isLoading={isLoading}
      handleStartChat={handleStartChat}
    >
      {children}
    </ChatLayoutComponent>
  )
}
