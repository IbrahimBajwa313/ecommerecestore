"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { OrderSummary } from "@/components/order-summary"
import { useToast } from "@/hooks/use-toast"

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

export function CheckoutClient() {
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [altPhone, setAltPhone] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [placingOrder, setPlacingOrder] = useState(false)

  useEffect(() => {
    try {
      const cookie = Cookies.get("cart")
      const parsed = cookie ? JSON.parse(cookie) : []
      setCartItems(parsed)
    } catch (error) {
      console.error("Failed to read cart from cookies", error)
      setCartItems([])
    } finally {
      setTimeout(() => setIsLoading(false), 700)
    }
  }, [])

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const tax = subtotal * 0.08
  const shipping = subtotal >= 2000 ? 0 : 200
  const total = subtotal + shipping

  const handlePlaceOrder = async () => {
    if (!name || !email || !phone || !address || !city || !postalCode) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const orderPayload = {
      items: cartItems.map((item) => ({
        product: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.image,
      })),
      address: {
        fullName: name,
        phoneNumber: phone,
        street: address,
        city,
        zipCode: postalCode,
        country: "Pakistan",
      },
      subtotal,
      tax,
      shipping,
      total,
      notes: `Alt phone: ${altPhone}, Email: ${email}`,
    }

    try {
      setPlacingOrder(true)

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      })

      if (res.ok) {
        Cookies.remove("cart")
        toast({
          title: "Order Placed 🎉",
          description: "Your order has been placed successfully!",
          variant: "default",
        })

        setTimeout(() => {
          window.location.href = "/thank-you"
        }, 1000)
      } else {
        const error = await res.json()
        console.error("Order error:", error)
        toast({
          title: "Failed to Place Order",
          description: error?.message || "Something went wrong.",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Order error:", err)
      toast({
        title: "Network Error",
        description: "Unable to reach the server. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setPlacingOrder(false)
    }
  }

  return isLoading ? (
    <div className="flex justify-center min-h-screen  py-20">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  ) : (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Checkout Form */}
      <div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Billing Details</h2>
              <Input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              <Input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <Input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
              <Input type="text" placeholder="Alternate Phone Number (Optional)" value={altPhone} onChange={(e) => setAltPhone(e.target.value)} />
              <Input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <Input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
              <select
                defaultValue="Pakistan"
                disabled
                className="w-full border border-input rounded-md px-3 py-2 text-sm text-muted-foreground bg-muted cursor-not-allowed"
              >
                <option>Pakistan</option>
              </select>
              <Input type="text" placeholder="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
            </div>

            <div className="pt-6 space-y-3">
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <div className="flex items-center space-x-2">
                <input type="radio" id="cod" name="payment" value="cod" defaultChecked className="accent-primary" />
                <label htmlFor="cod" className="text-sm">Cash on Delivery (COD)</label>
              </div>
            </div>

            <Button
              className="w-full mt-6"
              onClick={handlePlaceOrder}
              disabled={placingOrder}
            >
              {placingOrder ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Placing...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div>
        <OrderSummary />
      </div>
    </div>
  )
}
