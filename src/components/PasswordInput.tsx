"use client"

import { useState } from "react"
import { BiSolidHide, BiSolidShow } from "react-icons/bi"
import type { UseFormRegister } from "react-hook-form"

export default function PasswordInput({ register }: { register: UseFormRegister<any> }) {
  const [show, setShow] = useState(false)

  const toggleShow = () => {
    setShow((prevState) => !prevState)
  }

  return (
    <div className="form-control">
      <div className="input-group">
        <input
          {...register("password", {
            required: "Password is required",
            minLength: { message: "Password min length is 6", value: 6 },
          })}
          id="password"
          type={show ? "text" : "password"}
          placeholder="Enter Password"
          className="w-full input input-bordered"
        />
        <button className="btn btn-square btn-primary" type="button" onClick={toggleShow}>
          {show ? <BiSolidHide size={20} /> : <BiSolidShow size={20} />}
        </button>
      </div>
    </div>
  )
}
