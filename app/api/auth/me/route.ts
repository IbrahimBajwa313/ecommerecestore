import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ user: null })
    }

    // Verify and decode token
    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET || "fallback-secret") as any

    // Check if token is expired
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return NextResponse.json({ user: null })
    }

    await connectDB()
    const user = await User.findById(payload.id).select("-password")

    if (!user) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        profile: user.profile,
      },
    })
  } catch (error) {
    console.error("Auth verification error:", error)
    return NextResponse.json({ user: null })
  }
}
