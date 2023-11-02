"use client"

import Link from "next/link"
import { signOut as NextAuthSignOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const links = [
  { href: "/", title: "Home", isProtected: false, isAdmin: false },
  { href: "/protected/gallery", title: "Gallery", isProtected: true, isAdmin: false },
  { href: "/protected/profile", title: "Profile", isProtected: true, isAdmin: false },
  { href: "/protected/admin", title: "Admin panel", isProtected: true, isAdmin: true },
]
export default function Nav() {
  const { data: session } = useSession()
  const isAdmin = session?.user.role === "ADMIN"
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
            {links.map((link) => {
              const linkElement = (
                <li>
                  <Link href={link.href}>{link.title}</Link>
                </li>
              )
              if (!link.isProtected && !link.isAdmin) return linkElement
              if (link.isProtected && session && !link.isAdmin) return linkElement
              if (link.isAdmin && isAdmin) return linkElement
              return null
            })}
          </ul>
        </div>
        <div className="navbar-end">
          {session ? (
            <button onClick={signOut} className="btn btn-outline btn-accent mr-3 h-10">
              Sign out
            </button>
          ) : (
            <>
              <button onClick={signIn} className="btn btn-outline btn-secondary mr-3 h-10">
                Sign in
              </button>
              <button onClick={signUp} className="btn btn-outline btn-primary mr-3 h-10">
                Sign up
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
