import { ContactManagement } from "@/components/customer-management"

export const metadata = {
  title: "Customer Management - Admin",
  description: "Manage customers",
}

export default function CustomersAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Customers</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage customer accounts and information</p>
      </div>

      <ContactManagement />
    </div>
  )
}
