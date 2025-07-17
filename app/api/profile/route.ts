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
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET || "fallback-secret") as any

    await connectDB()
    const user = await User.findById(payload.id).select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Profile fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const payload = jwt.verify(token, process.env.NEXTAUTH_SECRET || "fallback-secret") as any
    const updateData = await request.json()

    await connectDB()
    const user = await User.findByIdAndUpdate(
      payload.id,
      {
        name: updateData.name,
        profile: {
          phone: updateData.phone,
          address: updateData.address,
          city: updateData.city,
          state: updateData.state,
          zipCode: updateData.zipCode,
          country: updateData.country,
        },
      },
      { new: true },
    ).select("-password")

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, user })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
