import NextAuth, { SessionStrategy, NextAuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import CredentialsProvider from "next-auth/providers/credentials"
import { refetchToken, signInRequest, signUpRequest } from "@/lib/serverRequests"
import { daysToSeconds } from "@/lib/utils"
import { User } from "@/types/user"
import { PROVIDERS } from "@/types/enums"

export const authOptions: NextAuthOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      authorization: "https://www.facebook.com/v18.0/dialog/oauth?scope=email",
      token: "https://graph.facebook.com/v18.0/oauth/access_token",
      userinfo: {
        params: { fields: "id,name,email,picture" },
      },
    }),
    CredentialsProvider({
      id: PROVIDERS.CREDENTIAL,
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "John Doe" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("No credentials")
        }

        const userCredentials = {
          email: credentials.email,
          password: credentials.password,
        }

        const res = await signInRequest(userCredentials)

        const { user, message } = await res.json()

        if (res.status === 200 && user) {
          return user
        }
        throw new Error(message || "Something went wrong")
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("SIGNIN", { user, account })
      if (account?.provider === PROVIDERS.FACEBOOK) {
        // Update the user object with the long-lived access token
        if (user && account.access_token) user.accessToken = account.access_token
        // Save user to DB if its not saved yet
        const signInUser = user as User
        const response = await signUpRequest({ user: signInUser, provider: PROVIDERS.FACEBOOK })
        const { user: userFromDb, isError } = await response.json()
        if (!isError && userFromDb.role) {
          user.role = userFromDb.role
        }
        return !isError
      }
      return true
    },

    // This callback is called whenever a JSON Web Token is created (i.e. at sign in)
    // or updated (i.e whenever a session is accessed in the client).
    async jwt({ token, user, account }) {
      console.log("JWT", { token, user, account })
      // This will only be executed at login. Each next invocation will skip this part.
      if (user?.accessToken) token.accessToken = user.accessToken
      if (user?.role) token.role = user.role

      // console.log("token: ", token)
      // console.log("token life min: ", (token?.exp - token?.iat) / 60)
      // console.log("date now: ", new Date())
      // console.log("token iat: ", new Date(token.iat * 1000))
      // console.log("token exp: ", new Date(token.exp * 1000))
      // console.log(token.exp && new Date() > new Date(token.exp * 1000 - 60))
      // today > (expDate - 1d), refresh token
      if (token.exp && new Date() > new Date(token.exp * 1000 - daysToSeconds(1))) {
        console.log("token expired:", { now: new Date(), exp: new Date(token.exp * 1000 - 60) })
        const newToken = await refetchToken(token.accessToken)
        token.accessToken = newToken.access_token
        token.iat = Math.floor(Date.now() / 1000)
        token.exp = Math.floor(Date.now() / 1000) + newToken.expires_in
      }

      return token
    },

    // The session callback is called whenever a session is checked.
    async session({ session, token }) {
      console.log("SESSION", { session, token })
      session.user.id = token.sub as string
      session.user.role = token.role as string
      session.accessToken = token.accessToken

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    strategy: "jwt" as SessionStrategy,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: daysToSeconds(30),
  },
  pages: {
    signIn: "/auth/signIn",
    signOut: "/",
    error: "/auth/signIn",
  },
  // debug: process.env.NODE_ENV === "development",
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
