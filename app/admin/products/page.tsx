import { ProductManagement } from "@/components/product-management"

export const metadata = {
  title: "Product Management - Admin",
  description: "Manage your products",
}

export default function ProductsAdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your product catalog</p>
      </div>

      <ProductManagement />
    </div>
  )
}
