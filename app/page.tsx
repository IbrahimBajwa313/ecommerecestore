import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { TrendingProducts } from "@/components/trending-products"
import { EveryonesFavourite } from "@/components/everyone's-Favourite"
import { CategorySection } from "@/components/category-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { TopBanner } from "@/components/top_banner"
import {WhatsappReviewSection} from "@/components/reviews"
// app/layout.js or pages/_app.js
import '@/styles/globals.css'


export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
          <TopBanner />
      <Navbar />
      <main>
        <HeroSection />
        <TrendingProducts /> 
        <EveryonesFavourite/>
        <CategorySection />
        <WhatsappReviewSection/>
      </main>
      <Footer />
    </div>
  )
}
