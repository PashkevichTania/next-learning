"use client"

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

export default function ClientProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}): React.ReactNode {
  return (
    <SessionProvider session={session} refetchOnWindowFocus>
      {children}
    </SessionProvider>
  )
}
