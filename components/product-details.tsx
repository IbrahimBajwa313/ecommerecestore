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
import { motion } from "framer-motion"

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
  const { setCart, cart } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  const handleAddToCart = async () => {
    setIsAddingToCart(true)
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product?._id, quantity }),
      })
      if (response.ok) {
        setCart(true)
        toast({
          title: "Added to cart",
          description: `${product?.name} has been added to your cart.`,
        })
        setTimeout(() => setCart(false), 300)
      } else {
        throw new Error("Failed to add to cart")
      }
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Product Images */}
      <div className="space-y-4">
        <div className="aspect-square relative overflow-hidden rounded-lg border">
          <Image
            src={product?.images[selectedImage] || "/placeholder.svg"}
            alt={product?.name}
            fill
            className="object-cover"
            priority
          />
          {discountPercentage > 0 && (
            <Badge className="absolute top-4 left-4 bg-red-500 hover:bg-red-600">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {product?.images.length > 1 && (
          <div className="grid grid-cols-4 gap-4">
            {product?.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square relative overflow-hidden rounded-lg border-2 ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product?.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>

          {/* Rating */}
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

          {/* Price */}
          <div className="flex items-center space-x-4 mb-6">
            <span className="text-3xl font-bold">${product?.price}</span>
            {product?.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product?.originalPrice}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product?.stock !== 0 ? (
              <Badge className="bg-green-100 text-green-800">In Stock</Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Quantity and Add to Cart */}
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
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            {/* Animated Add to Cart Button */}
            <motion.div
              animate={{ x: [0, -4, 0, 4, 0,-4,0] }}
              transition={{
                duration: .3,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "linear",
              }}
              className="flex-1"
            >
              <Button
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
                disabled={product?.stock === 0 || isAddingToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            </motion.div>

            {/* Favorite Button */}
            <Button
              variant="outline"
              size="lg"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "text-red-500 fill-red-500" : ""}`} />
            </Button>

            {/* Share Button */}
            <Button variant="outline" size="lg" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
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
                      <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">Customer reviews will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
