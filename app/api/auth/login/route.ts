import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    // 👇 Create dummy admin if not exists
    const adminEmail = "admin@example.com"
    const adminPassword = "Admin123"

    const existingAdmin = await User.findOne({ email: adminEmail })
    if (!existingAdmin) {
      const hashed = await bcrypt.hash(adminPassword, 10)
      await User.create({
        name: "Admin User",
        email: adminEmail,
        password: hashed,
        role: "admin",
      })
      console.log("✅ Dummy admin created:", adminEmail, "/", adminPassword)
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const user = await User.findOne({ email }).lean()

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const tokenData = {
      userId: user._id,
      email: user.email,
      role: user.role,
      name: user.name,
    }

    const token = Buffer.from(JSON.stringify(tokenData)).toString("base64")

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
