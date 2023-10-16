import prisma from "@/app/lib/prisma"
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

  return Response.json({ users: "" })
}

export async function POST(request: NextRequest) {
  try {
    const { user } = await request.json()
    const { id: userId, ...userData } = user

    const existingUser = await prisma.user.findUnique({
      where: {
        userId,
      },
    })

    if (existingUser) {
      console.log("USER EXISTS")
      return Response.json(`User with id: ${userId} already exists`)
    }
    // User doesn't exist, save the new user
    const newUser = await prisma.user.create({
      data: {
        ...userData,
        userId,
      },
    })
    console.log("USER CREATED")
    return Response.json(`User with id: ${newUser.id} created`)
  } catch (e: { message?: string }) {
    console.error(e)
    return Response.json(e?.message || "something went wrong", { status: 500 })
  }
}
