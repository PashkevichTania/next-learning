"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { generateUID } from "@/lib/utils"


import { IMessage } from "@/types/socket"
import { SocketEvents } from "@/types/enums"
import useSocket from "@/src/hooks/useSocket";
import Message from "@/components/Chat/Message";

interface Props {
  roomId: string
}

const mockMessages:IMessage[] = [
  {
    uid: '11111',
    roomId: "1",
    msg: "some text",
    time: new Date(),
    userId: "6547879bf348049cbca42083",
    userName: "Tania Pashkevich",
  },
  {
    uid: '222222',
    roomId: "1",
    msg: "some text 2",
    time: new Date(),
    userId: "6123",
    userName: "John Doe",
  }
]

export default function Room({ roomId }: Props) {
  const { data: session } = useSession()
  const { socket } = useSocket()

  const [currentMsg, setCurrentMsg] = useState("")
  const [messages, setMessages] = useState<IMessage[]>(mockMessages)

  useEffect(()=>{
    socket.emit(SocketEvents.JoinRoom, roomId)
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMsg(e.target.value)
  }

  const handleSend = async () => {
    if (currentMsg !== "") {
      const msgData: IMessage = {
        roomId,
        userId: session.user.id || "",
        userName: session?.user.name || "",
        msg: currentMsg,
        time: new Date(),
        uid: generateUID(),
      }
      await socket.emit(SocketEvents.SendMessage, msgData)
      setCurrentMsg("")
    }
  }

  useEffect(() => {
    console.log("add resicer")
    console.log("socket", socket)
    socket.on(SocketEvents.ReceiveMessage, (data: IMessage) => {
      console.log("receive_message", data)
      setMessages((prevState) => [...prevState, data])
    })
  }, [socket])
  return (
    <div className="h-full">
      <h2>Chat ID: {roomId}</h2>
      <div className="flex flex-col h-full bg-neutral rounded-xl">
        <div className="overflow-auto">
          {messages.map((msg) => (
              <Message key={msg.uid} msg={msg} isMy={msg.userId === session?.user.id} />
          ))}
        </div>
        <div className="form-control w-full justify-self-end">
          <div className="input-group w-full">
            <input
                type="text"
                placeholder="Start messaging"
                className="input input-bordered w-full"
                value={currentMsg}
                onChange={handleChange}
            />
            <button className="btn btn-primary btn-square" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
