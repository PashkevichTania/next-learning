import { DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
import { Role } from "@/types/index";

interface CustomJwt {
  accessToken: string
  iat: number
  exp: number
}

interface CustomUser extends DefaultUser {
  accessToken: string
  role: Role
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: CustomUser
    accessToken?: string
    expires: string
  }

  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, CustomJwt {}
}
