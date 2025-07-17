"use client"

import { useEffect, useState } from "react"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Product {
  _id: string
  name: string
  price: number
  createdAt: string
  images: string[]
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
              <div key={index} className="min-w-[220px] md:min-w-[240px] lg:min-w-[260px] flex-shrink-0">
                <div className="bg-gray-200 rounded-lg w-full h-80 animate-pulse blur-sm" />
                <div className="mt-3 bg-gray-200 rounded w-3/4 h-4 animate-pulse blur-sm" />
                <div className="mt-2 bg-gray-200 rounded w-1/2 h-4 animate-pulse blur-sm" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0) return null

  return (
    <div className="py-8 w-full flex justify-center">
      <div className="relative w-full max-w-6xl px-4 group">
        <h2 className="text-2xl md:text-3xl font-black mb-6 flex items-center gap-2">
          <span role="img" aria-label="fire">🔥</span> Trending Now
        </h2>

        {/* Arrows */}
        {loaded && (
          <>
            <button
              onClick={() => slider.current?.prev()}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800/60 hover:bg-white hover:text-black text-white p-2 rounded-md hidden group-hover:block transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => slider.current?.next()}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-gray-800/60 hover:bg-white hover:text-black text-white p-2 rounded-md hidden group-hover:block transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Slider */}
        <div
          ref={sliderRef}
          className="keen-slider cursor-grab active:cursor-grabbing"
        >
          {products.map((product, index) => (
            <div
              key={product._id}
              className="keen-slider__slide relative rounded-lg overflow-hidden"
              style={{ maxWidth: "260px" }}
            >
              <Link href={`/products/${product._id}`}>
                <div className="relative w-full h-80 rounded-md overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Netflix-style Number Badge */}
                  <div className="absolute left-2 top-2 z-10 text-white font-extrabold text-[4rem] leading-none drop-shadow-sm mix-blend-difference pointer-events-none select-none">
                    {index + 1}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
