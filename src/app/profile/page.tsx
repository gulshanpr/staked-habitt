"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { GitHubStats } from "@/components/GithubStats"
import { AddHabitDialog } from "@/components/dialogs/AddHabitDialog"

export default function Profile() {
  const [addHabitOpen, setAddHabitOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <div className="pt-32 px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4">
                  <div className="w-full h-full flex items-center justify-center text-2xl">
                    👤
                  </div>
                </div>
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-slate-600">Level 15 Achiever</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Current Streak</span>
                  <span className="font-semibold">15 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Points</span>
                  <span className="font-semibold">2,500</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Habits Completed</span>
                  <span className="font-semibold">45</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Habits & Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Active Habits</h3>
                  <Button onClick={() => setAddHabitOpen(true)}>Add New Habit</Button>
                </div>
                
                <div className="space-y-4">
                  {habits.map((habit, index) => (
                    <div
                      key={habit.name}
                      className="p-4 border border-slate-200 rounded-xl hover:border-purple-200 transition-colors"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{habit.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          habit.status === "Completed" ? "bg-green-100 text-green-700" :
                          habit.status === "In Progress" ? "bg-blue-100 text-blue-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {habit.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-slate-600">
                        <span>Progress: {habit.progress}%</span>
                        <span>{habit.stake} staked</span>
                      </div>
                      <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{ width: `${habit.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <GitHubStats />
            </div>
          </motion.div>
        </div>
      </div>

      <AddHabitDialog open={addHabitOpen} onOpenChange={setAddHabitOpen} />
    </div>
  )
}

const habits = [
  {
    name: "Daily Exercise",
    status: "Completed",
    progress: 100,
    stake: "0.5 ETH"
  },
  {
    name: "Reading",
    status: "In Progress",
    progress: 60,
    stake: "0.3 ETH"
  },
  {
    name: "Meditation",
    status: "Pending",
    progress: 30,
    stake: "0.2 ETH"
  }
]