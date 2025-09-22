import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"

// ✅ Disable caching
export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await connectDB()

    // Fetch only users with role 'customer', sorted by latest
    const customers = await User.find({ role: "customer" })
      .select("name email createdAt")
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: customers }, { status: 200 })
  } catch (error) {
    console.error("GET /api/auth/user_basic_info error:", error)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}
