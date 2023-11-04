"use client"

import { useState } from "react"
import { BiSolidHide, BiSolidShow } from "react-icons/bi"

export default function PasswordInput() {
  const [show, setShow] = useState(true)

  const toggleShow = () => {
    setShow((prevState) => !prevState)
  }

  return (
    <div className="form-control">
      <div className="input-group">
        <input
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
