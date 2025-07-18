"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

export function OrderSummary() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cookie = Cookies.get("cart")
    try {
      const parsed: CartItem[] = cookie ? JSON.parse(cookie) : []
      setCartItems(parsed)
    } catch (error) {
      console.error("Error parsing cart cookie:", error)
      setCartItems([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const tax = subtotal * 0.08
  const shipping = subtotal > 100 ? 0 : 9.99
  const total = subtotal + tax + shipping

  if (isLoading) {
    return (
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="bg-gray-300 h-16 w-16 rounded" />
                <div className="bg-gray-300 h-4 w-32 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">
                Rs.{(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Totals */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
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
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {shipping > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Free shipping on orders over $100
          </p>
        )}
      </CardContent>
    </Card>
  )
}
