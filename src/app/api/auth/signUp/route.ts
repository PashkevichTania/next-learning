import { NextRequest } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { Provider } from "@/types"
import { CredentialsUser, FacebookUser, User } from "@/types/user"
import { Providers, UserRoles } from "@/types/enums"
import { serverErrorHandler } from "@/lib/serverErrorHandler"

interface RequestData {
  user: User
  provider: Provider
}
export async function POST(request: NextRequest) {
  try {
    const data: RequestData = await request.json()
    const { user, provider } = data

    const { email } = user

    let userFromDb = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userFromDb) {
      if (provider === Providers.Facebook) {
        return Response.json({
          message: `User with email: ${email} already exists`,
          user: userFromDb,
        })
      }
      return Response.json({ message: `User with email: ${email} already exists` }, { status: 400 })
    }

    let userData

    switch (provider) {
      case Providers.Facebook: {
        const { id: userId, ...fields } = user as FacebookUser

        userData = {
          ...fields,
          facebookUserId: userId,
          role: UserRoles.User,
        }
        break
      }
      case Providers.Credential: {
        const { password, name } = user as CredentialsUser

        const hashedPassword = await bcrypt.hash(password, 2)

        userData = {
          name,
          email,
          hashedPassword,
          role: UserRoles.User,
        }
        break
      }
      default: {
        return Response.json({ message: `Invalid provider: ${provider}` }, { status: 400 })
      }
    }

    userFromDb = await prisma.user.create({
      data: userData,
    })
    console.log("USER CREATED", userFromDb)
    return Response.json({
      message: `User with id: ${userFromDb.id} created`,
      user: userFromDb,
    })
  } catch (e) {
    return serverErrorHandler(e)
  }
}
