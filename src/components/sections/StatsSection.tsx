"use client"

import { motion } from "framer-motion"

const stats = [
  { label: "Active Users", value: "10,000+", icon: "👥" },
  { label: "Total Staked", value: "$1M+", icon: "💰" },
  { label: "Success Rate", value: "95%", icon: "📈" },
  { label: "Habits Tracked", value: "50,000+", icon: "✅" }
]

export function StatsSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}