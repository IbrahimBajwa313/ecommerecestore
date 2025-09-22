// app/admin/user-feedback/page.tsx
import { MessageSquare } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Feedback {
  _id: string
  message: string
  createdAt: string
}

async function getFeedback(): Promise<Feedback[]> {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/feedback`, {
        cache: "no-store",
      })
      

  if (!res.ok) {
    console.error("Failed to fetch feedback")
    return []
  }

  const data = await res.json()
  return data.feedbacks || []
}

export default async function UserFeedbackPage() {
  const feedbacks = await getFeedback()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <MessageSquare className="w-6 h-6" />
        User Feedback
      </h1>

      <div className="grid gap-4">
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedback available.</p>
        ) : (
          feedbacks.map((fb) => (
            <Card key={fb._id}>
              <CardContent className="p-4">
                <p className="text-sm text-gray-800">{fb.message}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(fb.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
