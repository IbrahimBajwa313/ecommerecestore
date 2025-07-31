"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

interface Category {
  _id: string
  name: string
  slug: string
  image?: string
  description?: string
}

export function CategorySection() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data.categories.slice(0, 6))
        setHasMore(data.categories.length > 6)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const SectionHeading = () => (
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
      <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
        Explore our diverse range of categories to find exactly what you're looking for
      </p>
    </div>
  )

  if (isLoading) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <SectionHeading />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-300 h-48 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <SectionHeading />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
         <Link key={category._id} href={`/products?category=${category.slug}`}>
         <Card className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
           <CardContent className="p-0">
             <div className="relative w-full h-48">
               <Image
                 src={category.image || "/placeholder.svg?height=200&width=300"}
                 alt={category.name}
                 layout="fill"
                 objectFit="cover"
                 className="group-hover:scale-105 transition-transform duration-300"
               />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
               <div className="absolute inset-0 flex flex-col justify-end items-start text-white px-4 py-3">
                 <h3 className="text-lg font-semibold mb-1 drop-shadow-sm">{category.name}</h3>
                 {category.description && (
                   <p className="text-sm opacity-90 line-clamp-2">{category.description}</p>
                 )}
               </div>
             </div>
           </CardContent>
         </Card>
       </Link>
       
          ))}
        </div>

        {/* Show More Link */}
        {hasMore && (
          <div className="mt-10 text-center">
  <Link
    href="/categories"
    className="relative inline-block px-6 py-2 text-base font-semibold text-white rounded-md bg-gradient-to-r from-[#7C3DEA] to-[#A259FF] transition-all duration-600 hover:from-white hover:to-white hover:text-[#7C3DEA] hover:shadow-xl border border-transparent hover:border-[#7C3DEA] overflow-hidden"
  >
    Show More Categories
  </Link>
</div>

  
        )}
      </div>
    </section>
  )
}
