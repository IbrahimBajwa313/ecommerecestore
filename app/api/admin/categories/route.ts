import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/models/Category"
import Product from "@/models/Product"

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
        { slug: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    const skip = (page - 1) * limit

    const categories = await Category.find(query)
      .populate("parent", "name slug")
      .sort({ sortOrder: 1, name: 1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Get product count for each category
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({ category: category._id })
        return { ...category, productCount }
      }),
    )

    const total = await Category.countDocuments(query)

    return NextResponse.json({
      categories: categoriesWithCount,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const categoryData = await request.json()

    // Validate required fields
    if (!categoryData.name || !categoryData.slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Check if slug already exists
    const existingCategory = await Category.findOne({ slug: categoryData.slug })
    if (existingCategory) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 })
    }

    // Verify parent category exists if provided
    if (categoryData.parent) {
      const parentCategory = await Category.findById(categoryData.parent)
      if (!parentCategory) {
        return NextResponse.json({ error: "Parent category not found" }, { status: 400 })
      }
    }

    // Create category
    const category = new Category({
      name: categoryData.name,
      slug: categoryData.slug,
      description: categoryData.description,
      image: categoryData.image,
      parent: categoryData.parent || null,
      status: categoryData.status || "active",
      sortOrder: categoryData.sortOrder || 0,
      seoTitle: categoryData.seoTitle,
      seoDescription: categoryData.seoDescription,
    })

    await category.save()

    // Populate parent for response
    await category.populate("parent", "name slug")

    return NextResponse.json({ message: "Category created successfully", category }, { status: 201 })
  } catch (error) {
    console.error("Error creating category:", error)
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 })
  }
}
