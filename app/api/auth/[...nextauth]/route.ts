import axios from "axios"
import NextAuth, { SessionStrategy, NextAuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

const refetchToken = async (oldToken: string) => {
  const url = `https://graph.facebook.com/v18.0/oauth/access_token
    ?grant_type=fb_exchange_token
    &client_id=${process.env.FACEBOOK_APP_ID}
    &client_secret=${process.env.FACEBOOK_APP_SECRET}
    &set_token_expires_in_60_days=true
    &fb_exchange_token=${oldToken}`.replace(/\s/g, "")
  const response = await axios.get(url)

  console.log("rrr", response.data)

  return response.data
}

const daysToSeconds = (days: number) => days * 24 * 60 * 60

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
    async signIn({ user, account }) {
      console.log("signin", { user, account })
      if (account && account.provider === "facebook") {
        // Update the user object with the long-lived access token
        if (user && account.access_token) user.accessToken = account.access_token
      }
      return true
    },

    // This callback is called whenever a JSON Web Token is created (i.e. at sign in)
    // or updated (i.e whenever a session is accessed in the client).
    async jwt({ token, user }) {
      if (user?.accessToken) {
        // This will only be executed at login. Each next invocation will skip this part.
        token.accessToken = user.accessToken
        refetchToken(user.accessToken)
      }

      // console.log("token: ", token)
      // console.log("token life min: ", (token?.exp - token?.iat) / 60)
      // console.log("date now: ", new Date())
      // console.log("token iat: ", new Date(token.iat * 1000))
      // console.log("token exp: ", new Date(token.exp * 1000))
      // console.log(token.exp && new Date() > new Date(token.exp * 1000 - 60))
      // today > (expDate - 1d), refresh token
      if (token.exp && new Date() > new Date(token.exp * 1000 - daysToSeconds(1))) {
        console.log("token expired:", { now: new Date(), exp: new Date(token.exp * 1000 - 60) })
        const newToken = await refetchToken(user.accessToken)
        token.accessToken = newToken.access_token
        token.iat = Math.floor(Date.now() / 1000)
        token.exp = Math.floor(Date.now() / 1000) + newToken.expires_in
      }

      return token
    },

    // The session callback is called whenever a session is checked.
    async session({ session, token }) {
      session.user.id = token.sub as string
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
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
