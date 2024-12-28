"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"

const leaderboardData = [
  { rank: 1, name: "Alex Thompson", score: 2500, streak: 45 },
  { rank: 2, name: "Sarah Chen", score: 2350, streak: 42 },
  { rank: 3, name: "Michael Park", score: 2200, streak: 38 },
  { rank: 4, name: "Emma Wilson", score: 2100, streak: 35 },
  { rank: 5, name: "James Rodriguez", score: 2000, streak: 33 },
]

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-32 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200">
            <h1 className="text-2xl font-semibold">Global Leaderboard</h1>
            <p className="text-slate-600">Top performers this month</p>
          </div>
          
          <div className="divide-y divide-slate-200">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 flex items-center justify-between hover:bg-slate-50"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    user.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                    user.rank === 2 ? "bg-slate-100 text-slate-700" :
                    user.rank === 3 ? "bg-orange-100 text-orange-700" :
                    "bg-slate-50 text-slate-600"
                  }`}>
                    {user.rank}
                  </div>
                  <div>
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-sm text-slate-500">{user.streak} day streak</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{user.score}</div>
                  <div className="text-sm text-slate-500">points</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}