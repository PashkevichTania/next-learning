import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import { serverErrorHandler } from "@/lib/serverErrorHandler"

interface Context {
  params: {
    id: string
  }
}

// get user room by id
export async function GET(request: NextRequest, context: Context) {
  try {
    const { id } = context.params // user id
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    })

    return Response.json({ payload: user })
  } catch (e) {
    return serverErrorHandler(e)
  }
}
