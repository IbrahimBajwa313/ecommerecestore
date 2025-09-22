"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, TrendingDown } from "lucide-react"

interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  revenueChange: number
  ordersChange: number
  productsChange: number
  customersChange: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/analytics")
      if (response.ok) {
        const data = await response.json()
        setStats({
          totalRevenue: data.stats.totalRevenue,
          totalOrders: data.stats.totalOrders,
          totalProducts: data.stats.totalProducts,
          totalCustomers: data.stats.totalCustomers,
          revenueChange: Math.random() * 30 - 10, // Mock change percentage
          ordersChange: Math.random() * 25 - 5,
          productsChange: Math.random() * 15 - 2,
          customersChange: Math.random() * 20 - 3,
        })
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="bg-gray-300 h-4 w-20 rounded mb-2"></div>
                <div className="bg-gray-300 h-8 w-24 rounded mb-1"></div>
                <div className="bg-gray-300 h-3 w-32 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const statsData = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: `${stats.revenueChange > 0 ? "+" : ""}${stats.revenueChange.toFixed(1)}% from last month`,
      icon: DollarSign,
      color: "text-green-600",
      trend: stats.revenueChange > 0 ? "up" : "down",
    },
    {
      title: "Orders",
      value: stats.totalOrders.toLocaleString(),
      change: `${stats.ordersChange > 0 ? "+" : ""}${stats.ordersChange.toFixed(1)}% from last month`,
      icon: ShoppingCart,
      color: "text-blue-600",
      trend: stats.ordersChange > 0 ? "up" : "down",
    },
    {
      title: "Products",
      value: stats.totalProducts.toLocaleString(),
      change: `${stats.productsChange > 0 ? "+" : ""}${stats.productsChange.toFixed(1)}% from last month`,
      icon: Package,
      color: "text-purple-600",
      trend: stats.productsChange > 0 ? "up" : "down",
    },
    {
      title: "Customers",
      value: stats.totalCustomers.toLocaleString(),
      change: `${stats.customersChange > 0 ? "+" : ""}${stats.customersChange.toFixed(1)}% from last month`,
      icon: Users,
      color: "text-orange-600",
      trend: stats.customersChange > 0 ? "up" : "down",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
            <div className="flex items-center text-xs mt-1">
              {stat.trend === "up" ? (
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
              )}
              <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>{stat.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
