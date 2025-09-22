import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/models/Category"

export async function GET() {
  try {
    await connectDB()

    const categories = await Category.find({ isActive: true }).sort({ sortOrder: 1, name: 1 }).lean()

    return NextResponse.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
