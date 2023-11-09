"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { memo, useCallback } from "react"
import { IChatResponse } from "@/types/socket"

interface Props {
  children: React.ReactNode
  isAdmin?: boolean
  chatList: IChatResponse[]
  isLoading: boolean
  handleStartChat?: () => void
}

function ChatLayoutComponent(props: Props) {
  const { children, isAdmin = false, chatList, isLoading, handleStartChat } = props

  const pathName = usePathname()

  const renderChatList = useCallback(() => {
    if (isLoading)
      return (
        <div className="flex justify-center align-center">
          <span className="loading loading-spinner text-primary" />
        </div>
      )

    if (!chatList.length)
      return (
        <div className="flex justify-center align-center">
          <p>{isAdmin ? "No chats yet." : "No chats yet, create new one."}</p>
        </div>
      )

    return chatList.map(({ roomId }) => (
      <li key={roomId} className="mb-2">
        <Link
          href={isAdmin ? `/admin/${roomId}` : `/chat/${roomId}`}
          className={pathName.includes(roomId.toString()) ? "active" : ""}
        >
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">Chat id: {roomId}</span>
        </Link>
      </li>
    ))
  }, [chatList, isAdmin, isLoading, pathName])

  return (
    <div className="flex flex-row w-full h-full">
      <div className="bg-base-200 w-1/4 h-full">
        <ul className="menu w-full">
          <ul className="h-full overflow-auto">
            <li className="menu-title">Chats</li>
            {renderChatList()}
          </ul>
        </ul>
        {!isAdmin && (
          <>
            <div className="divider" />
            <div className="flex justify-center align-center">
              <button className="btn btn-primary h-10" onClick={handleStartChat}>
                Start new chat
              </button>
            </div>
          </>
        )}
      </div>
      <div className="w-3/4 p-12">{children}</div>
    </div>
  )
}

ChatLayoutComponent.defaultProps = {
  isAdmin: false,
  handleStartChat: () => {},
}

export default memo(ChatLayoutComponent)
