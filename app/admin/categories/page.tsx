import { CategoryManagement } from "@/components/category-management"

export const metadata = {
  title: "Category Management - Admin",
  description: "Manage product categories",
}

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">Manage your product categories and organization</p>
      </div>
      <CategoryManagement />
    </div>
  )
}
