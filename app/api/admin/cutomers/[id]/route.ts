import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/models/User"
import Order from "@/models/Order"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const customer = await User.findById(params.id).select("-password").lean()

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    // Get order statistics
    const orders = await Order.find({ user: customer._id })
    const orderCount = orders.length
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

    return NextResponse.json({
      ...customer,
      orderCount,
      totalSpent,
    })
  } catch (error) {
    console.error("Error fetching customer:", error)
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const updates = await request.json()

    // If email is being updated, check for duplicates
    if (updates.email) {
      const existingUser = await User.findOne({ email: updates.email, _id: { $ne: params.id } })
      if (existingUser) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 })
      }
    }

    const customer = await User.findByIdAndUpdate(params.id, updates, { new: true }).select("-password")

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Customer updated successfully", customer })
  } catch (error) {
    console.error("Error updating customer:", error)
    return NextResponse.json({ error: "Failed to update customer" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    // Check if customer has orders
    const orderCount = await Order.countDocuments({ user: params.id })
    if (orderCount > 0) {
      return NextResponse.json({ error: "Cannot delete customer with existing orders" }, { status: 400 })
    }

    const customer = await User.findByIdAndDelete(params.id)

    if (!customer) {
      return NextResponse.json({ error: "Customer not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Customer deleted successfully" })
  } catch (error) {
    console.error("Error deleting customer:", error)
    return NextResponse.json({ error: "Failed to delete customer" }, { status: 500 })
  }
}
