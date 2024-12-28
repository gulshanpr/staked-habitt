"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import ConnectButton from "./ConnectButton"

export function Navbar() {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-4 left-0 right-0 mx-auto w-full max-w-2xl z-50"
    >
      <nav className="px-6 py-3 bg-white/80 backdrop-blur-lg rounded-full border border-slate-200 shadow-lg">
        <div className="flex items-center justify-center space-x-8">
          <Link href="/" className="text-lg font-semibold">
            StakedHabit
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/leaderboard" className="text-slate-600 hover:text-slate-900">
              Leaderboard
            </Link>
            <Link href="/profile" className="text-slate-600 hover:text-slate-900">
              Profile
            </Link>
            <ConnectButton />
          </div>
        </div>
      </nav>
    </motion.div>
  )
}