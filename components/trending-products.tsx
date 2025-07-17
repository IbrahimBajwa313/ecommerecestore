"use client"

import { useEffect, useState } from "react"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"

interface Product {
  _id: string
  name: string
  price: number
  originalPrice?: number
  createdAt: string
  images: string[]
  rating: number
  reviewCount: number
}

export function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 2,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 24 },
      },
    },
    loop: true,
    drag: true,
    created() {
      setLoaded(true)
    },
  })

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch("/api/products?featured=true")
        const data = await res.json()

        const trending: Product[] = data.products
          .sort((a: Product, b: Product) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .slice(0, 10)

        setProducts(trending)
      } catch (err) {
        console.error("Failed to load products", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTrending()
  }, [])

  if (isLoading) {
    return (
      <div className="py-8 w-full flex justify-center">
        <div className="relative w-full max-w-6xl px-4">
          <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-2">
            <span role="img" aria-label="fire">🔥</span> Trending Now
          </h2>
          <div className="flex overflow-x-auto pb-4 gap-[15px] md:gap-[20px] lg:gap-[24px]">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="min-w-[260px] h-[420px] bg-gray-200 rounded-lg animate-pulse blur-sm" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) return null

  return (
    <div className="py-8 w-full flex justify-center">
      <div className="relative w-full max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-2">
          <span role="img" aria-label="fire">🔥</span> Trending Now
        </h2>

        {/* Arrows */}
        {loaded && (
          <>
            <button
              onClick={() => slider.current?.prev()}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800/60 hover:bg-white hover:text-black text-white p-2 rounded-md hidden lg:group-hover:block transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => slider.current?.next()}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800/60 hover:bg-white hover:text-black text-white p-2 rounded-md hidden lg:group-hover:block transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Product Slider */}
        <div ref={sliderRef} className="keen-slider">
          {products.map((product, index) => (
            <div
              key={product._id}
              className="keen-slider__slide group"
              style={{ minWidth: "260px", maxWidth: "260px", height: "100%" }}
            >
              <div className="relative">
                {/* Netflix-style rank number */}
                <div className="absolute top-2 left-2 z-10 text-white font-extrabold text-4xl drop-shadow-lg mix-blend-difference pointer-events-none">
                  {index + 1}
                </div>

                {/* Card content (unrestricted) */}
                <ProductCard
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
