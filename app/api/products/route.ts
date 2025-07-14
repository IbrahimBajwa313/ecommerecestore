import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const featured = searchParams.get("featured")

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

    // For featured products, you might have a featured field or use high ratings
    if (featured === "true") {
      query.rating = { $gte: 4.5 }
    }

    const skip = (page - 1) * limit

    const products = await Product.find(query)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    const total = await Product.countDocuments(query)
    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
