"use client"

import { Dialog } from "@headlessui/react"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function FeedbackPopup() {
  const [showModal, setShowModal] = useState(false)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 10000) // 20 seconds
    return () => clearTimeout(timer)
  }, [])

  const submitFeedback = async () => {
    if (!feedback.trim()) return
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: feedback }),
      })
      if (res.ok) {
        toast({ title: "Thank you!", description: "Your feedback was submitted." })
        setShowModal(false)
      } else {
        toast({ title: "Error", description: "Failed to submit feedback.", variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Something went wrong.", variant: "destructive" })
    }
  }

  return (
    <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-[100]">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#7C3DEA]/10">
          <Dialog.Title className="text-xl font-semibold text-[#7C3DEA] mb-2">
            💬 What are you looking for?
          </Dialog.Title>
          <p className="text-sm text-gray-600 mb-3">
            Help us improve <strong>ToddlersWorld</strong> by telling us what you’d love to see!
          </p>
          <textarea
            rows={4}
            className="w-full border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7C3DEA]"
            placeholder="e.g. Organic newborn diapers, Montessori toys..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
          <div className="mt-4 flex justify-end gap-2">
            <button
              className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm rounded-md bg-[#7C3DEA] text-white hover:bg-[#6a2fd5] transition"
              onClick={submitFeedback}
            >
              Submit
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
