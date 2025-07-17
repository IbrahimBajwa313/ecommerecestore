import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Cart from "@/models/Cart"
import Product from "@/models/Product"

// GET - Fetch cart items
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const userId = request.headers.get("user-id") || "guest"

    const cart = await Cart.findOne({ user: userId }).populate({
      path: "items.product",
      select: "name price images stock",
    })

    if (!cart) {
      return NextResponse.json({ items: [] })
    }

    return NextResponse.json(cart)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

// POST - Add item to cart
export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { productId, quantity = 1 } = await request.json()
    const userId = request.headers.get("user-id") || "guest"

    const product = await Product.findById(productId)
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    if (product.stock < quantity) {
      return NextResponse.json({ error: "Insufficient stock" }, { status: 400 })
    }

    let cart = await Cart.findOne({ user: userId })
    if (!cart) {
      cart = new Cart({ user: userId, items: [] })
    }

    const existingItemIndex = cart.items.findIndex(
      (item: { product: any }) => item.product.toString() === productId
    )

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity })
    }

    await cart.save()

    return NextResponse.json({ message: "Item added to cart", cart })
  } catch (error) {
    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 })
  }
}

// PUT - Update item quantity
export async function PUT(request: NextRequest) {
  try {
    await connectDB()
    const { itemId, quantity } = await request.json()
    const userId = request.headers.get("user-id") || "guest"

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    const itemIndex = cart.items.findIndex(
      (item: { _id: any }) => item._id.toString() === itemId
    )

    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found in cart" }, { status: 404 })
    }

    cart.items[itemIndex].quantity = quantity
    await cart.save()

    return NextResponse.json({ message: "Cart updated", cart })
  } catch (error) {
    console.error("Error updating cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}

// DELETE - Remove item from cart or clear entire cart
export async function DELETE(request: NextRequest) {
  try {
    await connectDB()
    const { itemId, clearAll } = await request.json()
    const userId = request.headers.get("user-id") || "guest"

    const cart = await Cart.findOne({ user: userId })
    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 })
    }

    if (clearAll) {
      cart.items = []
    } else if (itemId) {
      cart.items = cart.items.filter(
        (item: { _id: any }) => item._id.toString() !== itemId
      )
    } else {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }

    await cart.save()

    return NextResponse.json({ message: "Cart updated", cart })
  } catch (error) {
    console.error("Error removing from cart:", error)
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 })
  }
}
