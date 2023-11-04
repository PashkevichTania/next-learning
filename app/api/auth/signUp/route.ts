import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { Provider } from "@/types"
import { BasicUser, FacebookUser, User } from "@/types/user"
import { PROVIDERS, USER_ROLES } from "@/types/enums"

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
      if (provider === PROVIDERS.FACEBOOK) {
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
      case PROVIDERS.FACEBOOK: {
        const { id: userId, ...fields } = user as FacebookUser

        userData = {
          ...fields,
          userId,
          role: USER_ROLES.USER,
        }
        break
      }
      case PROVIDERS.CREDENTIAL: {
        const { password, name } = user as BasicUser

        const userId = crypto.randomUUID()

        const hashedPassword = await bcrypt.hash(password, 2)

        userData = {
          name,
          email,
          hashedPassword,
          userId,
          role: USER_ROLES.USER,
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
