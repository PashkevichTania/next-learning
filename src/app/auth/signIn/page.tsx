"use client"

import Link from "next/link"
import { BiLogoFacebook } from "react-icons/bi"
import { signIn } from "next-auth/react"
import { useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import PasswordInput from "@/components/PasswordInput"
import { Providers } from "@/types/enums"
import { SubmitHandler, useForm } from "react-hook-form"

type Inputs = {
  email: string
  password: string
}

export default function SignIp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [isLoading, setLoading] = useState(false)
  const router = useRouter()
  const signInWithFacebook = () => {
    setLoading(true)
    signIn(Providers.Facebook)
      .then(() => router.push("/profile"))
      .finally(() => setLoading(false))
  }

  const signInWithCreds: SubmitHandler<Inputs> = (data) => {
    setLoading(true)

    const { email, password } = data

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
      <form className="space-y-4" onSubmit={handleSubmit(signInWithCreds)}>
        <div>
          <label className="label" htmlFor="email">
            <span className="text-base label-text">Email</span>
          </label>
          <input
            {...register("email", { required: "Email is required" })}
            id="email"
            type="email"
            placeholder="Email Address"
            className="w-full input input-bordered"
          />
          {errors.email && (
            <label className="label" htmlFor="email">
              <span className="label-text-alt text-error">{errors.email.message}</span>
            </label>
          )}
        </div>
        <div>
          <label className="label" htmlFor="password">
            <span className="text-base label-text">Password</span>
          </label>
          <PasswordInput register={register} />
          {errors.password && (
            <label className="label" htmlFor="password">
              <span className="label-text-alt text-error">{errors.password.message}</span>
            </label>
          )}
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
