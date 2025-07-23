import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Package, CreditCard, AlertCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Returns & Exchanges - ToddlersWorld",
  description: "Understand our 7-day return policy and what's refundable or not at ToddlersWorld.",
}

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We want you to feel confident shopping with us. Here's everything you need to know about our flexible return policy.
          </p>
        </div>

        {/* Return Policy Overview */}
        <Card className="mb-12 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-950">
          <CardContent className="p-8 text-center">
            <RefreshCw className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">7 Days Easy Return Policy</h2>
            <p className="text-lg mb-4">Free returns on orders over Rs. 5000. Return within 7 days of delivery.</p>
            <Badge variant="secondary" className="text-md px-4 py-2">
              Hassle-free returns on eligible items
            </Badge>
          </CardContent>
        </Card>

        {/* Return Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                Refundable Items (You Can Return)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside">
                <li>🍼 Unused and unopened baby products in original packaging.</li>
                <li>👕 Clothing items with tags intact and no signs of wear.</li>
                <li>🧴 Feeding accessories that are sealed and hygienically safe for resale.</li>
                <li>🎁 Products received damaged or defective (must notify within 24 hours).</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
                Non-Refundable Items (You Cannot Return)
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <ul className="list-disc list-inside">
                <li>🧸 Used or washed items (e.g., baby clothes, bibs, or sheets).</li>
                <li>🍼 Opened feeding bottles, teethers, and hygiene-related products.</li>
                <li>🎨 Personalized or customized items (e.g., name-engraved products).</li>
                <li>📦 Items without original packaging, tags, or missing accessories/manuals.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Important Notes */}
        <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-800 dark:text-orange-200">
              <AlertCircle className="w-5 h-5 mr-2" />
              Important Notes
            </CardTitle>
          </CardHeader>
          <CardContent className="text-orange-700 dark:text-orange-300">
            <ul className="space-y-2 text-sm">
              <li>• You must inform us of damage within 24 hours of delivery.</li>
              <li>• All returns must include original packaging and accessories.</li>
              <li>• Items should be unused and in resaleable condition.</li>
              <li>• Refunds are processed within 5–7 working days after inspection.</li>
            </ul>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Need Help with a Return?</h2>
          <p className="text-muted-foreground mb-6">
            Our support team is here to assist you through WhatsApp or Contact Page.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
            <Link href="https://wa.me/923039008580 ">Chat on WhatsApp</Link>
            </Button>
           
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 