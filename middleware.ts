import { withAuth } from "next-auth/middleware"
import { USER_ROLES } from "@/types/enums"

// middleware is applied to all routes, use conditionals to select

const protectedRoutes = ["/gallery", "/profile"]

export default withAuth(() => {}, {
  callbacks: {
    authorized: ({ req, token }) => {
      const isAdminRoute = req.nextUrl.pathname.startsWith("/admin")
      if (isAdminRoute && (!token || token.role !== USER_ROLES.ADMIN)) return false
      const isProtectedRoute = protectedRoutes.some((protectedRoute) =>
        req.nextUrl.pathname.includes(protectedRoute)
      )
      if (isProtectedRoute && !token) return false
      return true
    },
  },
})
