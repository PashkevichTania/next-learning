import { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      name: string
      id: string
    } & DefaultSession["user"]
    accessToken: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: Account.accessToken
  }
}
