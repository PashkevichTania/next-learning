'use client'

import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  const router = useRouter()

  const chats = [{ id: 1 }, { id: 2 }]


  const handleStartChat = () => {
    const newRoomId = crypto.randomUUID()
    // createChatRequest({ roomId: newRoomId, userId: session.user.id })
    router.push(`/chat/${newRoomId}`)
  }

  return (
      <div className="flex flex-row w-full h-full">
        <ul className="menu bg-base-200 w-1/3 h-full">
          <ul className="h-full overflow-auto">
            <li className="menu-title">Chats</li>
            {chats.map(({ id }) => (
                <li key={id} className="mb-2">
                  <Link
                      href={`/chat/${id}`}
                      className={pathName.includes(id.toString()) ? "active" : ''}
                  >
                    Chat id: {id}
                  </Link>
                </li>
            ))}
            <li className="divider"/>
            <li>
              <button className="btn btn-primary h-10" onClick={handleStartChat}>
                Start new chat
              </button>
            </li>
          </ul>
        </ul>
        <div className="w-2/3 p-12">
          {children}
        </div>
      </div>
  )
}