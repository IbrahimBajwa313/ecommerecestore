"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import clsx from "clsx"

export function HeroSection() {
  const images = ["F1.png", "F2.png", "F3.png", "F4.png"]
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [images.length])

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      x: 0,
      opacity: 1,
      position: "relative" as const,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      position: "absolute" as const,
    }),
  }

  const handleDotClick = (idx: number) => {
    if (idx === current) return
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12 lg:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-12 items-center">
          {/* Left Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl lg:text-6xl font-bold leading-tight"
              >
                Discover Premium Baby Essentials 
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                <Link href="/products">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                <Link href="/categories">Browse Categories</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center space-x-8 text-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>7-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Section - Image Carousel */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="relative w-full flex flex-col items-center"
          >
            <div className="relative w-full aspect-[4/5] max-w-[500px] overflow-hidden rounded-2xl ">
              <AnimatePresence custom={direction} mode="popLayout">
                <motion.img
                  key={images[current]}
                  src={`${images[current]}`}
                  alt={`Hero Product ${current + 1}`}
                  className="object-contain w-full h-full rounded-2xl"
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
            </div>

            <div className="flex mt-4 space-x-2">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={clsx(
                    "w-3 h-3 rounded-full transition-all",
                    current === idx ? "bg-white scale-110" : "bg-white/40"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
