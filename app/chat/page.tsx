"use client"

import { useEffect, useRef, useState } from "react"
import ChatRoom from "@/components/ChatRoom"

import type { DefaultEventsMap } from "@socket.io/component-emitter"
import type { Socket } from "socket.io-client"
import SocketSingleton from "@/src/webSocket/socketClientClass"
import { SocketEvents } from "@/types/enums"
import { useSession } from "next-auth/react"

export default function Chat() {
  const { data: session } = useSession()
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>()
  const [roomId, setRoomId] = useState("111")

  const handleStartChat = () => {
    console.log("socket", socketRef.current)
    if (socketRef.current && session) {
      console.log("join")
      const newRoomId = crypto.randomUUID()
      // createChatRequest({ roomId: newRoomId, userId: session.user.id })
      socketRef.current.emit(SocketEvents.JoinRoom, roomId || newRoomId)
      setRoomId(newRoomId)
    }
  }

  useEffect(() => {
    socketRef.current = SocketSingleton.getInstance()
    socketRef.current?.connect()
    return () => {
      socketRef.current?.close()
    }
  }, [])

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-4">Chat</h1>
      <div>
        <button className="btn btn-primary" onClick={handleStartChat}>
          start chat
        </button>
        {roomId && socketRef.current && <ChatRoom socket={socketRef.current} roomId={roomId} />}
      </div>
    </div>
  )
}
