"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/hooks/use-toast"
import { User, Calendar, Package, Loader2 } from "lucide-react"

interface Order {
  _id: string
  orderNumber: string
  createdAt: string
  orderStatus: string
  total: number
  items: { quantity: number }[]
}

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [ordersLoading, setOrdersLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.profile?.phone || "",
        address: user.profile?.address || "",
        city: user.profile?.city || "",
        state: user.profile?.state || "",
        zipCode: user.profile?.zipCode || "",
        country: user.profile?.country || "US",
      })
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true)
      const response = await fetch("/api/orders")
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      } else {
        console.error("Failed to fetch orders")
      }
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setOrdersLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Profile updated successfully",
        })
        setIsEditing(false)
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to update profile",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "shipped":
        return "secondary"
      case "processing":
        return "outline"
      case "pending":
        return "outline"
      default:
        return "destructive"
    }
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-6 text-center">
            <p>Please log in to view your profile.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and view your orders</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Information</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled={true} // Email should not be editable
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profileData.country}
                      onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your country"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your address"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your city"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={profileData.zipCode}
                      onChange={(e) => setProfileData({ ...profileData, zipCode: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your ZIP code"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={profileData.state}
                      onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your state"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSaveProfile} disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isLoading}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
                <CardDescription>View your past orders and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">Loading orders...</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No orders found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order._id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{order.orderNumber}</span>
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">
                              {order.items.reduce((sum, item) => sum + item.quantity, 0)} item
                              {order.items.reduce((sum, item) => sum + item.quantity, 0) > 1 ? "s" : ""}
                            </span>
                            <span className="font-medium">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={getStatusColor(order.orderStatus)}>
                            {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                          </Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
