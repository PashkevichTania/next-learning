import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"

interface Context {
  params: {
    id: string
  }
}

// get chat room by id
export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = context.params // '1'
    const chatRoom = prisma.chat.findUnique({
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

    return Response.json({ payload: chatRoom })
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
