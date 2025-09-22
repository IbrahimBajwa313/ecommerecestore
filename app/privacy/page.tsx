import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Package, CreditCard, AlertCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Returns & Exchanges - ModernStore",
  description: "Learn about our return policy and how to return or exchange items",
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We want you to be completely satisfied with your purchase. Here's everything you need to know about our
            return policy.
          </p>
        </div>

        {/* Return Policy Overview */}
        <Card className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <CardContent className="p-8 text-center">
            <RefreshCw className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">30-Day Return Policy</h2>
            <p className="text-lg mb-4">Return most items within 30 days of delivery for a full refund or exchange</p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Free Returns on Orders Over $50
            </Badge>
          </CardContent>
        </Card>

        {/* Return Process */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">How to Return an Item</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">1</span>
                </div>
                <h3 className="font-semibold mb-2">Start Return</h3>
                <p className="text-muted-foreground text-sm">
                  Log into your account and select the item you want to return
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">2</span>
                </div>
                <h3 className="font-semibold mb-2">Print Label</h3>
                <p className="text-muted-foreground text-sm">We'll email you a prepaid return shipping label</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">3</span>
                </div>
                <h3 className="font-semibold mb-2">Ship Item</h3>
                <p className="text-muted-foreground text-sm">
                  Package the item and drop it off at any authorized location
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-lg">4</span>
                </div>
                <h3 className="font-semibold mb-2">Get Refund</h3>
                <p className="text-muted-foreground text-sm">
                  Receive your refund within 3-5 business days after we receive the item
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Return Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Return Conditions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2 text-green-600">✓ Returnable Items</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Items in original condition with tags</li>
                  <li>• Unopened electronics in original packaging</li>
                  <li>• Clothing and accessories (unworn)</li>
                  <li>• Books and media (unopened)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-red-600">✗ Non-Returnable Items</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Personalized or custom items</li>
                  <li>• Perishable goods</li>
                  <li>• Intimate or sanitary goods</li>
                  <li>• Digital downloads</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Refund Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Refund Timeline</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Refunds are processed within 3-5 business days after we receive your return.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Refund Method</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  Refunds are issued to the original payment method used for the purchase.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Return Shipping</h3>
                <p className="text-muted-foreground text-sm">
                  Free return shipping on orders over $50. $9.99 return shipping fee for smaller orders.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Exchanges */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Exchanges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Size Exchanges</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Need a different size? We offer free size exchanges on clothing and footwear within 30 days of
                  purchase.
                </p>
                <Button variant="outline">Start Size Exchange</Button>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Color/Style Exchanges</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Want a different color or style? Exchange for any item of equal or lesser value, or pay the difference
                  for higher-priced items.
                </p>
                <Button variant="outline">Start Exchange</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Notes */}
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800 dark:text-orange-200">
              <AlertCircle className="w-5 h-5 mr-2" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-orange-700 dark:text-orange-300">
            <ul className="space-y-2 text-sm">
              <li>• Items must be returned within 30 days of delivery date</li>
              <li>• Original packaging and all accessories must be included</li>
              <li>• Items showing signs of wear or damage may not be eligible for full refund</li>
              <li>• Sale items (marked as final sale) cannot be returned</li>
              <li>• International returns may take longer to process</li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Need Help with a Return?</h2>
          <p className="text-muted-foreground mb-6">
            Our customer service team is here to help you with any questions about returns or exchanges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth/login">Start a Return</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
