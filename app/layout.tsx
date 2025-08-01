// app/layout.tsx
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/context/cart-context"
import Link from "next/link"
import Image from "next/image"
import FeedbackPopup from "@/components/feedback-popup"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ToddlersWorld - Premium Baby Essentials",
  description:
    "Shop adorable, safe, and high-quality baby products loved by parents. Fast shipping & 24/7 support – because your baby deserves the best.",
  keywords:
    "baby products, toddler essentials, safe baby items, premium baby store, baby care, baby toys, newborn must-haves, fast shipping baby store",
  openGraph: {
    title: "ToddlersWorld - Premium Baby Essentials",
    description:
      "Shop adorable, safe, and high-quality baby products loved by parents. Fast shipping & 24/7 support – because your baby deserves the best.",
    type: "website",
    url: "https://toddlersworld.online",
    images: [
      {
        url: "https://toddlersworld.online/logo.png",
        width: 300,
        height: 300,
        alt: "ToddlersWorld Logo",
      },
      {
        url: "https://toddlersworld.online/logo.jpg",
        width: 1200,
        height: 630,
        alt: "ToddlersWorld Site Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ToddlersWorld - Premium Baby Essentials",
    description:
      "Shop adorable, safe, and high-quality baby products loved by parents. Fast shipping & 24/7 support – because your baby deserves the best.",
    images: ["https://toddlersworld.online/logo.png"],
  },
  icons: {
    icon: "https://toddlersworld.online/logo.png",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              {children}
              <FeedbackPopup /> {/* ✅ Inject client popup here */}

              {/* WhatsApp Button */}
              <Link
                href="https://wa.me/923039008580"
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50"
              >
                <Image
                  src="/whatsapp-icon.png"
                  alt="WhatsApp"
                  width={72}
                  height={72}
                  className="animate-whatsapp-spin"
                />
              </Link>

              <Toaster />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
