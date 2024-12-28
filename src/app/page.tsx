"use client"

import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/HeroSection"
import { StatsSection } from "@/components/sections/StatsSection"
import { VideoSection } from "@/components/sections/VideoSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { MarqueeSection } from "@/components/sections/MarqueeSection"
import { FaqSection } from "@/components/sections/FaqSection"

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <VideoSection />
      <TestimonialsSection />
      <FaqSection />
    </div>
  )
}