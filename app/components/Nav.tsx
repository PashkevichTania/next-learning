"use client"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function Nav() {
  const { data: session } = useSession()
  const router = useRouter()

  const signin = () => {
    signIn("facebook")
  }

  const signout = () => {
    router.push('/')
    signOut()
  }

  return (
    <header>
      <nav className="navbar bg-base-100 justify-between">
        <div className="navbar-start" />
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/protected/gallery">Gallery</Link>
            </li>
            <li>
              <Link href="/protected/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {session ? (
            <button onClick={signout}>Sign out</button>
          ) : (
            <button onClick={signin}>Sign in</button>
          )}
        </div>
      </nav>
    </header>
  )
}
