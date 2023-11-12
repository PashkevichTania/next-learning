"use client"

import { useCallback, useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { generateUID } from "@/lib/utils"

import { IMessage } from "@/types/socket"
import { SocketEvents } from "@/types/enums"
import useSocket from "@/src/hooks/useSocket"
import Message from "@/components/Chat/Message"

import debounce from "lodash.debounce"
import { updateChatRequest } from "@/lib/serverRequests"
import { useChatDataQuery } from "@/hooks/query/useChatDataQuery"

interface Props {
  roomId: string
}

const updateChatDebounced = debounce(updateChatRequest, 5 * 1000)

export default function Room({ roomId }: Props) {
  const { data: initialData, isLoading } = useChatDataQuery(roomId)
  const { data: session } = useSession()
  const { socket } = useSocket()

  const [currentMsg, setCurrentMsg] = useState("")
  const [messages, setMessages] = useState<IMessage[]>([])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMsg(e.target.value)
  }, [])

  const handleSend = useCallback(async () => {
    if (currentMsg !== "") {
      const msgData: IMessage = {
        roomId,
        userId: session?.user.id || "",
        msg: currentMsg,
        time: new Date(),
        uid: generateUID(),
      }
      await socket.emit(SocketEvents.SendMessage, msgData)
      setMessages((prevState) => [...prevState, msgData])
      setCurrentMsg("")
    }
  }, [currentMsg, roomId, session, socket])

  const renderMessages = useCallback(() => {
    if (isLoading)
      return (
        <div className="h-full flex justify-center items-center">
          <span className="loading loading-infinity loading-lg text-primary" />
        </div>
      )
    if (!messages.length)
      return (
        <div className="h-full flex justify-center items-center">
          <span>No messages yet</span>
        </div>
      )
    return messages.map((msg) => (
      <Message key={msg.uid} msg={msg} isMy={msg.userId === session?.user.id} />
    ))
  }, [isLoading, messages, session?.user.id])

  // Join room on start
  useEffect(() => {
    socket.emit(SocketEvents.JoinRoom, roomId)
  }, [roomId, socket])

  // Add initial messages
  useEffect(() => {
    if (initialData?.messages) {
      setMessages(initialData?.messages)
    }
  }, [initialData?.messages])

  // update messages in DB on new message
  useEffect(() => {
    if (messages.length && messages.length !== initialData?.messages.length) {
      updateChatDebounced({ roomId, messages })
    }
  }, [initialData?.messages.length, messages, roomId])

  // receive message handler
  useEffect(() => {
    // FIXME: WHY IS IT RECEIVING 8 TIMES IN A ROW??????
    socket.on(SocketEvents.ReceiveMessage, (data: IMessage) => {
      setMessages((prevState) => {
        const filteredMessages = new Set([...prevState, data])
        return Array.from(filteredMessages)
      })
    })
  }, [socket])

  return (
    <div className="h-full">
      <h2>Chat ID: {roomId}</h2>
      <div className="flex flex-col h-full bg-neutral rounded-xl">
        <div className="overflow-auto grow">{renderMessages()}</div>
        <div className="form-control w-full">
          <div className="input-group w-full">
            <input
              type="text"
              placeholder="Start messaging"
              className="input input-bordered w-full !rounded-t-none"
              value={currentMsg}
              onChange={handleChange}
            />
            <button className="btn btn-primary btn-square !rounded-t-none" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
