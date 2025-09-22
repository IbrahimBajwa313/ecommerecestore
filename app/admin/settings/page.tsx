import { AdminSettings } from "@/components/admin-settings"

export const metadata = {
  title: "Settings - Admin",
  description: "Configure store settings",
}

export default function SettingsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Configure your store settings</p>
      </div>

      <AdminSettings />
    </div>
  )
}
