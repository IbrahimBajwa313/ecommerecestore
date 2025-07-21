import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CartContent } from "@/components/cart-content"

export const metadata = {
  title: "Shopping Cart - ModernStore",
  description: "Review your items and proceed to checkout",
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container min-h-screen mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <CartContent />
      </main>
      <Footer />
    </div>
  )
}
