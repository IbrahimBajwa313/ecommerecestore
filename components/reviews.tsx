"use client"

import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const screenshots = [
  "/reviews/1.jpg",
  "/reviews/2.jpg",
  "/reviews/3.jpg",
  "/reviews/4.jpg",
  "/reviews/5.jpg",
  "/reviews/6.jpg",
  "/reviews/7.jpg",
]

export function WhatsappReviewSection() {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 24 },
      },
    },
  })

  const [activeImage, setActiveImage] = useState<string | null>(null)

  // Disable scroll when modal is open
  useEffect(() => {
    if (activeImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [activeImage])

  return (
    <section className="w-full px-4 py-10 md:py-14 bg-white relative z-0">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        What Our Customers Say
      </h2>

      <div className="relative max-w-6xl mx-auto">
        <div ref={sliderRef} className="keen-slider">
          {screenshots.map((src, index) => (
            <div
              key={index}
              className="keen-slider__slide flex justify-center items-center"
            >
              <div
                onClick={() => setActiveImage(src)}
                className="w-[220px] h-[340px] md:w-[240px] md:h-[320px] lg:w-[260px] lg:h-[300px] bg-white rounded-xl overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition"
              >
                <Image
                  src={src}
                  alt={`Review ${index + 1}`}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-gray-100 transition"
          onClick={() => instanceRef.current?.prev()}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow hover:bg-gray-100 transition"
          onClick={() => instanceRef.current?.next()}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              className="relative max-w-[70%] max-h-[70vh] w-auto h-auto"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt="Full Screenshot"
                width={1000}
                height={1400}
                className="w-full h-full object-contain rounded-xl shadow-xl"
              />

              {/* Prominent Close Button */}
              <button
                onClick={() => setActiveImage(null)}
                className="absolute -top-4 -right-4 md:top-4 md:right-4 bg-white text-gray-800 p-3 rounded-full shadow-xl hover:bg-red-500 hover:text-white transition-all z-[101]"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
