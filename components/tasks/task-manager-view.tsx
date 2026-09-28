'use client'

import { useMemo, useState } from 'react'
import { ClipboardList, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { ConfirmDelete } from '@/components/planner/confirm-delete'
import {
  EmptyState,
  FilterBar,
  NativeSelect,
  PageHeader,
  ProgressLine,
  Tag,
} from '@/components/planner/primitives'
import { useActiveEvent } from '@/hooks/use-active-event'
import { actions } from '@/lib/store'
import { computeStats, daysUntil, formatDate } from '@/lib/format'
import { TASK_PRIORITIES, TASK_STATUSES, type Task, type TaskPriority } from '@/lib/types'
import { cn } from '@/lib/utils'
import { TaskFormDialog } from './task-form-dialog'

const PRIORITY_RANK: Record<TaskPriority, number> = { High: 0, Medium: 1, Low: 2 }
const PRIORITY_TONE: Record<TaskPriority, 'dark' | 'taupe' | 'neutral'> = {
  High: 'dark',
  Medium: 'taupe',
  Low: 'neutral',
}

function TaskRow({
  task,
  onEdit,
  onDelete,
}: {
  task: Task
  onEdit: () => void
  onDelete: () => void
}) {
  const done = task.status === 'Completed'
  const days = daysUntil(task.deadline)
  const overdue = !done && days !== null && days < 0
  const checkboxId = `task-done-${task.id}`

  return (
    <li className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 border-b border-border bg-card px-5 py-5 last:border-b-0 md:px-6">
      <Checkbox
        id={checkboxId}
        checked={done}
        onCheckedChange={(checked) => {
          actions.saveItem('tasks', { ...task, status: checked ? 'Completed' : 'To Do' })
          toast.success(checked ? 'Task completed' : 'Task reopened')
        }}
        className="mt-1 size-5"
        aria-label={done ? `Mark “${task.title}” as not completed` : `Mark “${task.title}” as completed`}
      />
      <div className="flex min-w-0 flex-col gap-2">
        <label
          htmlFor={checkboxId}
          className={cn(
            'cursor-pointer font-serif text-xl leading-snug transition-colors',
            done && 'text-muted-foreground line-through decoration-taupe decoration-1',
          )}
        >
          {task.title}
        </label>
        {task.description && (
          <p className="text-sm text-pretty text-muted-foreground">{task.description}</p>
        )}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-muted-foreground">
          <Tag tone={PRIORITY_TONE[task.priority]}>{task.priority}</Tag>
          <Tag tone={done ? 'outline' : 'neutral'}>{task.status}</Tag>
          <span>{task.assignee}</span>
          <span className={cn('tabular-nums', overdue && 'font-medium text-destructive')}>
            {overdue ? 'Overdue · ' : 'Due '}
            {formatDate(task.deadline, 'short')}
          </span>
        </div>
      </div>
      <div className="flex gap-1">
        <Button variant="ghost" size="icon" onClick={onEdit} aria-label={`Edit ${task.title}`}>
          <Pencil strokeWidth={1.25} />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete} aria-label={`Delete ${task.title}`}>
          <Trash2 strokeWidth={1.25} />
        </Button>
      </div>
    </li>
  )
}

export function TaskManagerView() {
  const event = useActiveEvent()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('All')
  const [priority, setPriority] = useState('All')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [formKey, setFormKey] = useState(0)
  const [deleting, setDeleting] = useState<Task | null>(null)

  const tasks = event?.tasks ?? []
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return tasks
      .filter(
        (t) =>
          (status === 'All' || t.status === status) &&
          (priority === 'All' || t.priority === priority) &&
          (!q ||
            t.title.toLowerCase().includes(q) ||
            t.assignee.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)),
      )
      .sort(
        (a, b) =>
          Number(a.status === 'Completed') - Number(b.status === 'Completed') ||
          a.deadline.localeCompare(b.deadline) ||
          PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority],
      )
  }, [tasks, query, status, priority])

  if (!event) return null

  const stats = computeStats(event)
  const openForm = (task: Task | null) => {
    setEditing(task)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="Task manager"
        title="Production tasks"
        description="Every detail, from casting to press kits. Completing tasks advances the event progress."
        actions={
          <Button onClick={() => openForm(null)}>
            <Plus aria-hidden="true" strokeWidth={1.25} />
            Add task
          </Button>
        }
      />

      <section aria-label="Task progress" className="flex flex-col gap-4 border border-border bg-card p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="eyebrow">Event progress</span>
            <span className="font-serif text-5xl font-light tabular-nums">{stats.progress}%</span>
          </div>
          <div className="flex gap-8 text-sm">
            <div className="flex flex-col">
              <span className="font-serif text-2xl tabular-nums">{stats.completedTasks}</span>
              <span className="text-xs text-muted-foreground">Completed</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl tabular-nums">{stats.pendingTasks}</span>
              <span className="text-xs text-muted-foreground">Pending</span>
            </div>
          </div>
        </div>
        <ProgressLine value={stats.progress} label="Event progress based on completed tasks" />
      </section>

      <FilterBar>
        <div className="relative sm:col-span-2 lg:col-span-1">
          <label htmlFor="task-search" className="sr-only">
            Search tasks
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="task-search"
            type="search"
            placeholder="Search by title, assignee or description"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <NativeSelect aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All statuses</option>
          {TASK_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </NativeSelect>
        <NativeSelect aria-label="Filter by priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="All">All priorities</option>
          {TASK_PRIORITIES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </NativeSelect>
      </FilterBar>

      {tasks.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No tasks yet"
          description="Break the production down into tasks and assign them to your team."
          action={<Button onClick={() => openForm(null)}>Add first task</Button>}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matching tasks"
          description="Try a different search term or adjust your filters."
          action={
            <Button
              variant="outline"
              onClick={() => {
                setQuery('')
                setStatus('All')
                setPriority('All')
              }}
            >
              Clear filters
            </Button>
          }
        />
      ) : (
        <ul className="flex flex-col border border-border">
          {filtered.map((task) => (
            <TaskRow
              key={task.id}
              task={task}
              onEdit={() => openForm(task)}
              onDelete={() => setDeleting(task)}
            />
          ))}
        </ul>
      )}

      <TaskFormDialog
        key={formKey}
        open={formOpen}
        onOpenChange={setFormOpen}
        task={editing}
        onSave={(task) => {
          actions.saveItem('tasks', task)
          toast.success(editing ? 'Task updated' : 'Task added')
          setFormOpen(false)
        }}
      />

      <ConfirmDelete
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete task?"
        description={`“${deleting?.title ?? 'This task'}” will be permanently deleted.`}
        confirmLabel="Delete task"
        onConfirm={() => {
          if (deleting) actions.deleteItem('tasks', deleting.id)
          toast.success('Task deleted')
        }}
      />
    </div>
  )
}
