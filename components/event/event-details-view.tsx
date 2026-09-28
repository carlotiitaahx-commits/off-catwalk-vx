'use client'

import { useState, type FormEvent } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Plus, RotateCcw, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmDelete } from '@/components/planner/confirm-delete'
import { FormDialog } from '@/components/planner/form-dialog'
import { PageHeader } from '@/components/planner/primitives'
import { useActiveEvent } from '@/hooks/use-active-event'
import { actions } from '@/lib/store'
import { formatCurrency, formatDate } from '@/lib/format'
import type { EventRecord } from '@/lib/types'
import {
  EventDetailsFields,
  emptyEventValues,
  toEventFormValues,
  validateEvent,
  type EventFormErrors,
  type EventFormValues,
} from './event-details-fields'

function EditEventForm({ event }: { event: EventRecord }) {
  const [values, setValues] = useState<EventFormValues>(() => toEventFormValues(event.details))
  const [errors, setErrors] = useState<EventFormErrors>({})
  const initial = toEventFormValues(event.details)
  const isDirty = (Object.keys(values) as (keyof EventFormValues)[]).some(
    (key) => values[key] !== initial[key],
  )

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = validateEvent(values)
    setErrors(result.errors)
    if (!result.details) return
    actions.updateEventDetails(result.details)
    setValues(toEventFormValues(result.details))
    toast.success('Event details saved')
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="border border-border bg-card">
      <div className="border-b border-border px-6 py-5 md:px-8">
        <h2 className="font-serif text-2xl font-light">Edit details</h2>
      </div>
      <div className="grid gap-6 px-6 py-8 sm:grid-cols-2 md:px-8">
        <EventDetailsFields idPrefix="edit-event" values={values} errors={errors} onChange={setValues} />
      </div>
      <div className="flex flex-col-reverse gap-2 border-t border-border bg-ivory px-6 py-4 sm:flex-row sm:justify-end md:px-8">
        <Button
          type="button"
          variant="outline"
          disabled={!isDirty}
          onClick={() => {
            setValues(initial)
            setErrors({})
          }}
        >
          Discard changes
        </Button>
        <Button type="submit" disabled={!isDirty}>
          Save changes
        </Button>
      </div>
    </form>
  )
}

function EventSummary({ event }: { event: EventRecord }) {
  const items = [
    { label: 'Brand', value: event.details.brand },
    { label: 'Type', value: event.details.type },
    { label: 'Date', value: formatDate(event.details.date) },
    { label: 'Location', value: event.details.location || '—' },
    { label: 'Total budget', value: formatCurrency(event.details.budget) },
  ]
  return (
    <aside className="flex flex-col gap-6 self-start border border-border bg-ivory p-6 md:p-8">
      <p className="eyebrow">At a glance</p>
      <dl className="flex flex-col divide-y divide-border">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col gap-1 py-3 first:pt-0">
            <dt className="text-[0.62rem] tracking-[0.2em] text-muted-foreground uppercase">
              {item.label}
            </dt>
            <dd className="font-serif text-lg">{item.value}</dd>
          </div>
        ))}
      </dl>
      {event.details.description && (
        <p className="border-t border-border pt-6 font-serif text-lg leading-relaxed text-pretty italic">
          {event.details.description}
        </p>
      )}
    </aside>
  )
}

export function EventDetailsView() {
  const event = useActiveEvent()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const createOpen = searchParams.get('new') === '1'
  const [newValues, setNewValues] = useState<EventFormValues>(emptyEventValues)
  const [newErrors, setNewErrors] = useState<EventFormErrors>({})
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!event) return null

  const setCreateOpen = (open: boolean) => {
    if (!open) {
      setNewValues(emptyEventValues)
      setNewErrors({})
    }
    router.replace(open ? `${pathname}?new=1` : pathname, { scroll: false })
  }

  const handleCreate = () => {
    const result = validateEvent(newValues)
    setNewErrors(result.errors)
    if (!result.details) return
    actions.createEvent(result.details)
    toast.success(`“${result.details.name}” created`)
    setNewValues(emptyEventValues)
    router.push('/')
  }

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="Event details"
        title={event.details.name}
        description="Define the essentials of your event. Changes are reflected across the dashboard, budget and timeline."
        actions={
          <>
            <Button variant="outline" onClick={() => setConfirmDelete(true)}>
              <Trash2 aria-hidden="true" strokeWidth={1.25} />
              Delete event
            </Button>
            <Button onClick={() => setCreateOpen(true)}>
              <Plus aria-hidden="true" strokeWidth={1.25} />
              New event
            </Button>
          </>
        }
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <EditEventForm key={event.id} event={event} />
        <div className="flex flex-col gap-4">
          <EventSummary event={event} />
          <Button
            variant="ghost"
            className="self-start text-muted-foreground"
            onClick={() => {
              actions.restoreDemoEvent()
              toast.success('Demo event restored')
            }}
          >
            <RotateCcw aria-hidden="true" strokeWidth={1.25} />
            Restore demo event
          </Button>
        </div>
      </div>

      <FormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        title="New event"
        description="Create a new event. You can switch between events from the sidebar."
        submitLabel="Create event"
        onSubmit={handleCreate}
      >
        <EventDetailsFields
          idPrefix="new-event"
          values={newValues}
          errors={newErrors}
          onChange={setNewValues}
        />
      </FormDialog>

      <ConfirmDelete
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title="Delete this event?"
        description={`“${event.details.name}” and all of its guests, tasks, expenses and timeline activities will be permanently removed.`}
        confirmLabel="Delete event"
        onConfirm={() => {
          actions.deleteActiveEvent()
          toast.success('Event deleted')
          router.push('/')
        }}
      />
    </div>
  )
}
