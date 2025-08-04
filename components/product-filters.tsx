"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface Category {
  _id: string
  name: string
  slug: string
}

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [categories, setCategories] = useState<Category[]>([])
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category")?.split(",") || []
  )

  const mobileDropdownRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories")
      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (minPrice) params.set("minPrice", minPrice)
    if (maxPrice) params.set("maxPrice", maxPrice)
    if (selectedCategories.length > 0) {
      params.set("category", selectedCategories.join(","))
    }

    // ✅ Close mobile dropdown if open
    if (mobileDropdownRef.current?.open) {
      mobileDropdownRef.current.removeAttribute("open")
    }

    router.push(`/products?${params.toString()}`)
  }

  const clearFilters = () => {
    setMinPrice("")
    setMaxPrice("")
    setSelectedCategories([])
    router.push("/products")
  }

  const handleCategoryChange = (categorySlug: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categorySlug])
    } else {
      setSelectedCategories(
        selectedCategories.filter((slug) => slug !== categorySlug)
      )
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Price Range</Label>
            <div className="flex space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <Input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Categories</Label>

            {/* Desktop View */}
            <div className="space-y-2 hidden md:block">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`desktop-${category.slug}`}
                    className="border border-[#7C3AED]"
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category.slug, checked as boolean)
                    }
                  />
                  <Label
                    htmlFor={`desktop-${category.slug}`}
                    className="text-sm flex-1 cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>

            {/* Mobile View with Dropdown */}
            <details
              ref={mobileDropdownRef}
              className="block md:hidden border rounded-lg p-2"
            >
              <summary className="cursor-pointer text-sm font-medium">
                Select Categories
              </summary>
              <div className="mt-2 space-y-2">
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`mobile-${category.slug}`}
                      checked={selectedCategories.includes(category.slug)}
                      onCheckedChange={(checked) =>
                        handleCategoryChange(category.slug, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`mobile-${category.slug}`}
                      className="text-sm flex-1 cursor-pointer"
                    >
                      {category.name}
                    </Label>
                  </div>
                ))}
              </div>
            </details>
          </div>

          <div className="flex  space-x-2">
            <Button onClick={applyFilters} className="flex-1 bg-[#7C3AED] hover:bg-[#8B4DF0]">
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearFilters}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
