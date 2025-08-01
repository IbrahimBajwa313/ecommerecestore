"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "🌸 How can I track my order?",
    answer: (
      <>
        <a
          href="https://trax.pk/tracking/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4f46e5] dark:text-white underline hover:opacity-80 transition"
        >
          Click here
        </a>{" "}
        and enter your tracking number (sent to you on WhatsApp) to trace your order. Or simply contact our customer support team for assistance.
      </>
    )  },
  {
    question: "🌸 How long does home delivery take?",
    answer: "We deliver all across Pakistan within 3–5 working days."
  },
  {
    question: "🌸 Do you offer a return or exchange policy?",
    answer: "We understand parenthood needs flexibility! That’s why we offer a 7-day free return policy on selected items. Visit our Return Policy page for more details."
  },
  {
    question: "🌸 How do I clean and care for my Toddler World products?",
    answer: "Our products are designed for modern living. Most can be gently hand washed or wiped with mild soap and warm water."
  },
  {
    question: "🌸 Do you offer international shipping?",
    answer: "Currently, we ship only within Pakistan. But we’re working on expanding our delivery worldwide very soon!"
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index))
  }

  return (
    <section className="w-11/12 sm:w-4/5 mx-auto my-16">
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-10 text-primary dark:text-white">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={cn(
              "bg-[#fef6ff] dark:bg-[#1a1a1f] border border-[#e2d5fa] dark:border-white/10 rounded-xl shadow-md transition-all duration-300",
              openIndex === index ? "pb-4" : ""
            )}
          >
            <button
              className="flex items-center justify-between w-full px-5 py-4 text-left"
              onClick={() => toggle(index)}
            >
              <span className="font-medium text-sm sm:text-base text-[#4f46e5] dark:text-white">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-[#4f46e5] dark:text-white transform transition-transform duration-300",
                  openIndex === index ? "rotate-180" : ""
                )}
              />
            </button>
            {openIndex === index && (
              <p className="text-sm text-muted-foreground dark:text-gray-400 px-5 pt-0 pb-3 animate-fade-in">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
