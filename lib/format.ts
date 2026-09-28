import type { Activity, EventRecord } from './types'

const currencyFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
})

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

function parseLocalDate(isoDate: string) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, (month ?? 1) - 1, day ?? 1)
}

export function formatDate(isoDate: string, style: 'long' | 'short' = 'long') {
  if (!isoDate) return '—'
  return parseLocalDate(isoDate).toLocaleDateString('en-GB', {
    weekday: style === 'long' ? 'long' : undefined,
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  })
}

export function daysUntil(isoDate: string) {
  if (!isoDate) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = parseLocalDate(isoDate).getTime() - today.getTime()
  return Math.round(diff / 86_400_000)
}

export function activityStart(activity: Activity) {
  return new Date(`${activity.date}T${activity.startTime || '00:00'}`)
}

export function sortActivities(activities: Activity[]) {
  return [...activities].sort(
    (a, b) =>
      activityStart(a).getTime() - activityStart(b).getTime() ||
      a.endTime.localeCompare(b.endTime),
  )
}

export function computeStats(event: EventRecord) {
  const confirmedGuests = event.guests.filter((g) => g.status === 'Confirmed').length
  const declinedGuests = event.guests.filter((g) => g.status === 'Declined').length
  const completedTasks = event.tasks.filter((t) => t.status === 'Completed').length
  const totalExpenses = event.expenses.reduce((sum, e) => sum + e.amount, 0)
  const budget = event.details.budget
  const now = Date.now()
  const upcomingActivities = sortActivities(event.activities).filter(
    (a) => new Date(`${a.date}T${a.endTime || a.startTime}`).getTime() >= now,
  )

  return {
    totalGuests: event.guests.length,
    confirmedGuests,
    declinedGuests,
    awaitingGuests: event.guests.length - confirmedGuests - declinedGuests,
    totalTasks: event.tasks.length,
    completedTasks,
    pendingTasks: event.tasks.length - completedTasks,
    progress: event.tasks.length ? Math.round((completedTasks / event.tasks.length) * 100) : 0,
    budget,
    totalExpenses,
    remainingBudget: budget - totalExpenses,
    budgetUsed: budget > 0 ? Math.round((totalExpenses / budget) * 100) : 0,
    upcomingActivities,
  }
}
