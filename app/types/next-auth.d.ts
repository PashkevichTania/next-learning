import { DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"

interface CUSTOM_JWT {
  is: string
  accessToken: string
  iat?: number
  exp?: number
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultUser
    accessToken: string
    expires: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT, CUSTOM_JWT {}
}
