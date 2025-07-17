"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
}

export function EveryonesFavourite() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [clicked, setClicked] = useState(false)

  const fetchFavouriteDeals = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      const favourites: Product[] = data.products.slice(5, 7)
      setProducts(favourites)
    } catch (err) {
      console.error("Failed to load favourite deals", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClick = () => {
    if (!clicked) {
      setClicked(true)
      fetchFavouriteDeals()
    }
  }

  return (
    <section className="w-full py-10 flex justify-center bg-white dark:bg-black">
      <div className="w-full max-w-6xl px-4">
        {/* Animated Heading */}
        <motion.div
          className={`mb-6 flex items-center gap-2 ${
            clicked ? "justify-start" : "justify-center"
          }`}
          initial={{ justifyContent: "center" }}
          animate={{
            justifyContent: clicked ? "flex-start" : "center",
          }}
          transition={{ duration: 1.2, ease: "linear" }}
        >
          <motion.h2
            initial={{ x: 0 }}
            animate={{ x: clicked ? -10 : 0 }}
            transition={{ duration: 1.3, ease: "linear" }}
            className="text-2xl md:text-3xl font-black flex items-center gap-2 text-black dark:text-white"
          >
            <span role="img" aria-label="star">⭐</span>
            Everyone’s Favourite
          </motion.h2>
        </motion.div>

        {/* Shimmer Prompt */}
        {!clicked && (
          <motion.div
            onClick={handleClick}
            className="text-lg font-medium text-gray-700 dark:text-gray-300 text-center cursor-pointer mb-10"
            animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{
              backgroundImage: "linear-gradient(90deg, transparent, #aaa, transparent)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Click to check what everyone loves →
          </motion.div>
        )}

        {/* Content / Placeholder */}
        <AnimatePresence>
          {clicked ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {isLoading ? (
                [...Array(2)].map((_, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-gray-200 dark:bg-gray-700 h-72 animate-pulse blur-sm"
                  />
                ))
              ) : (
                products.map((product) => (
                  <Link
                    key={product._id}
                    href={`/products/${product._id}`}
                    className="group block rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden bg-white dark:bg-zinc-900"
                  >
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">${product.price}</p>
                    </div>
                  </Link>
                ))
              )}
            </motion.div>
          ) : (
            <motion.div
              key="spacer"
              className="h-[300px] w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
