"use client"

import Link from "next/link"
import { BiLogoFacebook } from "react-icons/bi"
import { signIn } from "next-auth/react"
import { FormEvent, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import PasswordInput from "@/components/PasswordInput"
import { Providers } from "@/types/enums"

export default function SignIp() {
  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const signInWithFacebook = () => {
    setLoading(true)
    signIn(Providers.Facebook)
      .then(() => router.push("/profile"))
      .finally(() => setLoading(false))
  }

  const signInWithCreds = (e: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    e.preventDefault()
    const data = e.target as typeof e.target & {
      email: { value: string }
      password: { value: string }
    }

    const {
      email: { value: email },
      password: { value: password },
    } = data

    console.log({ email, password })

    if (!email || !password) {
      return toast.error("Please fill in required fields")
    }

    signIn(Providers.Credential, {
      email,
      password,
      redirect: false,
    })
      .then((res) => {
        if (res?.error) {
          toast.error(res.error)
        } else {
          router.push("/profile")
        }
      })
      .catch((error) => console.error("Error", error))
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-4">Sign In</h1>
      <form className="space-y-4" onSubmit={signInWithCreds}>
        <div>
          <label className="label" htmlFor="email">
            <span className="text-base label-text">Email</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            className="w-full input input-bordered"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">
            <span className="text-base label-text">Password</span>
          </label>
          <PasswordInput />
        </div>
        <div>
          <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
            {isLoading && <span className="loading loading-spinner" />}
            Sign In
          </button>
        </div>
        <div>
          <span>
            Don&apos;t have an account ?{" "}
            <Link href="/auth/signUp" className="link link-primary">
              Sign Up
            </Link>
          </span>
        </div>
      </form>
      <div className="flex items-center w-full my-4">
        <hr className="w-full" />
        <p className="px-3 ">OR</p>
        <hr className="w-full" />
      </div>
      <div className="my-6 space-y-2">
        <button
          aria-label="Login with Facebook"
          type="button"
          className="btn bg-blue-600 hover:bg-blue-800 w-full"
          onClick={signInWithFacebook}
          disabled={isLoading}
        >
          <BiLogoFacebook size={25} />
          <p>Login with Facebook</p>
        </button>
      </div>
    </div>
  )
}
