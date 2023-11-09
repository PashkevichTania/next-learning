import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"

interface Context {
  params: {
    id: string
  }
}

interface RequestData {
  messages: string[]
}

// get chat room by id
export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = context.params // chat id
    const chatRoom = await prisma.chat.findUnique({
      where: {
        roomId: id,
      },
      select: {
        id: true,
        userId: true,
        roomId: true,
        messages: true,
      },
    })

    if (chatRoom) {
      chatRoom.messages = chatRoom.messages.map((msg) => JSON.parse(msg as string))
    }

    return Response.json({ payload: chatRoom })
  } catch (e) {
    const error = e as unknown as { message?: string }
    console.error(e)
    return Response.json({ message: error?.message || "something went wrong" }, { status: 500 })
  }
}

// add messages to chat
export async function PUT(request: NextRequest, context: Context) {
  try {
    const { id } = context.params
    const data: RequestData = await request.json()
    const { messages } = data

    const stringifiedMessages = messages.map((msg) => JSON.stringify(msg))

    const chatRoom = await prisma.chat.update({
      where: {
        roomId: id,
      },
      data: {
        messages: stringifiedMessages || undefined,
      },
    })

    console.log("PUT CHAT", chatRoom)
    return Response.json({ payload: chatRoom })
  } catch (e) {
    const error = e as unknown as { message?: string }
    console.error(e)
    return Response.json({ message: error?.message || "something went wrong" }, { status: 500 })
  }
}

// delete chat
export async function DELETE(request: NextRequest, context: Context) {
  try {
    const { id } = context.params

    const chat = prisma.chat.delete({
      where: {
        roomId: id,
      },
    })

    console.log("DELETE CHAT", chat)
    return Response.json({ payload: chat })
  } catch (e) {
    const error = e as unknown as { message?: string }
    console.error(e)
    return Response.json({ message: error?.message || "something went wrong" }, { status: 500 })
  }
}
