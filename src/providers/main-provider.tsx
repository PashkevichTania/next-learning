"use client"

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { queryClient } from "@/lib/queryClient"

import { ToastContainer } from "react-toastify"

export default function ClientProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: Session | null
}): React.ReactNode {
  return (
    <>
      <SessionProvider session={session} refetchOnWindowFocus>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </SessionProvider>
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
