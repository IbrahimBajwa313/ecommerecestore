import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export const metadata = {
  title: "Analytics - Admin",
  description: "View store analytics and reports",
}

export default function AnalyticsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Track performance and insights</p>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
