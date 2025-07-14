import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
console.log('params is',params.id)
    const product = await Product.findById(params.id).populate("category", "name slug").lean()

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }
console.log(product)
    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
