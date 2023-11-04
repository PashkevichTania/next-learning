import prisma from "@/lib/prisma"
import { decode } from "next-auth/jwt"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token")
  const users = await prisma.user.findMany()

  const decoded = await decode({
    token: sessionToken?.value || "",
    secret: process.env.NEXTAUTH_SECRET!,
  })
  console.log("session token", decoded)

  return Response.json({ users })
}
