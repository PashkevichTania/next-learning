'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname()
  const chats = [{ id: 1 }, { id: 2 }]

  return (
      <div className="flex flex-row w-full h-full">
        <div className="w-1/2">
          <ul className="menu bg-base-200 w-56 h-full">
            <ul className="h-full overflow-auto">
              <li className="menu-title">Chats</li>
              {chats.map(({ id }) => (
                  <li key={id} className="mb-2">
                    <Link
                        href={`/admin/${id}`}
                        className={pathName.includes(id.toString()) ? "active" : ''}
                    >
                      Chat id: {id}
                    </Link>
                  </li>
              ))}
            </ul>
          </ul>
        </div>
        <div className="w-1/2 p-12">
          {children}
        </div>
      </div>
  )
}