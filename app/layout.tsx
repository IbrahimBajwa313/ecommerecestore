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
import Script from "next/script"

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
      <body className={inter.className}>
        <head>
        {/* ✅ MOVE Script HERE (at the top of <body>) */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1277123347467021');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* ✅ NoScript fallback for users with JS disabled */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1277123347467021&ev=PageView&noscript=1"
          />
        </noscript>
        </head>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <CartProvider>
              {children}
              <FeedbackPopup />

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
