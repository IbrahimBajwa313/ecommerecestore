import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Cart from "@/models/Cart"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const userId = request.headers.get("user-id") || "guest"

    const cart = await Cart.findOne({ user: userId })

    if (!cart) {
      return NextResponse.json({ count: 0 })
    }

    const totalItems = cart.items.reduce((sum: number, item: any) => sum + item.quantity, 0)

    return NextResponse.json({ count: totalItems })
  } catch (error) {
    console.error("Error fetching cart count:", error)
    return NextResponse.json({ count: 0 })
  }
}
