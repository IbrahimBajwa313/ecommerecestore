import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/context/cart-context"
import Image from "next/image"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ModernStore - Premium eCommerce Experience",
  description: "Discover premium products with fast shipping and exceptional customer service.",
  keywords: "ecommerce, online store, premium products, fast shipping",
  openGraph: {
    title: "ModernStore - Premium eCommerce Experience",
    description: "Discover premium products with fast shipping and exceptional customer service.",
    type: "website",
    url: "https://modernstore.com",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ModernStore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ModernStore - Premium eCommerce Experience",
    description: "Discover premium products with fast shipping and exceptional customer service.",
    images: ["/og-image.jpg"],
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              {children}

              {/* WhatsApp Floating Button */}
              <Link
                href="https://wa.me/923039008580" // Replace with your number
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50"
              >
                <Image
                  src="/whatsapp-icon.png" // Place the logo in public/ directory
                  alt="WhatsApp"
                  width={72}
                  height={72}
                  className="animate-whatsapp-spin"
                />
              </Link>
            </CartProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
