import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Product from "@/models/Product"
import Category from "@/models/Category"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const product = await Product.findById(params.id).populate("category", "name slug").lean()

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const productData = await request.json()

    // Validate required fields
    if (!productData.name || !productData.price || !productData.category || !productData.sku) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if SKU already exists (excluding current product)
    const existingProduct = await Product.findOne({
      sku: productData.sku,
      _id: { $ne: params.id },
    })
    if (existingProduct) {
      return NextResponse.json({ error: "SKU already exists" }, { status: 400 })
    }

    // Verify category exists
    const category = await Category.findById(productData.category)
    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 400 })
    }

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(
      params.id,
      {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        originalPrice: productData.originalPrice,
        category: productData.category,
        images: productData.images || [],
        stock: productData.stock,
        sku: productData.sku,
        status: productData.status,
        features: productData.features || [],
        tags: productData.tags || [],
        specifications: productData.specifications || {},
        rating: productData.rating, // ✅ this was missing!
      },
      { new: true },
    )
    .populate("category", "name slug")

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product updated successfully", product: updatedProduct })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const deletedProduct = await Product.findByIdAndDelete(params.id)

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
