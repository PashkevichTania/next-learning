import { withAuth } from "next-auth/middleware"
import { UserRoles } from "@/types/enums"


const protectedRoutes = ["/gallery", "/profile", "/chat"]

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

export default withAuth(() => {}, {
  pages: {
    signIn: "/auth/signIn",
    signOut: "/",
    error: "/auth/signIn",
  },
  callbacks: {
    authorized: ({ req, token }) => {
      const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
      if (isAdminRoute && (!token || token.role !== UserRoles.Admin)) return false
      const isProtectedRoute = protectedRoutes.some((protectedRoute) =>
        req.nextUrl.pathname.includes(protectedRoute)
      )
      if (isProtectedRoute && !token) return false
      return true
    },
  },
})
