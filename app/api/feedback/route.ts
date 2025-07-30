import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import Feedback from "@/models/Feedback"
import connectDB from "@/lib/mongodb"

export async function POST(req: NextRequest) {
  await connectDB()

  try {
    const { message } = await req.json()

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const saved = await Feedback.create({ message })
    return NextResponse.json({ success: true, feedback: saved })
  } catch (error) {
    console.error("POST /api/feedback error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  await connectDB()

  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 })
    return NextResponse.json({ success: true, feedbacks })
  } catch (error) {
    console.error("GET /api/feedback error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
