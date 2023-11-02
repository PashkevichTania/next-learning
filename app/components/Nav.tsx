"use client"

import Link from "next/link"
import { signOut as NextAuthSignOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function Nav() {
  const { data: session } = useSession()
  const router = useRouter()

  const signIn = () => {
    router.push("/auth/signIn")
  }

  const signUp = () => {
    router.push("/auth/signUp")
  }

  const signOut = () => {
    NextAuthSignOut()
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
            <button onClick={signOut} className="btn btn-outline btn-secondary mr-3">
              Sign out
            </button>
          ) : (
            <>
              <button onClick={signIn} className="btn btn-outline btn-primary mr-3">
                Sign in
              </button>
              <button onClick={signUp} className="btn btn-outline btn-secondary mr-3">
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
