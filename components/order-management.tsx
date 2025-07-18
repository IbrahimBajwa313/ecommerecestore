"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface OrderItem {
  product: string
  name: string
  price: number
  quantity: number
  image: string
  _id: string
}

interface Address {
  fullName: string
  phoneNumber: string
  street: string
  city: string
  zipCode: string
  country: string
}

interface Order {
  _id: string
  orderNumber: string
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  notes: string
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  createdAt: string
  address: Address
}

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders")
        const data = await res.json()
        setOrders(data.orders)
      } catch (err) {
        console.error("Failed to fetch orders:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) {
    return <p className="text-center py-10 text-muted-foreground">Loading orders...</p>
  }

  if (orders.length === 0) {
    return <p className="text-center py-10 text-muted-foreground">No orders found.</p>
  }

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg p-6 shadow-sm bg-white dark:bg-gray-900"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-2">
            <div>
              <h2 className="text-xl font-semibold">
                Order #{order.orderNumber}
              </h2>
              <p className="text-sm text-muted-foreground">
                Placed on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-sm text-right">
              <p className="font-medium">Status: <span className="capitalize">{order.orderStatus}</span></p>
              <p>Payment: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-4">
            <h3 className="font-medium mb-1">Customer Info:</h3>
            <div className="text-sm space-y-0.5">
              <p><strong>Name:</strong> {order.address.fullName}</p>
              <p><strong>Phone:</strong> {order.address.phoneNumber}</p>
              <p><strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.zipCode}, {order.address.country}</p>
              {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
            </div>
          </div>

          {/* Order Items */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-md">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item) => (
                  <tr key={item._id} className="border-t border-gray-200 dark:border-gray-700">
                    <td className="p-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded object-cover"
                      />
                    </td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 text-center">{item.quantity}</td>
                    <td className="p-3 text-right">Rs.{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
 
          {/* Totals */}
          <div className="text-right mt-4 space-y-1 text-sm">
            <p><strong>Subtotal:</strong> Rs.{order.subtotal.toFixed(2)}</p>
            <p><strong>Shipping:</strong> Rs.{order.shipping.toFixed(2)}</p>
            <p className="text-base font-semibold">Total: Rs.{order.total.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
