"use client"

import { motion } from "framer-motion"

interface CommitData {
  date: string
  count: number
}

// Sample data - replace with actual GitHub API data
const commitData: CommitData[] = Array.from({ length: 365 }, (_, i) => ({
  date: new Date(Date.now() - (364 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  count: Math.floor(Math.random() * 5)
}))

export function GitHubStats() {
  const maxCommits = Math.max(...commitData.map(d => d.count))

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-xl font-semibold mb-4">GitHub Activity</h3>
      
      <div className="overflow-x-auto">
        <div className="inline-flex gap-1" style={{ minWidth: "max-content" }}>
          {commitData.map((data, index) => (
            <motion.div
              key={data.date}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.001 }}
              className={`w-3 h-3 rounded-sm ${
                data.count === 0 ? 'bg-slate-100' :
                data.count <= maxCommits / 3 ? 'bg-purple-200' :
                data.count <= (maxCommits * 2) / 3 ? 'bg-purple-400' :
                'bg-purple-600'
              }`}
              title={`${data.date}: ${data.count} commits`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <span>Less</span>
        <div className="w-3 h-3 bg-slate-100 rounded-sm" />
        <div className="w-3 h-3 bg-purple-200 rounded-sm" />
        <div className="w-3 h-3 bg-purple-400 rounded-sm" />
        <div className="w-3 h-3 bg-purple-600 rounded-sm" />
        <span>More</span>
      </div>
    </div>
  )
}