import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"
import { v4 as uuidv4 } from "uuid"

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const body = await req.json()
    const {
      items,
      address,
      subtotal,
      tax,
      shipping,
      total,
      notes,
    } = body

    // ✅ Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided." }, { status: 400 })
    }

    // ✅ Validate address
    if (
      !address ||
      !address.fullName ||
      !address.phoneNumber ||
      !address.street ||
      !address.city ||
      !address.zipCode
    ) {
      return NextResponse.json({ error: "Incomplete address information." }, { status: 400 })
    }

    // ✅ Validate pricing fields
    if (
      typeof subtotal !== "number" ||
      typeof tax !== "number" ||
      typeof shipping !== "number" ||
      typeof total !== "number"
    ) {
      return NextResponse.json({ error: "Invalid price calculations." }, { status: 400 })
    }

    // ✅ Generate unique order number (e.g., MS-5F3A9C)
    const orderNumber = `MS-${uuidv4().split("-")[0].toUpperCase()}`

    // ✅ Create and save order
    const newOrder = await Order.create({
      orderNumber,
      items,
      address,
      subtotal,
      tax,
      shipping,
      total,
      notes,
      paymentMethod: "cod",
      paymentStatus: "pending",
      orderStatus: "pending",
    })

    return NextResponse.json({ success: true, order: newOrder }, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function GET() {
  try {
    await connectDB()

    const orders = await Order.find().sort({ createdAt: -1 })

    return NextResponse.json({ success: true, orders }, { status: 200 })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
