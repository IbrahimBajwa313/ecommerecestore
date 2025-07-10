"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Elevate Your <span className="text-[#7D4CFF]">Style</span> with <br className="hidden lg:block" />
              <span className="text-[#7D4CFF]">Handpicked Products</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Discover exclusive fashion, home & lifestyle picks crafted for elegance and everyday luxury.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#7D4CFF] text-white hover:bg-[#6a40e0] rounded-full px-8 py-6 text-lg"
              >
                <Link href="/products">
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-[#7D4CFF] text-[#7D4CFF] hover:bg-[#f3efff] rounded-full px-8 py-6 text-lg"
              >
                <Link href="/categories">Explore Categories</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <Image
                src={
                  "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D&auto=format&fit=crop&w=1740&q=80"
                }
                alt="Hero Product"
                fill
                className="object-cover rounded-3xl shadow-xl"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Updated Background Gradient with purple hues */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1] bg-gradient-to-tr from-[#f7f0ff] via-[#f2e7ff] to-[#f5f1ff]" />
    </section>
  )
}
