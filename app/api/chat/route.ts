import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { IChatResponse } from "@/types/socket"

// Get chats for user or all chats for admin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const userId = searchParams.get("userId")

    let allChats: IChatResponse[] = []

    if (userId) {
      allChats = await prisma.chat.findMany({
        where: {
          userId,
        },
        select: {
          id: true,
          userId: true,
          roomId: true,
        },
      })
    } else {
      allChats = await prisma.chat.findMany({
        select: {
          id: true,
          userId: true,
          roomId: true,
        },
      })
    }

    console.log(allChats)

    return Response.json({ payload: allChats })
  } catch (e) {
    const error = e as unknown as { message?: string }
    console.error(e)
    return Response.json({ message: error?.message || "something went wrong" }, { status: 500 })
  }
}

interface RequestData {
  userId: string
  roomId: string
}

// create new chat
export async function POST(request: NextRequest) {
  try {
    const data: RequestData = await request.json()
    console.log("data", data)
    const { roomId, userId } = data

    const newChat = await prisma.chat.create({
      data: {
        roomId,
        user: { connect: { id: userId } },
      },
    })

    console.log("Chat created")
    return Response.json({ chat: newChat })
  } catch (e) {
    const error = e as unknown as { message?: string }
    console.error(e)
    return Response.json({ message: error?.message || "something went wrong" }, { status: 500 })
  }
}
