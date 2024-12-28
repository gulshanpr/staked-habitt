"use client"

import { motion } from "framer-motion"
import { HabitCard } from "../habits/HabitCard"
import { type Habit } from "../../types/habits"

interface HabitListProps {
  habits: Habit[]
}

export function HabitList({ habits }: HabitListProps) {
  return (
    <div className="space-y-4">
      {habits.map((habit, index) => (
        <motion.div
          key={habit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <HabitCard habit={habit} />
        </motion.div>
      ))}
    </div>
  )
}