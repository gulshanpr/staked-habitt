"use client"

import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does habit staking work?",
    answer: "When you stake habits, you commit crypto tokens as collateral for completing your habits. Successfully maintaining your habits earns you rewards, while failing to do so risks losing your stake."
  },
  {
    question: "What cryptocurrencies can I stake?",
    answer: "Currently, we support staking with ETH and other ERC-20 tokens on the platform. More options will be added based on community demand."
  },
  {
    question: "How are rewards calculated?",
    answer: "Rewards are calculated based on your stake amount, streak length, and habit difficulty. Longer streaks and more challenging habits earn higher rewards."
  },
  {
    question: "Is my staked crypto safe?",
    answer: "Yes, all staked assets are secured by smart contracts that have been audited by leading security firms. We prioritize the safety of your funds."
  },
  {
    question: "Can I withdraw my stake early?",
    answer: "Yes, but early withdrawals may incur a penalty to maintain system integrity and encourage commitment to habits."
  }
]

export function FaqSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-slate-600">Everything you need to know about StakedHabit</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}