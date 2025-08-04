"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import Cookies from "js-cookie"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface CartItem {
  product: {
    id: string
    name: string
    price: number
    image: string
    stock: number
  }
  quantity: number
  addedAt: string
}

export function CartContent() {
  const { setCart } = useCart()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = () => {
    try {
      const cookie = Cookies.get("cart")
      const parsed = cookie ? JSON.parse(cookie) : []
      setCartItems(parsed)
    } catch (error) {
      console.error("Failed to read cart from cookies", error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveToCookies = (updatedCart: CartItem[]) => {
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: 7 })
    setCartItems(updatedCart)
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    const updated = cartItems.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    )
    saveToCookies(updated)
  }

  const removeItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.product.id !== productId)
    setCart(true)
    saveToCookies(updated)
    setTimeout(() => setCart(false), 300)
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal >= 2000 ? 0 : 200
  const total = subtotal  + shipping

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground mb-4" />
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6 text-sm sm:text-base">Add some products to get started</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-6">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-row gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.id}`}>
                      <h3 className="font-semibold text-base md:text-lg hover:text-primary transition-colors line-clamp-2">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-xl font-bold">Rs.{item.product.price}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.product.stock > 0 ? `${item.product.stock} in stock` : "Out of stock"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product.id, parseInt(e.target.value) || 1)
                      }
                      className="w-16 text-center"
                      min="1"
                      max={item.product.stock}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-2">
                    <p className="font-semibold text-lg">
                      Rs.{(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 px-1"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardContent className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>Rs.{subtotal.toFixed(2)}</span>
              </div>

            

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `Rs.${shipping.toFixed(2)}`}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>Rs.{total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button asChild className="w-full bg-[#7C3AED] hover:bg-[#8B4DF0]
" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {shipping > 0 && (
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Free shipping on orders over Rs.2000
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
