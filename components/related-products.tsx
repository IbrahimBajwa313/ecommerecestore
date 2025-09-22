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

interface RelatedProductsProps {
  categoryId: string
  currentProductId: string
}

export function RelatedProducts({ categoryId, currentProductId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRelatedProducts()
  }, [categoryId, currentProductId])

  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`/api/products?category=${categoryId}&limit=4`)
      if (response.ok) {
        const data = await response.json()
        // Filter out current product
        const filteredProducts = data.products.filter((p: Product) => p._id !== currentProductId)
        setProducts(filteredProducts.slice(0, 4))
      }
    } catch (error) {
      console.error("Error fetching related products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
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

  if (products.length === 0) {
    return null
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
    </div>
  )
}
