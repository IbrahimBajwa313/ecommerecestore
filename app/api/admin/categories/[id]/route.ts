import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Category from "@/models/Category"
import Product from "@/models/Product"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    const category = await Category.findById(params.id).populate("parent", "name slug").lean()

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error("Error fetching category:", error)
    return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()
    const categoryData = await request.json()

    // Validate required fields
    if (!categoryData.name || !categoryData.slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 })
    }

    // Check if slug already exists (excluding current category)
    const existingCategory = await Category.findOne({
      slug: categoryData.slug,
      _id: { $ne: params.id },
    })
    if (existingCategory) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 400 })
    }

    // Verify parent category exists if provided
    if (categoryData.parent) {
      const parentCategory = await Category.findById(categoryData.parent)
      if (!parentCategory) {
        return NextResponse.json({ error: "Parent category not found" }, { status: 400 })
      }

      // Prevent circular reference
      if (categoryData.parent === params.id) {
        return NextResponse.json({ error: "Category cannot be its own parent" }, { status: 400 })
      }
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      params.id,
      {
        name: categoryData.name,
        slug: categoryData.slug,
        description: categoryData.description,
        image: categoryData.image,
        parent: categoryData.parent || null,
        status: categoryData.status,
        sortOrder: categoryData.sortOrder || 0,
        seoTitle: categoryData.seoTitle,
        seoDescription: categoryData.seoDescription,
      },
      { new: true },
    ).populate("parent", "name slug")

    if (!updatedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Category updated successfully", category: updatedCategory })
  } catch (error) {
    console.error("Error updating category:", error)
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB()

    // Check if category has products
    const productCount = await Product.countDocuments({ category: params.id })
    if (productCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category with ${productCount} products. Move products to another category first.` },
        { status: 400 },
      )
    }

    // Check if category has subcategories
    const subcategoryCount = await Category.countDocuments({ parent: params.id })
    if (subcategoryCount > 0) {
      return NextResponse.json(
        { error: `Cannot delete category with ${subcategoryCount} subcategories. Delete subcategories first.` },
        { status: 400 },
      )
    }

    const deletedCategory = await Category.findByIdAndDelete(params.id)

    if (!deletedCategory) {
      return NextResponse.json({ error: "Category not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Category deleted successfully" })
  } catch (error) {
    console.error("Error deleting category:", error)
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 })
  }
}
