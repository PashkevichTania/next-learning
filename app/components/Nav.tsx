"use client"

import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Nav() {
  const { data: session } = useSession()

  return (
    <header>
      <nav className="navbar bg-base-100 justify-between">
        <div className="navbar-start" />
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/protected/gallery">Gallery</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {session ? (
            <button onClick={() => signOut()}>Sign out</button>
          ) : (
            <button onClick={() => signIn("facebook")}>Sign in</button>
          )}
        </div>
      </nav>
    </header>
  )
}
