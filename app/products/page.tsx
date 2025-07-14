import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { Suspense } from "react"

export const metadata = {
  title: "Products - ModernStore",
  description: "Browse our collection of premium products",
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; minPrice?: string; maxPrice?: string; search?: string }
}) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-1/4">
            <ProductFilters />
          </aside>
          <div className="lg:w-3/4">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Products</h1>
              <p className="text-muted-foreground">Discover our curated collection of premium products</p>
            </div>
            <Suspense fallback={<div>Loading products...</div>}>
              <ProductGrid searchParams={searchParams}  />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
