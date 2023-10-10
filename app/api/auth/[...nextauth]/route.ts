import NextAuth, { SessionStrategy, NextAuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

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
  ],
  callbacks: {
    jwt({ token }) {
      // Return previous token if the access token has not expired yet

      console.log("token: ", token)
      // today > (expDate - 60s), refresh token
      if (token.exp && new Date() > new Date(token.exp * 1000 - 60)) {
        console.log("s:", { now: new Date(), exp: new Date(token.exp * 1000 - 60) })
      }

      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
