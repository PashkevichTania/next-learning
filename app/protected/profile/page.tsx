"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"

export default function Profile() {
  const { data: session } = useSession()

  console.log("session", session)

  return (
    <div className="hero bg-base-200  rounded-lg">
      <div className="hero-content flex-col lg:flex-row-reverse p-8">
        <Image
          width="150"
          height="150"
          src={session?.user.image || ""}
          alt="avatar"
          className="max-w-sm rounded-lg shadow-2xl"
        />
        <div>
          <h2 className="text-2xl font-bold mb-4">Meta User Profile</h2>
          <p className="mb-2">
            <span className="font-bold">User Name:</span> {session?.user.name}
          </p>
          <p className="mb-2">
            <span className="font-bold">User Email:</span> {session?.user.email}
          </p>
        </div>
      </div>
    </div>
  )
}
