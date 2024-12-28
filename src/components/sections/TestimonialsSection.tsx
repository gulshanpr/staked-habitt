"use client"

import { motion } from "framer-motion"

const testimonials = [
  {
    quote: "StakedHabit transformed my morning routine. The stake mechanism keeps me accountable!",
    author: "Sarah J.",
    role: "Software Engineer",
    avatar: "👩‍💻"
  },
  {
    quote: "I've built more consistent habits in 30 days than I did in the past year.",
    author: "Michael R.",
    role: "Entrepreneur",
    avatar: "👨‍💼"
  },
  {
    quote: "The community aspect makes building habits fun and engaging.",
    author: "Emily L.",
    role: "Fitness Coach",
    avatar: "💪"
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-slate-600">Join thousands of satisfied users building better habits</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
            >
              <div className="text-4xl mb-4">{testimonial.avatar}</div>
              <p className="text-slate-600 mb-4">"{testimonial.quote}"</p>
              <div className="font-medium">{testimonial.author}</div>
              <div className="text-sm text-slate-500">{testimonial.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}