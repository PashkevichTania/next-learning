"use client"

import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import ChatRoom from "@/components/ChatRoom"

import type { DefaultEventsMap } from "@socket.io/component-emitter"
import type { Socket } from "socket.io-client"

const SERVER_URL = "http://localhost:8080" || process.env.NEXT_PUBLIC_SERVER_URL
export default function Chat() {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null)
  const [roomId, setRoomId] = useState("")

  const handleStartChat = () => {
    console.log("socket", socket)
    if (socket) {
      console.log("join")
      const newRoomId = crypto.randomUUID()
      socket.emit("join_room", roomId || newRoomId)
      setRoomId(newRoomId)
    }
  }

  useEffect(() => {
    console.log("s", SERVER_URL)
    if (SERVER_URL) {
      console.log("connect")
      const socketConnection = io(SERVER_URL, { transports: ["websocket", "polling"] })
      setSocket(socketConnection)
    }
    return () => {
      socket?.close()
    }
  }, [])

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-4">Chat</h1>
      <div>
        <button className="btn btn-primary" disabled={!!roomId} onClick={handleStartChat}>
          start chat
        </button>
        {roomId && socket && <ChatRoom socket={socket} roomId={roomId} />}
      </div>
    </div>
  )
}
