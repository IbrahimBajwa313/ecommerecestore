// app/api/updateStatus/route.ts
import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { orderId, orderStatus } = body

    if (!orderId || !orderStatus) {
      return NextResponse.json({ error: "Missing orderId or orderStatus" }, { status: 400 })
    }

    await connectDB()

    if (orderStatus === "deleted") {
      const deletedOrder = await Order.findByIdAndDelete(orderId)

      if (!deletedOrder) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, message: "Order deleted" }, { status: 200 })
    } else {
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { orderStatus },
        { new: true }
      )

      if (!updatedOrder) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }

      return NextResponse.json({ success: true, updatedOrder }, { status: 200 })
    }
  } catch (error) {
    console.error("Update order error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Optional: handle other methods
export function GET() {
  return NextResponse.json({ error: "Method GET not allowed" }, { status: 405 })
}

export function PUT() {
  return NextResponse.json({ error: "Method PUT not allowed" }, { status: 405 })
}

export function DELETE() {
  return NextResponse.json({ error: "Method DELETE not allowed" }, { status: 405 })
}
