'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormDialog } from '@/components/planner/form-dialog'
import { FormField, NativeSelect } from '@/components/planner/primitives'
import { createId } from '@/lib/store'
import {
  TASK_PRIORITIES,
  TASK_STATUSES,
  type Task,
  type TaskPriority,
  type TaskStatus,
} from '@/lib/types'

type Values = Omit<Task, 'id'>
type Errors = Partial<Record<keyof Values, string>>

const EMPTY: Values = {
  title: '',
  description: '',
  assignee: '',
  deadline: '',
  priority: 'Medium',
  status: 'To Do',
}

export function TaskFormDialog({
  open,
  onOpenChange,
  task,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  task: Task | null
  onSave: (task: Task) => void
}) {
  const [values, setValues] = useState<Values>(task ?? EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = () => {
    const next: Errors = {}
    if (!values.title.trim()) next.title = 'Please enter a task title.'
    if (!values.assignee.trim()) next.assignee = 'Please assign this task to someone.'
    if (!values.deadline) next.deadline = 'Please choose a deadline.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    onSave({
      id: task?.id ?? createId(),
      ...values,
      title: values.title.trim(),
      description: values.description.trim(),
      assignee: values.assignee.trim(),
    })
  }

  const aria = (field: keyof Values) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `task-${field}-error` : undefined,
  })

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={task ? 'Edit task' : 'New task'}
      description="Assign responsibilities and keep the production on schedule."
      submitLabel={task ? 'Save task' : 'Add task'}
      onSubmit={handleSubmit}
    >
      <FormField id="task-title" label="Title" required error={errors.title} className="sm:col-span-2">
        <Input id="task-title" value={values.title} onChange={(e) => set('title', e.target.value)} {...aria('title')} />
      </FormField>
      <FormField id="task-assignee" label="Assigned to" required error={errors.assignee}>
        <Input
          id="task-assignee"
          value={values.assignee}
          onChange={(e) => set('assignee', e.target.value)}
          placeholder="Team member"
          {...aria('assignee')}
        />
      </FormField>
      <FormField id="task-deadline" label="Deadline" required error={errors.deadline}>
        <Input
          id="task-deadline"
          type="date"
          value={values.deadline}
          onChange={(e) => set('deadline', e.target.value)}
          {...aria('deadline')}
        />
      </FormField>
      <FormField id="task-priority" label="Priority">
        <NativeSelect
          id="task-priority"
          value={values.priority}
          onChange={(e) => set('priority', e.target.value as TaskPriority)}
        >
          {TASK_PRIORITIES.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField id="task-status" label="Status">
        <NativeSelect
          id="task-status"
          value={values.status}
          onChange={(e) => set('status', e.target.value as TaskStatus)}
        >
          {TASK_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField id="task-description" label="Description" className="sm:col-span-2">
        <Textarea
          id="task-description"
          value={values.description}
          onChange={(e) => set('description', e.target.value)}
          rows={3}
        />
      </FormField>
    </FormDialog>
  )
}
