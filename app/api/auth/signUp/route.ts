import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { BasicUser, FacebookUser, Provider, User } from "@/types"

interface Response {
  user: User
  provider: Provider
}
export async function POST(request: NextRequest) {
  try {
    const data: Response = await request.json()
    const { user, provider } = data

    const { email } = user

    let userFromDb = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userFromDb) {
      if (provider === "facebook") {
        return Response.json({
          message: `User with email: ${email} already exists`,
          isError: false,
          user: userFromDb,
        })
      }
      return Response.json(
        { message: `User with email: ${email} already exists`, isError: true },
        { status: 400 }
      )
    }

    let userData

    switch (provider) {
      case "facebook": {
        const { id: userId, ...fields } = user as FacebookUser

        userData = {
          ...fields,
          userId,
          role: "USER",
        }
        break
      }
      case "credentials": {
        const { password, name } = user as BasicUser

        const userId = crypto.randomUUID()

        const hashedPassword = await bcrypt.hash(password, 2)

        userData = {
          name,
          email,
          hashedPassword,
          userId,
          role: "USER",
        }
        break
      }
      default: {
        return Response.json(
          { message: `Invalid provider: ${provider}`, isError: true },
          { status: 400 }
        )
      }
    }

    userFromDb = await prisma.user.create({
      data: userData,
    })
    console.log("USER CREATED")
    return Response.json({
      message: `User with id: ${userData.userId} created`,
      isError: false,
      user: userFromDb,
    })
  } catch (e) {
    const error = e as unknown as { message?: string }
    console.error(e)
    return Response.json({ message: error?.message || "something went wrong" }, { status: 500 })
  }
}
