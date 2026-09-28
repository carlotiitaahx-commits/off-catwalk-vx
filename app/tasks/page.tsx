import type { Metadata } from 'next'
import { TaskManagerView } from '@/components/tasks/task-manager-view'

export const metadata: Metadata = { title: 'Tasks' }

export default function TasksPage() {
  return <TaskManagerView />
}
