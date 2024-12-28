"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { type Habit } from "@/types/habits"

interface AddHabitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (habit: Omit<Habit, "id" | "status" | "progress">) => void
}

export function AddHabitDialog({ open, onOpenChange, onSubmit }: AddHabitDialogProps) {
  const [step, setStep] = useState(1)
  const [habitData, setHabitData] = useState({
    title: "",
    time: "",
    stake: "",
    duration: "",
    repetition: [] as string[]
  })

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const handleSubmit = () => {
    onSubmit(habitData)
    onOpenChange(false)
    setStep(1)
    setHabitData({
      title: "",
      time: "",
      stake: "",
      duration: "",
      repetition: []
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Habit Challenge</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <div className="flex items-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= s ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-400"
                }`}>
                  {s}
                </div>
                {s < 3 && (
                  <div className={`w-20 h-1 ${
                    step > s ? "bg-purple-600" : "bg-slate-100"
                  }`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Challenge Title</label>
                <input
                  type="text"
                  className="w-full p-2 rounded-lg border border-slate-200"
                  value={habitData.title}
                  onChange={(e) => setHabitData({ ...habitData, title: e.target.value })}
                  placeholder="e.g., Morning Meditation"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Challenge Time</label>
                <input
                  type="time"
                  className="w-full p-2 rounded-lg border border-slate-200"
                  value={habitData.time}
                  onChange={(e) => setHabitData({ ...habitData, time: e.target.value })}
                />
              </div>
              <Button onClick={() => setStep(2)} className="w-full">Next</Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Stake Amount (ETH)</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg border border-slate-200"
                  value={habitData.stake}
                  onChange={(e) => setHabitData({ ...habitData, stake: e.target.value + " ETH" })}
                  placeholder="1.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input
                  type="date"
                  className="w-full p-2 rounded-lg border border-slate-200"
                  value={habitData.duration}
                  onChange={(e) => setHabitData({ ...habitData, duration: e.target.value })}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Next</Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-2">Repetition</label>
                <div className="flex flex-wrap gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => {
                        const newRepetition = habitData.repetition.includes(day)
                          ? habitData.repetition.filter(d => d !== day)
                          : [...habitData.repetition, day]
                        setHabitData({ ...habitData, repetition: newRepetition })
                      }}
                      className={`px-4 py-2 rounded-full ${
                        habitData.repetition.includes(day)
                          ? "bg-purple-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={handleSubmit}>Create Habit</Button>
              </div>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}