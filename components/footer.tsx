"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, Phone, MapPin, Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiTiktok } from "react-icons/si"

export function Footer() {
  return (
    <footer className="border-t sm:mt-16 mt-20 mb-10 dark:border-white/10">
      {/* Newsletter CTA */}
      <div className="w-4/5 sm:w-3/5 mx-auto shadow-lg -mt-8 relative z-10">
        <div className="bg-gradient-to-r from-[#ab56ff] to-[#4f46e5] text-white rounded-xl shadow-xl border border-white/30 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4 py-6 md:px-10 md:py-10">
            {/* Illustration */}
            <div className="w-full md:w-1/3 flex justify-center">
              <Image
                src="/footer.png"
                alt="Newsletter Illustration"
                width={110}
                height={110}
                className="object-contain"
              />
            </div>

            {/* Text + Input */}
            <div className="w-full md:w-2/3 flex flex-col justify-center gap-3 text-center md:text-left">
              <h2 className="text-xl md:text-3xl font-bold leading-snug">
                Subscribe to our newsletter
              </h2>
              <p className="text-sm text-white/90 max-w-md mx-auto md:mx-0">
                Get 20% off on your first order just by subscribing. Don’t miss out on the cutest toddler deals!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-2 justify-center md:justify-start">
                <Input
                  placeholder="Enter your email"
                  className="rounded-full px-4 py-2 text-black w-full sm:w-64 bg-white"
                />
                <Button className="rounded-full bg-white text-[#4f46e5] hover:bg-gray-100 px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container shadow-2xl bg-[#fef6ff] dark:bg-[#0d0c11] border border-[#fef6ff] dark:border-white/10 w-11/12 sm:w-5/6 mx-auto px-4 pt-8 pb-2 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Social */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Image src="/logo.png" alt="ToddlersWorld Logo" width={130} height={40} />
            </Link>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Bringing joy to every toddler's world.
            </p>
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
              <Link
                href="https://www.tiktok.com/@toddlersworld16?_t=ZS-8y8dGyD3eqO&_r=1"
                target="_blank"
              >
                <Button variant="ghost" size="icon">
                  <SiTiktok className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary dark:text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +92 3039008580
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> a.huraira.ah16@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Govt. Colony Tanki Chowk Okara
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-primary dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
              <li><Link href="/ourStory">Our Story</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/products">Shop</Link></li>
              <li><Link href="/returns">Return Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-xs text-muted-foreground dark:text-gray-500 border-t pt-6 dark:border-white/10">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-1">
              <Code2 className="w-3 h-3" />
              <span>© 2025 ToddlersWorld. All rights reserved.</span>
            </div>
            <span className="hidden sm:inline-block">|</span>
            <span>
              Developed by{" "}
              <Link
                href="https://ibrahimbajwa.vercel.app/"
                target="_blank"
                className="hover:underline underline-offset-2 text-primary font-medium"
              >
                Ibrahim Bajwa
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
