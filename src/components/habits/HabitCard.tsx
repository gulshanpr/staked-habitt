"use client"

import { type Habit } from "../../types/habits"

interface HabitCardProps {
  habit: Habit
}

export function HabitCard({ habit }: HabitCardProps) {
  return (
    <div className="p-4 border border-slate-200 rounded-xl hover:border-purple-200 transition-colors">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium">{habit.title}</h4>
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
  )
}