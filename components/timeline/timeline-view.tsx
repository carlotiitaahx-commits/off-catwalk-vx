'use client'

import { useState } from 'react'
import { CalendarClock, MapPin, Pencil, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { ConfirmDelete } from '@/components/planner/confirm-delete'
import { EmptyState, PageHeader } from '@/components/planner/primitives'
import { useActiveEvent } from '@/hooks/use-active-event'
import { actions } from '@/lib/store'
import { formatDate, sortActivities } from '@/lib/format'
import type { Activity } from '@/lib/types'
import { ActivityFormDialog } from './activity-form-dialog'

function durationLabel(start: string, end: string) {
  const [sh, sm] = start.split(':').map(Number)
  const [eh, em] = end.split(':').map(Number)
  const minutes = eh * 60 + em - (sh * 60 + sm)
  if (!Number.isFinite(minutes) || minutes <= 0) return ''
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return [h ? `${h}h` : '', m ? `${m}min` : ''].filter(Boolean).join(' ')
}

export function TimelineView() {
  const event = useActiveEvent()
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Activity | null>(null)
  const [formKey, setFormKey] = useState(0)
  const [deleting, setDeleting] = useState<Activity | null>(null)

  if (!event) return null

  const sorted = sortActivities(event.activities)
  const groups = sorted.reduce<{ date: string; items: Activity[] }[]>((acc, activity) => {
    const last = acc[acc.length - 1]
    if (last && last.date === activity.date) last.items.push(activity)
    else acc.push({ date: activity.date, items: [activity] })
    return acc
  }, [])

  const openForm = (activity: Activity | null) => {
    setEditing(activity)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="Event timeline"
        title="Run of show"
        description="The minute-by-minute schedule, from load-in to the last guest leaving. Displayed chronologically."
        actions={
          <Button onClick={() => openForm(null)}>
            <Plus aria-hidden="true" strokeWidth={1.25} />
            Add activity
          </Button>
        }
      />

      {sorted.length === 0 ? (
        <EmptyState
          icon={CalendarClock}
          title="The schedule is empty"
          description="Add activities such as load-in, rehearsals, reception and the show itself."
          action={<Button onClick={() => openForm(null)}>Add first activity</Button>}
        />
      ) : (
        <div className="flex flex-col gap-12">
          {groups.map((group) => (
            <section key={group.date} aria-label={formatDate(group.date)} className="flex flex-col gap-6">
              <h2 className="flex items-center gap-4 font-serif text-2xl font-light md:text-3xl">
                {formatDate(group.date)}
                {group.date === event.details.date && <span className="eyebrow">Event day</span>}
              </h2>
              <ol className="relative flex flex-col border-l border-border pl-0">
                {group.items.map((activity) => (
                  <li
                    key={activity.id}
                    className="relative grid gap-3 pb-8 pl-8 last:pb-0 md:grid-cols-[140px_1fr_auto] md:gap-8 md:pl-10"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-2 -left-[5px] size-[9px] border border-foreground bg-background"
                    />
                    <div className="flex flex-col">
                      <span className="font-serif text-3xl leading-none tabular-nums">
                        {activity.startTime}
                      </span>
                      <span className="mt-1 text-xs text-muted-foreground tabular-nums">
                        until {activity.endTime}
                        {durationLabel(activity.startTime, activity.endTime) &&
                          ` · ${durationLabel(activity.startTime, activity.endTime)}`}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-col gap-2 border-b border-border pb-6 md:pb-8">
                      <h3 className="text-base font-medium">{activity.title}</h3>
                      {activity.location && (
                        <span className="flex items-center gap-2 text-xs tracking-[0.14em] text-taupe-deep uppercase">
                          <MapPin aria-hidden="true" className="size-3.5" strokeWidth={1.25} />
                          {activity.location}
                        </span>
                      )}
                      {activity.description && (
                        <p className="text-sm text-pretty text-muted-foreground">{activity.description}</p>
                      )}
                    </div>
                    <div className="flex gap-1 md:self-start">
                      <Button variant="ghost" size="icon" onClick={() => openForm(activity)} aria-label={`Edit ${activity.title}`}>
                        <Pencil strokeWidth={1.25} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleting(activity)} aria-label={`Delete ${activity.title}`}>
                        <Trash2 strokeWidth={1.25} />
                      </Button>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}

      <ActivityFormDialog
        key={formKey}
        open={formOpen}
        onOpenChange={setFormOpen}
        activity={editing}
        defaultDate={event.details.date}
        onSave={(activity) => {
          actions.saveItem('activities', activity)
          toast.success(editing ? 'Activity updated' : 'Activity added')
          setFormOpen(false)
        }}
      />

      <ConfirmDelete
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete activity?"
        description={`“${deleting?.title ?? 'This activity'}” will be removed from the timeline.`}
        confirmLabel="Delete activity"
        onConfirm={() => {
          if (deleting) actions.deleteItem('activities', deleting.id)
          toast.success('Activity deleted')
        }}
      />
    </div>
  )
}
