"use client"

import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"

export default function FeedbackPopup() {
  const [showModal, setShowModal] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 21000) // Show after 22 seconds
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
        setFeedback("")
        setShowModal(false)
        setShowThankYou(true)
        setTimeout(() => setShowThankYou(false), 3000)
        toast({
          title: "Thank you!",
          description: "Your feedback was successfully submitted.",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to submit feedback.",
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setShowModal(false)}>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-[#7C3DEA]/10">
              <Dialog.Title className="text-xl font-semibold text-[#7C3DEA] mb-2">
                💬 Tell us what's missing in our store!
              </Dialog.Title>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                We're expanding our collection —
                your suggestion could be next! 💡✨
              </p>
              <textarea
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#7C3DEA]"
                placeholder="e.g. Organic newborn diapers, Montessori toys..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
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
      </Transition>

      {showThankYou && (
        <div className="fixed top-20 left-4 z-[110] bg-gradient-to-tr from-[#ff0080] via-[#7928ca] to-[#00cfff] text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in-out text-sm font-medium">
          🎉 Thank you! We appreciate your feedback.
        </div>
      )}
    </>
  )
}
