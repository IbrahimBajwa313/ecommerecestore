import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, Globe, Package } from "lucide-react"

export const metadata = {
  title: "Shipping Information - ModernStore",
  description: "Learn about our shipping options, rates, and delivery times",
}

export default function ShippingPage() {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      price: "$9.99",
      time: "5-7 business days",
      description: "Reliable delivery for most orders",
      icon: Truck,
    },
    {
      name: "Express Shipping",
      price: "$19.99",
      time: "2-3 business days",
      description: "Faster delivery when you need it",
      icon: Clock,
    },
    {
      name: "Overnight Shipping",
      price: "$39.99",
      time: "1 business day",
      description: "Next day delivery for urgent orders",
      icon: Package,
    },
    {
      name: "International Shipping",
      price: "Varies",
      time: "7-21 business days",
      description: "Worldwide delivery available",
      icon: Globe,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We offer multiple shipping options to get your orders to you quickly and safely
          </p>
        </div>

        {/* Shipping Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {shippingOptions.map((option, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <option.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <CardTitle className="text-lg">{option.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {option.price}
                  </Badge>
                </div>
                <p className="font-medium mb-2">{option.time}</p>
                <p className="text-muted-foreground text-sm">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Free Shipping Banner */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white mb-12">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Free Standard Shipping</h2>
            <p className="text-lg">On orders over $100 within the continental US</p>
          </CardContent>
        </Card>

        {/* Shipping Policies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Processing Time</h3>
                <p className="text-muted-foreground text-sm">
                  Orders are typically processed within 1-2 business days. Custom or personalized items may take
                  additional time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Shipping Restrictions</h3>
                <p className="text-muted-foreground text-sm">
                  Some items cannot be shipped to certain locations due to size, weight, or legal restrictions. These
                  will be noted on the product page.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Address Accuracy</h3>
                <p className="text-muted-foreground text-sm">
                  Please ensure your shipping address is correct. We are not responsible for packages delivered to
                  incorrect addresses provided by the customer.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Shipping</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Available Countries</h3>
                <p className="text-muted-foreground text-sm">
                  We ship to most countries worldwide. Shipping costs and delivery times vary by destination.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Customs and Duties</h3>
                <p className="text-muted-foreground text-sm">
                  International customers are responsible for any customs duties, taxes, or fees imposed by their
                  country.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Delivery Times</h3>
                <p className="text-muted-foreground text-sm">
                  International delivery times can vary significantly based on customs processing and local postal
                  services.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tracking Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Order Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Order Confirmed</h3>
                <p className="text-muted-foreground text-sm">You'll receive an email confirmation with order details</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Order Shipped</h3>
                <p className="text-muted-foreground text-sm">Tracking information will be sent to your email address</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Order Delivered</h3>
                <p className="text-muted-foreground text-sm">Your package arrives at your specified address</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
