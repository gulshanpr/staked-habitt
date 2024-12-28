"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { ActivityGraph } from "@/components/github/ActivityGraph"
import { AddHabitDialog } from "@/components/dialogs/AddHabitDialog"
import { HabitList } from "@/components/habits/HabitList"
import { type Habit } from "@/types/habits"

export default function Profile() {
  const [addHabitOpen, setAddHabitOpen] = useState(false)
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      title: "Daily Exercise",
      status: "Completed",
      progress: 100,
      stake: "0.5 ETH",
      time: "06:00",
      duration: "2024-03-01",
      repetition: ["Mon", "Wed", "Fri"]
    },
    {
      id: "2",
      title: "Reading",
      status: "In Progress",
      progress: 60,
      stake: "0.3 ETH",
      time: "20:00",
      duration: "2024-03-15",
      repetition: ["Mon", "Tue", "Wed", "Thu", "Fri"]
    },
    {
      id: "3",
      title: "Meditation",
      status: "Pending",
      progress: 30,
      stake: "0.2 ETH",
      time: "07:00",
      duration: "2024-03-30",
      repetition: ["Mon", "Wed", "Fri", "Sun"]
    }
  ])

  const handleAddHabit = (newHabit: Omit<Habit, "id" | "status" | "progress">) => {
    const habit: Habit = {
      ...newHabit,
      id: Date.now().toString(),
      status: "Pending",
      progress: 0
    }
    setHabits(prev => [...prev, habit])
  }

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
                
                <HabitList habits={habits} />
              </div>

              <ActivityGraph />
            </div>
          </motion.div>
        </div>
      </div>

      <AddHabitDialog 
        open={addHabitOpen} 
        onOpenChange={setAddHabitOpen}
        onSubmit={handleAddHabit}
      />
    </div>
  )
}