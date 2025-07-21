import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategoriesGrid } from "@/components/categories-grid"

export const metadata = {
  title: "Categories - ToddlersWorld",
  description: "Browse all product categories",
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shop by Category</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive collection of product categories to find exactly what you need
          </p>
        </div>
        <CategoriesGrid />
      </main>
      <Footer />
    </div>
  )
}
