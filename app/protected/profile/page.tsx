"use client"

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession()

  return <div>
    <h2 className='text-center font-bold text-xl mb-4'>Meta User Profile</h2>
    <div>
      <p>{session.user.name}</p>
      <p>{session.user.email}</p>
    </div>
    <div className="avatar">
      <div className="w-24 rounded">
        <img src={session?.user.image} alt="avatar" />
      </div>
    </div>
  </div>
}
