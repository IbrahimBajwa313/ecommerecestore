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
      <div className="relative z-10 w-full flex justify-center">
        <div className=" w-10/12 md:w-9/12 lg:w-3/5 mx-auto shadow-lg -mb-20 z-20">
          <div className="bg-gradient-to-r from-[#ab56ff] to-[#4f46e5] text-white rounded-xl shadow-xl border border-white/30 overflow-visible">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-4 py-6 md:px-10 md:py-10 relative">
           
              <div className="md:absolute relative flex flex-col left-0 -bottom-6  md:block">
                <Image
                  src="/footer.png"
                  alt="Newsletter Illustration"
                  width={220}
                  height={220}
                  className="object-contain"
                />
              </div>

          
              <div className=" md:pl-48 lg:pl-56 flex flex-col justify-center gap-3 text-center md:text-left">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug">
                  Subscribe to our newsletter
                </h2>
                <p className="text-sm text-white/90 max-w-md mx-auto md:mx-0">
                  Get 20% off on your first order just by subscribing. Don't miss out on the cutest toddler deals!
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mt-2 justify-center md:justify-start">
                  <Input
                    placeholder="Enter your email"
                    className="rounded-full px-4 py-2 text-black w-full sm:w-64 bg-white"
                  />
                  <Button className="rounded-full bg-white text-[#4f46e5] hover:bg-gray-100 px-6 whitespace-nowrap">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="relative z-0  container shadow-2xl bg-[#fef6ff] dark:bg-[#0d0c11] border  dark:border-white/10 w-11/12 sm:w-5/6 mx-auto px-4 pt-32 sm:pt-20 pb-2 rounded-xl">
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Social */}
          <div className="flex flex-col gap-4 pb-0">
  <Link href="/">
    <Image src="/logo.png" alt="ToddlersWorld Logo" width={100} height={35} />
  </Link>
  <p className="text-sm text-muted-foreground dark:text-gray-950">
    Bringing joy to every toddler's world.
  </p>

  {/* CEO Quote */}
  <div className="border-l-4 border-primary pl-4 mt-2 text-sm italic text-muted-foreground dark:text-gray-400">
    <p>
      “I’m passionate about offering premium & safe baby products to support and delight parents.”
    </p>
    <p className="mt-1 font-semibold not-italic text-[#7C3AED] dark:text-white">
      — Abu Huraira, Founder & CEO, Toddlers World
    </p>
  </div>

  
</div>


          {/* Contact Info */}
          <div className="md:pt-32">
            <h4 className="text-sm font-semibold mb-4 text-[#7C3AED] dark:text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +92 3039008580
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />a.huraira.ah16@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />Govt. Colony Tanki Chowk Okara
              </li>
              <div className="ms-10 flex space-x-0 mt-0">

          
    <Link href="https://www.facebook.com/profile.php?id=61567127003108&mibextid=ZbWKwL" target="_blank">
      <Button variant="ghost" size="icon">
        <Facebook className="w-5 h-5" />
      </Button>
    </Link>
    <Link href="https://www.instagram.com/toddlersworld16?igsh=djU0bzdtMGQ2dzR0" target="_blank">
      <Button variant="ghost" size="icon">
        <Instagram className="w-5 h-5" />
      </Button>
    </Link>
    <Link href="https://www.tiktok.com/@toddlersworld16?_t=ZS-8y8dGyD3eqO&_r=1" target="_blank">
      <Button variant="ghost" size="icon">
        <SiTiktok className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
      </Button>
    </Link>
  </div>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:pt-32">
            <h4 className="text-sm font-semibold mb-4 text-[#7C3AED] dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground dark:text-gray-400">
              <li><Link href="/ourStory" className="hover:underline">Our Story</Link></li>
              <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link href="/products" className="hover:underline">Shop</Link></li>
              <li><Link href="/returns" className="hover:underline">Return Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className=" text-center text-xs text-muted-foreground dark:text-gray-500 border-t pt-2 dark:border-white/10">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-1">
              <Code2 className="w-3 h-3" />
              <span>© 2025 ToddlersWorld. All rights reserved.</span>
            </div>
            <span className="hidden sm:inline-block">|</span>
            <span>
              Developed by{" "}
              <Link
                href="https://www.techcognify.com/"
                target="_blank"
                className="hover:underline underline-offset-2 text-[#7C3AED] font-medium"
              >
                TECHCOGNIFY
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}