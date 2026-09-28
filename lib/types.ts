export const EVENT_TYPES = [
  'Collection Launch',
  'Fashion Show',
  'Press Day',
  'Showroom',
  'Cocktail Party',
  'Dinner',
  'Pop-up',
  'Other',
] as const

export const GUEST_CATEGORIES = ['Influencer', 'Press', 'VIP', 'Celebrity', 'Other'] as const
export const GUEST_STATUSES = ['Pending', 'Invited', 'Confirmed', 'Declined'] as const

export const TASK_PRIORITIES = ['Low', 'Medium', 'High'] as const
export const TASK_STATUSES = ['To Do', 'In Progress', 'Completed'] as const

export const EXPENSE_CATEGORIES = [
  'Venue',
  'Production',
  'Catering',
  'Styling & Beauty',
  'Talent',
  'PR & Media',
  'Logistics',
  'Other',
] as const

export type EventType = (typeof EVENT_TYPES)[number]
export type GuestCategory = (typeof GUEST_CATEGORIES)[number]
export type GuestStatus = (typeof GUEST_STATUSES)[number]
export type TaskPriority = (typeof TASK_PRIORITIES)[number]
export type TaskStatus = (typeof TASK_STATUSES)[number]
export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]

export interface EventDetails {
  name: string
  brand: string
  type: EventType
  date: string
  location: string
  description: string
  budget: number
}

export interface Guest {
  id: string
  name: string
  email: string
  category: GuestCategory
  status: GuestStatus
  notes: string
}

export interface Task {
  id: string
  title: string
  description: string
  assignee: string
  deadline: string
  priority: TaskPriority
  status: TaskStatus
}

export interface Expense {
  id: string
  description: string
  category: ExpenseCategory
  amount: number
  notes: string
}

export interface Activity {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
  description: string
}

export interface EventRecord {
  id: string
  details: EventDetails
  guests: Guest[]
  tasks: Task[]
  expenses: Expense[]
  activities: Activity[]
}

export interface AppData {
  version: 1
  activeEventId: string
  events: EventRecord[]
}

export type CollectionKey = 'guests' | 'tasks' | 'expenses' | 'activities'
export type CollectionItem<K extends CollectionKey> = EventRecord[K][number]
