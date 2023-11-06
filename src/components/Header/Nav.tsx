"use client"

import { useCallback } from "react"
import Link from "next/link"
import { signOut as NextAuthSignOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { UserRoles } from "@/types/enums"
import ThemeButton from "@/components/Header/ThemeButton"

const links = [
  { href: "/", title: "Home", userAccess: null },
  { href: "/gallery", title: "Gallery", userAccess: [UserRoles.User, UserRoles.Admin] },
  { href: "/profile", title: "Profile", userAccess: [UserRoles.User, UserRoles.Admin] },
  { href: "/chat", title: "Chat", userAccess: [UserRoles.User] },
  { href: "/admin", title: "Admin panel", userAccess: [UserRoles.Admin] },
]
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

  const renderLinks = useCallback(
    () =>
      links.map((link) => {
        if (link.userAccess && !link.userAccess.includes(session?.user.role)) return null
        return (
          <li key={link.href} className="mr-2">
            <Link href={link.href} className="bg-base-100 hover:bg-base-300">
              {link.title}
            </Link>
          </li>
        )
      }),
    [session]
  )

  return (
    <header>
      <nav className="navbar bg-neutral">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {renderLinks()}
            </ul>
          </div>
          <ThemeButton />
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">{renderLinks()}</ul>
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
