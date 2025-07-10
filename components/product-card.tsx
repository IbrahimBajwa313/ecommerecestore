import Link from "next/link"
import Image from "next/image"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    rating: number
    reviews: number
    badge?: string
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link href={`/products/${product.id}`} className="block overflow-hidden">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-full object-cover transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-110"
              />
            </div>
          </Link>

          {product.badge && (
            <Badge 
              className="absolute top-3 left-3 transition-all duration-300 ease-out group-hover:scale-105"
              variant="secondary"
            >
              {product.badge}
            </Badge>
          )}

          {discountPercentage > 0 && (
            <Badge 
              className="absolute top-3 right-3 bg-red-500 transition-all duration-300 ease-out group-hover:scale-105"
            >
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        <div className="p-4 space-y-3">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-lg hover:text-primary transition-colors duration-300 line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 transition-transform duration-200 ${
                    i < Math.floor(product.rating) 
                      ? "text-yellow-400 fill-current group-hover:scale-125" 
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground transition-opacity duration-300 group-hover:opacity-80">
              ({product.reviews})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through transition-opacity duration-300 group-hover:opacity-75">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          <Button 
            className="w-full transition-all duration-500 ease-[cubic-bezier(0.22,0.61,0.36,1)] 
                      translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2 transition-transform group-hover:scale-125" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}