import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { TrendingProducts } from "@/components/trending-products"
import { EveryonesFavourite } from "@/components/everyone's-Favourite"
import { CategorySection } from "@/components/category-section"
import { FAQSection } from "@/components/faq-section"
import BestSellingSection from "@/components/BestSellingSection"
import { TopBanner } from "@/components/top_banner"
import {WhatsappReviewSection} from "@/components/reviews"
// app/layout.js or pages/_app.js
import '@/styles/globals.css'
import { FeaturedProducts } from "@/components/featured-products"


export default function HomePage() {
  return (
    <div className="min-h-screen  bg-background">
          <TopBanner />
      <Navbar />
      <main className="min-h-screen">
        <HeroSection />


        <TrendingProducts /> 
        <CategorySection />
        <BestSellingSection />
        <WhatsappReviewSection/>
      </main>
      <FAQSection/>
      <Footer />
    </div>
  )
}
