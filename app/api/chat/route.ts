import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"

// Get chats for user or all chats for admin
export async function GET(request: NextRequest) {
  try {
    const allChats = await prisma.chat.findMany()

    return Response.json({ payload: allChats })
  } catch (e) {
    const error = e as unknown as { message?: string }
    console.error(e)
    return Response.json({ message: error?.message || "something went wrong" }, { status: 500 })
  }
}

// create new chat

interface RequestData {
  userId: string
  roomId: string
}
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
