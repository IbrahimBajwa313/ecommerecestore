"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "@/components/product-card"

interface Product {
  _id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  rating: number
  reviewCount: number
}

interface ProductGridProps {
  searchParams: {
    category?: string
    minPrice?: string
    maxPrice?: string
    search?: string
  }
}

export function ProductGrid({ searchParams }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 0 })

  useEffect(() => {
    fetchProducts()
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams()
      if (searchParams.category) params.set("category", searchParams.category)
      if (searchParams.search) params.set("search", searchParams.search)
      if (searchParams.minPrice) params.set("minPrice", searchParams.minPrice)
      if (searchParams.maxPrice) params.set("maxPrice", searchParams.maxPrice)
      const response = await fetch(`/api/products?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
        setPagination(data.pagination)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Showing {products.length} of {pagination.total} products
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={{
              id: product._id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.images[0],
              rating: product.rating,
              reviews: product.reviewCount,
            }}
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
