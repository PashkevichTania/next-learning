"use client"

import { signIn, useSession } from "next-auth/react"
import SignIn from "@/app/components/SignIn"

export default function Home() {
  const { data: session } = useSession()

  console.log({ session })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => signIn("facebook", { callbackUrl: "https://localhost:3000" })}>
        Sign in
      </button>
      <SignIn />
    </main>
  )
}
