import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { User } from "@/types/user"
import { Provider } from "@/types"

// Get chats for user or all chats for admin
export async function GET(request: NextRequest) {
  try {
    return Response.json({ payload: [] })
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

// add messages to chat
export async function PUT(request: NextRequest) {
  return Response.json({ payload: [] })
}

// delete chat
export async function DELETE(request: NextRequest) {
  return Response.json({ payload: [] })
}
