import { OrderManagement } from "@/components/order-management"

export const metadata = {
  title: "Order Management - Admin",
  description: "Manage customer orders",
}

export default function OrdersAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orders</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage customer orders and fulfillment</p>
      </div>

      <OrderManagement />
    </div>
  )
}
