"use client"

import { useCart } from "@/context/cart-context"
import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart, Heart, Share2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Cookies from "js-cookie"

interface Product {
  stock: number
  _id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  rating: number
  reviews: number
  features: string[]
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { setCart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const existing = Cookies.get("cart")
      const cart = existing ? JSON.parse(existing) : []

      const foundIndex = cart.findIndex((item: any) => item.product.id === product._id)

      if (foundIndex !== -1) {
        cart[foundIndex].quantity += quantity
      } else {
        cart.push({
          product: {
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0] || "/placeholder.svg",
            stock: product.stock,
          },
          quantity,
          addedAt: new Date().toISOString(),
        })
      }

      Cookies.set("cart", JSON.stringify(cart), { expires: 7 })
      setCart(true)
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
      setTimeout(() => setCart(false), 300)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}${pathname}`
      await navigator.clipboard.writeText(url)
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard!",
      })
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the product link.",
        variant: "destructive",
      })
    }
  }

  const discountPercentage = product?.originalPrice
    ? Math.round(((product?.originalPrice - product?.price) / product?.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-12"
    >
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square relative overflow-hidden rounded-lg border bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1}}
              className="absolute inset-0"
            >
              <Image
                src={product?.images[selectedImage] || "/placeholder.svg"}
                alt={product?.name}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {discountPercentage > 0 && (
            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {product?.images.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {product?.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative overflow-hidden rounded-md border-2 transition-all duration-200 ${
                  selectedImage === index
                    ? "border-primary ring-2 ring-primary/50"
                    : "border-gray-200"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product?.name} ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                  />
                </motion.div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>

          <div className="flex items-center space-x-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product?.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product?.rating} ({product?.reviews} reviews)
            </span>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold">Rs.{product?.price}</span>
            {product?.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                Rs.{product?.originalPrice}
              </span>
            )}
          </div>

          <div className="mb-6">
            {product?.stock !== 0 ? (
              <Badge className="bg-green-100 text-green-800">In Stock</Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="font-medium">Quantity:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            <motion.div
              animate={{ x: [0, -4, 0, 4, 0, -4, 0] }}
              transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatDelay: 3,
                ease: "linear",
              }}
              className="flex-1"
            >
              <Button
                className="w-full bg-[#7C3AED] hover:bg-[#8B4DF0]"
                size="lg"
                onClick={handleAddToCart}
                disabled={product?.stock === 0 || isAddingToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            </motion.div>

            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : ""}`} />
            </Button>

            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Separator />

        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground leading-relaxed">{product?.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
  <Card>
    <CardContent className="p-6">
      <ul className="space-y-2">
        {product?.features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <div
              className="min-w-[0.5rem] min-h-[0.5rem] w-2 h-2 mr-3"
              style={{
                backgroundColor: '#7C3AED',
                borderRadius: '9999px',
              }}
            />
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
</TabsContent>

        </Tabs>
      </div>
    </motion.div>
  )
}
