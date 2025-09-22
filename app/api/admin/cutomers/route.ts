import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import Order from "@/models/Order"
import bcrypt from "bcryptjs"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    const skip = (page - 1) * limit

    const customers = await User.find({ role: "customer" }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean()

    // Get order statistics for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const orders = await Order.find({ user: customer._id })
        const orderCount = orders.length
        const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

        return {
          ...customer,
          orderCount,
          totalSpent,
        }
      }),
    )

    const total = await User.countDocuments({ role: "customer" })

    return NextResponse.json({
      customers: customersWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const customerData = await request.json()

    // Validate required fields
    if (!customerData.name || !customerData.email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: customerData.email })
    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    // Hash default password
    const hashedPassword = await bcrypt.hash("password123", 10)

    const customer = new User({
      ...customerData,
      password: hashedPassword,
      role: customerData.role || "customer",
      addresses: [],
    })

    await customer.save()

    // Remove password from response
    const { password, ...customerResponse } = customer.toObject()

    return NextResponse.json({ message: "Customer created successfully", customer: customerResponse }, { status: 201 })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
  }
}
