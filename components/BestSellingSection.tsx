"use client"

import React, { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
  slug: string
  rating?: number
}

export default function BestSellingSection() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products?category=everyone-s-favourite")
        if (!res.ok) throw new Error("API error: " + res.status)
        const data = await res.json()
        console.log("check", data)
        setProducts(data.products || [])
      } catch (err) {
        console.error("Failed to fetch best-selling products:", err)
      }
    }

    fetchProducts()
  }, [])

  if (!products.length) return null

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everyone’s Favourite</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Customer-loved picks and best-selling essentials
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={{
                id: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || "/placeholder.svg",
                rating: typeof product.rating === "number" ? product.rating : 4,
                reviews: 0,
                badge: "Best Seller",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
