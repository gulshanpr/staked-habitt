"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface ContributionDay {
    date: string
    count: number
    level: number
}

export function ActivityGraph() {
    const [contributions, setContributions] = useState<ContributionDay[]>([])
    
    useEffect(() => {
        // In a real app, fetch this data from GitHub API
        const generateMockData = () => {
            const days = 365 // GitHub shows roughly 371 days
            const today = new Date()
            const data: ContributionDay[] = []
            
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(today)
                date.setDate(date.getDate() - i)
                
                // Generate random contribution count (0-30)
                const count = Math.floor(Math.random() * 31)
                
                // Determine level based on count (similar to GitHub)
                const level = count === 0 ? 0 :
                                         count <= 3 ? 1 :
                                         count <= 6 ? 2 :
                                         count <= 9 ? 3 : 4

                data.push({
                    date: date.toISOString().split('T')[0],
                    count,
                    level
                })
            }
            
            setContributions(data)
        }

        generateMockData()
    }, [])

    const getColorForLevel = (level: number) => {
        switch (level) {
            case 0: return 'bg-slate-100'
            case 1: return 'bg-emerald-100'
            case 2: return 'bg-emerald-300'
            case 3: return 'bg-emerald-500'
            case 4: return 'bg-emerald-700'
            default: return 'bg-slate-100'
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-xl font-semibold mb-4">GitHub Activity</h3>
            
            <div className="overflow-x-auto">
                <div className="inline-grid grid-rows-7 gap-1" style={{ gridTemplateColumns: 'repeat(53, minmax(0, 1fr))' }}>
                    {contributions.map((day, index) => (
                        <motion.div
                            key={day.date}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.001 }}
                            className={`w-3 h-3 rounded-sm ${getColorForLevel(day.level)}`}
                            title={`${day.date}: ${day.count} contributions`}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                    <div
                        key={level}
                        className={`w-3 h-3 ${getColorForLevel(level)} rounded-sm`}
                    />
                ))}
                <span>More</span>
            </div>
        </div>
    )
}