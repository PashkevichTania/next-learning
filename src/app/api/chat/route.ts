import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { IChatResponse } from "@/types/socket"
import { serverErrorHandler } from "@/lib/serverErrorHandler"

// Get chats for user or all chats for admin
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl
    const userId = searchParams.get("userId")

    let allChats: Omit<IChatResponse, "messages">[] = []

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

    return Response.json({ payload: allChats })
  } catch (e) {
    serverErrorHandler(e)
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
    const { roomId, userId } = data

    const newChat = await prisma.chat.create({
      data: {
        roomId,
        user: { connect: { id: userId } },
      },
    })

    console.log("POST CHAT", newChat)
    return Response.json({ chat: newChat })
  } catch (e) {
    return serverErrorHandler(e)
  }
}
