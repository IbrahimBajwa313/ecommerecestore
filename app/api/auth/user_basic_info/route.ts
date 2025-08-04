import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb" // adjust path to your DB connection
import User from "@/models/User" // adjust path if needed

export async function GET() {
  try {
    await connectDB()

    const customers = await User.find({ role: "customer" }).select("name email")

    return NextResponse.json({ data: customers }, { status: 200 })
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ message: "Failed to fetch users" }, { status: 500 })
  }
}
