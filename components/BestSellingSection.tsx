"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

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
    <section className="py-10 bg-pink-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-pink-700 mb-6">
          🏆 Everyone’s Favourite
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product._id}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 group"
            >
              <div className="relative w-full h-48 mb-3 overflow-x-auto flex gap-2 rounded-xl">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative min-w-[50%] h-full rounded-xl overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 min-h-[40px]">
                {product.name}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <span className="text-pink-600 font-bold text-lg">
                  Rs. {product.price}
                </span>
                <Badge variant="outline" className="text-xs">
                  Best Seller
                </Badge>
              </div>
              {product.rating && (
                <div className="flex items-center mt-2 text-yellow-500 text-sm">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span className="ml-1">{product.rating.toFixed(1)}</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
