import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)

    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const featured = searchParams.get("featured")

    // Default to 12 only if filters are applied; otherwise, return all
    const pageParam = searchParams.get("page")
    const limitParam = searchParams.get("limit")

    const page = pageParam ? Number.parseInt(pageParam) : 1
    const limit = limitParam ? Number.parseInt(limitParam) : 0 // 0 means no limit
    const skip = (page - 1) * limit

    // Build query
    const query: any = { status: "active" }

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category })
      if (categoryDoc) {
        query.category = categoryDoc._id
      }
    }

    if (search) {
      query.$text = { $search: search }
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number.parseFloat(minPrice)
      if (maxPrice) query.price.$lte = Number.parseFloat(maxPrice)
    }

    if (featured === "true") {
      query.rating = { $gte: 5 }
    }

    const productsQuery = Product.find(query)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })

    if (limit > 0) {
      productsQuery.skip(skip).limit(limit)
    }

    const products = await productsQuery.lean()
    const total = await Product.countDocuments(query)

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: limit > 0 ? Math.ceil(total / limit) : 1,
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
