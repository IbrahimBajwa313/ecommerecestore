import { NextResponse } from "next/server"
import { Contact } from "@/models/contact"
import connectDB from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, subject, category, message } = body

    if (!name || !email || !subject || !category || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    await connectDB()
    const newContact = await Contact.create({ name, email, subject, category, message })

    return NextResponse.json({ message: "Message saved", data: newContact }, { status: 201 })
  } catch (error) {
    console.error("Contact POST error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()
    const contacts = await Contact.find().sort({ createdAt: -1 }) // sorted newest first
    return NextResponse.json({ data: contacts }, { status: 200 })
  } catch (error) {
    console.error("Contact GET error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
