import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Get the auth token from cookies
    const authToken = request.cookies.get("auth-token")?.value

    if (!authToken) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    // In a real app, you would verify the token and check if user is admin
    // For now, we'll check if it's the admin token
    try {
      // Simple token validation - in production, use proper JWT verification
      const tokenData = JSON.parse(Buffer.from(authToken, "base64").toString())

      if (tokenData.role !== "admin") {
        // Redirect non-admin users to home page
        return NextResponse.redirect(new URL("/", request.url))
      }
    } catch (error) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
