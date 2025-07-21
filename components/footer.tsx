"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiTiktok } from "react-icons/si"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Social */}
          <div className="flex flex-col items-start gap-4">
            <Link href="/">
              <Image src="/logo.png" alt="Logo" width={120} height={40} />
            </Link>
            <p className="text-sm text-muted-foreground">Bringing joy to every toddler's world.</p>
            <div className="flex space-x-2">
              <Link href="https://www.facebook.com" target="_blank">
                <Button variant="ghost" size="icon">
                  <Facebook className="w-5 h-5" />
                </Button>
              </Link>
             
              <Link href="https://www.instagram.com" target="_blank">
                <Button variant="ghost" size="icon">
                  <Instagram className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://www.tiktok.com/@toddlersworld16?_t=ZS-8y8dGyD3eqO&_r=1" target="_blank">
  <Button variant="ghost" size="icon">
    <SiTiktok className="w-5 h-5 text-muted-foreground" /> {/* or use text-white */}
  </Button>
</Link>

            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +123 456 789
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> support@toddlersworld.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 123 Toddler Street, Toyland
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/shop">Shop</Link></li>
              <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-muted-foreground border-t pt-6">
          <div className="flex justify-center items-center gap-1">
            <Code2 className="w-3 h-3" />
            <span>© 2025 Toddlers World. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
