import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/context/cart-context"
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
    generator: 'v0.dev'
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
        </CartProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
