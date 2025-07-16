import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

// Demo users for testing
const DEMO_USERS = [
  {
    id: "1",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    role: "user",
    name: "Regular User",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Find user in demo users
    const user = DEMO_USERS.find((u) => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create a simple token (in production, use proper JWT)
    const token = Buffer.from(
      JSON.stringify({
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      }),
    ).toString("base64")

    // Set cookie
    const cookieStore = cookies()
    cookieStore.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
      redirectTo: user.role === "admin" ? "/admin" : "/",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
