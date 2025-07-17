import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const order = await Order.findById(params.id)
      .populate("items.product", "name images")
      .populate("user", "name email")

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ order })
  } catch (error) {
    console.error("Order fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const updateData = await request.json()

    const order = await Order.findByIdAndUpdate(params.id, updateData, { new: true })

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, order })
  } catch (error) {
    console.error("Order update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
