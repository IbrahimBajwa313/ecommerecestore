"use client"

import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ThankYouPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4">
      <div className="text-center max-w-lg w-full">
        {loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <Loader2 className="w-10 h-10 animate-spin text-purple-600" />
            <p className="text-lg text-muted-foreground">Processing your order...</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold text-[#9661F1]">Thank You! 🙌</h1>
            <p className="text-muted-foreground text-lg">
              Your order has been placed successfully.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400">
              You’ll receive your parcel in <strong>2–3 working days</strong>.
            </p>

            <Link href="/products" passHref>
              <Button
                variant="outline"
                className="mt-4 border-[#9661F1] text-[#9661F1] hover:bg-[#9661F1]/10 transition"
              >
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}
