import { IMessage } from "@/types/socket"
import Image from "next/image"
import { useUserQuery } from "@/hooks/query/useUserQuery"

export default function Message({ msg, isMy }: { msg: IMessage; isMy: boolean }) {
  const { data: user } = useUserQuery(msg.userId)

  return (
    <div className={isMy ? "chat chat-end" : "chat chat-start"}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Image
            src={user?.image || "/avatar.png"}
            alt={user?.name || "User avatar"}
            width={10}
            height={10}
          />
        </div>
      </div>
      <div className="chat-header">{user?.name}</div>
      <div
        className={isMy ? "chat-bubble chat-bubble-primary" : "chat-bubble chat-bubble-secondary"}
      >
        {msg.msg}
      </div>
      <time className="chat-footer text-xs opacity-50">
        {new Date(msg.time).getHours()}:{new Date(msg.time).getMinutes()}
      </time>
    </div>
  )
}
