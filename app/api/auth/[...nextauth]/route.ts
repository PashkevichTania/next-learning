import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"

export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      userinfo: {
        params: { fields: "id,name,email,picture" },
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      console.log({ token, account, user })
      if (account) {
        token.accessToken = account.access_token
        token.id = user?.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id
      session.accessToken = token.accessToken

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
