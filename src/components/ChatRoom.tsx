import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { generateUID } from "@/lib/utils"

import type { DefaultEventsMap } from "@socket.io/component-emitter"
import type { Socket } from "socket.io-client"
import { IMessage } from "@/types/socket"

interface Props {
  roomId: string
  socket: Socket<DefaultEventsMap, DefaultEventsMap>
}

export default function ChatRoom({ roomId, socket }: Props) {
  const { data: session } = useSession()
  const [currentMsg, setCurrentMsg] = useState("")
  const [messages, setMessages] = useState<IMessage[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMsg(e.target.value)
  }

  const handleSend = async () => {
    if (currentMsg !== "") {
      const msgData: IMessage = {
        roomId,
        userName: session?.user.name || "",
        email: session?.user.email || "",
        msg: currentMsg,
        time: new Date(),
        uid: generateUID(),
      }
      await socket.emit("send_msg", msgData)
      setMessages((prev) => [...prev, msgData])
      setCurrentMsg("")
    }
  }

  useEffect(() => {
    socket.on("receive_msg", (data: IMessage) => {
      setMessages((pre) => [...pre, data])
    })
  }, [socket])
  return (
    <div>
      <h2>Room: {roomId}</h2>

      <div>
        {messages.map(({ userName, email, msg, time, uid }) => (
          <div key={uid}>
            <span>{uid}</span>
            <span>{userName}</span>
            <span>{email}</span>
            <span>
              {time.getHours()}:{time.getMinutes()}
            </span>
            <p>{msg}</p>
          </div>
        ))}
      </div>

      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Start messaging"
            className="input input-bordered"
            value={currentMsg}
            onChange={handleChange}
          />
          <button className="btn btn-square" onClick={handleSend}>
            send
          </button>
        </div>
      </div>
    </div>
  )
}
