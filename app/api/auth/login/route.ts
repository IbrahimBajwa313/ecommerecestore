import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { email, password } = await request.json()

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      },
      process.env.NEXTAUTH_SECRET || "fallback-secret",
    )

    // Set cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
