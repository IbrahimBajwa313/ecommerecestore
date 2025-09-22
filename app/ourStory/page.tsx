"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"

export default function OurStoryPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-[#6A45EA]" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-[#F4F2FF] to-white text-gray-800 px-4 py-12 md:px-8 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-[#6A45EA]">
          Our Story: <span className="text-gray-900">The Heart Behind Toddlers World 💫</span>
        </h1>

        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Sometimes, life doesn't go the way others expect – but it goes exactly how it should.
          </p>
          <p>
            After completing high school, I made a bold decision – I chose not to continue my studies. In a family full of highly qualified professionals, this decision broke hearts – including mine. I was told I'd never succeed, that my future would only hold office boy tasks or labour work for my own brothers.
          </p>
          <p>
            Those words hurt deeply. But instead of giving up, I kept them close to my heart as fuel. I started working, trying my hand at different platforms, struggling to earn even a small amount. Day after day, I faced rejections. I was lost, broken, but not finished.
          </p>
          <p>
            After two long years of struggle, I gathered the little savings I had – every single rupee – and decided to believe in something no one else did: myself.
          </p>
          <p>
            That’s when <strong>Toddlers World</strong> was born. With love, vision, and deep intention, I created this store not just to sell baby products, but to build trust with young parents like me, who dream of giving their children the best – without breaking the bank.
          </p>
          <p>
            It’s been just 6 months, and <strong>Alhamdulillah</strong>, Toddlers World is growing rapidly. And now, with the launch of my very own website, I’m more excited than ever to serve you.
          </p>
          <p className="text-[#6A45EA] font-semibold">
            This isn't just a store. This is my story, my dream, and my proof that no matter how many people doubt you — you must never stop believing in yourself.
          </p>
          <p>
            Thank you for being a part of this journey. Your support means the world to me. 🌍❤
          </p>
        </div>
      </motion.div>
    </main>
  )
}
