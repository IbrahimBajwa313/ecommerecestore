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

const PRODUCTS_PER_PAGE = 12

export function ProductGrid({ searchParams }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [searchParams])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (searchParams.category) params.set("category", searchParams.category)
      if (searchParams.search) params.set("search", searchParams.search)
      if (searchParams.minPrice) params.set("minPrice", searchParams.minPrice)
      if (searchParams.maxPrice) params.set("maxPrice", searchParams.maxPrice)

      const response = await fetch(`/api/products?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products)
        setVisibleCount(PRODUCTS_PER_PAGE) // reset when filters change
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_PAGE)
  }

  const visibleProducts = products.slice(0, visibleCount)

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-300 h-64 rounded-lg mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No products found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {visibleProducts.length} of {products.length} products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
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

          {visibleCount < products.length && (
            <div className="flex justify-center mt-6">
        <button
  onClick={handleShowMore}
  className="relative inline-flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-[#7C3DEA] rounded-full shadow-md transition-all duration-300 hover:bg-[#6b32d5] hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7C3DEA] group overflow-hidden"
>
  <span className="relative z-10">Show More</span>
  <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition duration-300 rounded-full" />
</button>

            </div>
          )}
        </>
      )}
    </div>
  )
}
