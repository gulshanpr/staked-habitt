export interface Habit {
    id: string
    title: string
    status: 'Completed' | 'In Progress' | 'Pending'
    progress: number
    stake: string
    time: string
    duration: string
    repetition: string[]
  }