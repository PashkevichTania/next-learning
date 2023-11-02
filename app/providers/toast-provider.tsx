"use client"

import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  )
}
