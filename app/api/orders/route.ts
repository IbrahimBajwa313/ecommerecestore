import { NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"
import { v4 as uuidv4 } from "uuid"

// CREATE NEW ORDER (POST)
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

    // Validate
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "No items provided." }, { status: 400 })
    }

    if (
      !address?.fullName ||
      !address?.phoneNumber ||
      !address?.street ||
      !address?.city ||
      !address?.zipCode
    ) {
      return NextResponse.json({ error: "Incomplete address information." }, { status: 400 })
    }

    if (
      typeof subtotal !== "number" ||
      typeof tax !== "number" ||
      typeof shipping !== "number" ||
      typeof total !== "number"
    ) {
      return NextResponse.json({ error: "Invalid price calculations." }, { status: 400 })
    }

    const orderNumber = `MS-${uuidv4().split("-")[0].toUpperCase()}`

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

// FETCH ORDERS (GET)
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

// UPDATE ORDER STATUS (PATCH)
export async function PATCH(req: NextRequest) {
  try {
    await connectDB()
    const body = await req.json()
    const { orderId, orderStatus } = body

    if (!orderId || !["pending", "complete", "delete"].includes(orderStatus)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    const order = await Order.findById(orderId)
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    order.orderStatus = orderStatus
    await order.save()

    return NextResponse.json({ success: true, updatedStatus: orderStatus }, { status: 200 })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
