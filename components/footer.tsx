"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Company Info */}
          <div className="space-y-5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="Toddlers World Logo"
                  className="h-full object-contain"
                />
              </div>
              <span className="font-bold text-xl">Toddlers World</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your trusted partner for premium baby products and exceptional shopping experiences.
            </p>
            <div className="flex space-x-4 pt-2">
              <Link href="https://www.facebook.com/profile.php?id=61567127003108&mibextid=ZbWKwL" target="_blank">
                <Button variant="ghost" size="icon">
                  <Facebook className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://twitter.com" target="_blank">
                <Button variant="ghost" size="icon">
                  <Twitter className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://www.instagram.com/toddlersworld16?igsh=djU0bzdtMGQ2dzR0" target="_blank">
                <Button variant="ghost" size="icon">
                  <Instagram className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="https://www.tiktok.com/@toddlersworld16?_t=ZS-8y8dGyD3eqO&_r=1" target="_blank">
                <Button variant="ghost" size="icon">
                  <Youtube className="w-5 h-5 rotate-45" /> {/* Placeholder for TikTok */}
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <Link href="/products" className="block text-muted-foreground hover:text-foreground transition-colors">
                Products
              </Link>
              <Link href="/categories" className="block text-muted-foreground hover:text-foreground transition-colors">
                Categories
              </Link>
              <Link href="/ourStory" className="block text-muted-foreground hover:text-foreground transition-colors">
                Our Story
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-5">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span>a.huraira.ah16@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>+92 304 6290784</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Okara, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Toddlers World. All rights reserved.</p>
          <div className="flex space-x-6 mt-3 md:mt-0">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>

        {/* Developer Credit */}
        <div className="mt-6 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
          <span className="flex items-center gap-1">
            <Code2 className="w-4 h-4" /> Developed by{" "}
            <span className="font-medium text-foreground">Muhammad Ibrahim Aslam</span>
          </span>
          <span>·</span>
          <Link
            href="https://wa.me/923074583567"
            target="_blank"
            className="text-blue-600 hover:underline"
          >
            Contact Developer
          </Link>
        </div>
      </div>
    </footer>
  )
}
