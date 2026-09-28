'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormDialog } from '@/components/planner/form-dialog'
import { FormField } from '@/components/planner/primitives'
import { createId } from '@/lib/store'
import type { Activity } from '@/lib/types'

type Values = Omit<Activity, 'id'>
type Errors = Partial<Record<keyof Values, string>>

export function ActivityFormDialog({
  open,
  onOpenChange,
  activity,
  defaultDate,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  activity: Activity | null
  defaultDate: string
  onSave: (activity: Activity) => void
}) {
  const [values, setValues] = useState<Values>(
    activity ?? {
      title: '',
      date: defaultDate,
      startTime: '',
      endTime: '',
      location: '',
      description: '',
    },
  )
  const [errors, setErrors] = useState<Errors>({})
  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = () => {
    const next: Errors = {}
    if (!values.title.trim()) next.title = 'Please enter an activity title.'
    if (!values.date) next.date = 'Please choose a date.'
    if (!values.startTime) next.startTime = 'Please set a start time.'
    if (!values.endTime) next.endTime = 'Please set an end time.'
    else if (values.startTime && values.endTime <= values.startTime)
      next.endTime = 'End time must be after the start time.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    onSave({
      id: activity?.id ?? createId(),
      ...values,
      title: values.title.trim(),
      location: values.location.trim(),
      description: values.description.trim(),
    })
  }

  const aria = (field: keyof Values) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `activity-${field}-error` : undefined,
  })

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={activity ? 'Edit activity' : 'New activity'}
      description="Activities are displayed chronologically on the run of show."
      submitLabel={activity ? 'Save activity' : 'Add activity'}
      onSubmit={handleSubmit}
    >
      <FormField id="activity-title" label="Title" required error={errors.title} className="sm:col-span-2">
        <Input id="activity-title" value={values.title} onChange={(e) => set('title', e.target.value)} {...aria('title')} />
      </FormField>
      <FormField id="activity-date" label="Date" required error={errors.date} className="sm:col-span-2">
        <Input id="activity-date" type="date" value={values.date} onChange={(e) => set('date', e.target.value)} {...aria('date')} />
      </FormField>
      <FormField id="activity-startTime" label="Start time" required error={errors.startTime}>
        <Input
          id="activity-startTime"
          type="time"
          value={values.startTime}
          onChange={(e) => set('startTime', e.target.value)}
          {...aria('startTime')}
        />
      </FormField>
      <FormField id="activity-endTime" label="End time" required error={errors.endTime}>
        <Input
          id="activity-endTime"
          type="time"
          value={values.endTime}
          onChange={(e) => set('endTime', e.target.value)}
          {...aria('endTime')}
        />
      </FormField>
      <FormField id="activity-location" label="Location" className="sm:col-span-2">
        <Input
          id="activity-location"
          value={values.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="e.g. Backstage, Main hall"
        />
      </FormField>
      <FormField id="activity-description" label="Description" className="sm:col-span-2">
        <Textarea
          id="activity-description"
          value={values.description}
          onChange={(e) => set('description', e.target.value)}
          rows={3}
        />
      </FormField>
    </FormDialog>
  )
}
