import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Order from "@/models/Order"
import Product from "@/models/Product"
import User from "@/models/User"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30" // days

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - Number.parseInt(period))

    // Get basic stats
    const totalOrders = await Order.countDocuments()
    const totalRevenueResult = await Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }])
    const totalRevenue = totalRevenueResult[0]?.total || 0
    const totalCustomers = await User.countDocuments({ role: "customer" })
    const totalProducts = await Product.countDocuments()

    // Get recent orders for the period
    const recentOrders = await Order.find({
      createdAt: { $gte: startDate },
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()

    // Get sales by month (last 12 months)
    const twelveMonthsAgo = new Date()
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12)

    const salesByMonth = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: twelveMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          revenue: { $sum: "$total" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ])

    // Get top selling products
    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" },
          revenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
        },
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
    ])

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue,
        totalCustomers,
        totalProducts,
      },
      recentOrders,
      salesByMonth,
      topProducts,
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}
