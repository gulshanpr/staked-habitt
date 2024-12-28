"use client"

import { motion } from "framer-motion"

const logos = [
  "🌟 Featured in CoinDesk",
  "🏆 Best Web3 App 2024",
  "💎 10,000+ Active Users",
  "🚀 $1M+ Staked",
  "🎯 95% Success Rate",
  "🌍 Global Community"
]

export function MarqueeSection() {
  return (
    <div className="py-12 bg-white overflow-hidden">
      <div className="relative">
        <div className="flex space-x-16 animate-marquee">
          {logos.concat(logos).map((text, i) => (
            <div
              key={i}
              className="flex-shrink-0 py-2 px-8 bg-slate-50 rounded-full border border-slate-200"
            >
              <span className="text-lg font-medium text-slate-800">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}