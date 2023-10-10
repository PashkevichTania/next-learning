import NextAuth, { Session } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import { JWT } from "next-auth/jwt"

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
    // jwt({ token, account, user }: { token: JWT; account: any; user: DefaultUser }) {
    //   if (account) {
    //     token.accessToken = account.access_token
    //     token.id = user?.id
    //   }
    //   return token
    // },
    session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id as string
      session.accessToken = token.accessToken

      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
