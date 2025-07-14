"use client"

import { useState, useEffect } from "react"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"


interface CartItem {
  _id: string
  product: {
    _id: string
    name: string
    price: number
    images: string[]
    stock: number
  }
  quantity: number
}

export function CartContent() {
  const { setCart ,cart} = useCart()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCartItems()
  }, [])

  const fetchCartItems = async () => {
    try {
      const response = await fetch("/api/cart")
      if (response.ok) {
        const data = await response.json()
        setCartItems(data.items || [])
      }
    } catch (error) {
      console.error("Error fetching cart:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity: newQuantity }),
      })

      if (response.ok) {
        setCartItems((items) => items.map((item) => (item._id === itemId ? { ...item, quantity: newQuantity } : item)))
      }
    } catch (error) {
      console.error("Error updating quantity:", error)
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId }),
      })

      if (response.ok) {
        setCart(true)
        setCartItems((items) => items.filter((item) => item._id !== itemId))
         // Delay resetting cart to false to ensure `cart` is true for a moment
         setTimeout(() => setCart(false), 300)
      }
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.product?.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + tax + shipping

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some products to get started</p>
        <Button asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={item.product?.images[0] || "/placeholder.svg"}
                    alt={item.product?.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.product?._id}`}>
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors">{item.product?.name}</h3>
                  </Link>
                  <p className="text-2xl font-bold mt-1">${item.product?.price}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.product?.stock > 0 ? `${item.product?.stock} in stock` : "Out of stock"}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, Number.parseInt(e.target.value) || 1)}
                    className="w-16 text-center"
                    min="1"
                    max={item.product?.stock}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={item.quantity >= item.product?.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-lg">${(item.product?.price * item.quantity).toFixed(2)}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item._id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button asChild className="w-full" size="lg">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button asChild variant="outline" className="w-full bg-transparent">
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>

            {shipping > 0 && (
              <p className="text-sm text-muted-foreground mt-4 text-center">Free shipping on orders over $100</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
