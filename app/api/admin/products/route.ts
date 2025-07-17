import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "50")
    const search = searchParams.get("search")

    // Build query
    const query: any = {}
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { sku: { $regex: search, $options: "i" } },
      ]
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

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const productData = await request.json()

    // Validate required fields
    if (!productData.name || !productData.price || !productData.category || !productData.sku) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if SKU already exists
    const existingProduct = await Product.findOne({ sku: productData.sku })
    if (existingProduct) {
      return NextResponse.json({ error: "SKU already exists" }, { status: 400 })
    }

    // Verify category exists
    const category = await Category.findById(productData.category)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 400 })
    }

    // Set default images if none provided
    if (!productData.images || productData.images.length === 0) {
      productData.images = ["/placeholder.svg?height=400&width=400"]
    }

    // Create product with all fields
    const product = new Product({
      name: productData.name,
      description: productData.description,
      price: productData.price,
      originalPrice: productData.originalPrice,
      category: productData.category,
      images: productData.images,
      stock: productData.stock,
      sku: productData.sku,
      status: productData.status || "active",
      features: productData.features || [],
      tags: productData.tags || [],
      specifications: productData.specifications || {},
      rating: productData.rating,
      reviewCount: 0,
    })

    await product.save()

    // Populate category for response
    await product.populate("category", "name slug")

    return NextResponse.json({ message: "Product created successfully", product }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
