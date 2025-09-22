import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { RelatedProducts } from "@/components/related-products"
import { notFound } from "next/navigation"

const getProduct = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();
    const products = data?.products;

    // Find product that matches the given ID
    const product = products?.find((item: any) => item._id === id);
console.log('product is',product)
    return product || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} - ModernStore`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <ProductDetails product={product} />
        <div className="mt-16">
          <RelatedProducts categoryId={product?.category?._id} currentProductId={product._id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
