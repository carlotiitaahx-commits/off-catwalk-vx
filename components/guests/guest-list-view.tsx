'use client'

import { useMemo, useState } from 'react'
import { Pencil, Plus, Search, Trash2, Users } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConfirmDelete } from '@/components/planner/confirm-delete'
import { EmptyState, FilterBar, NativeSelect, PageHeader, Tag } from '@/components/planner/primitives'
import { useActiveEvent } from '@/hooks/use-active-event'
import { actions } from '@/lib/store'
import { GUEST_CATEGORIES, GUEST_STATUSES, type Guest, type GuestStatus } from '@/lib/types'
import { GuestFormDialog } from './guest-form-dialog'

const STATUS_TONE: Record<GuestStatus, 'neutral' | 'dark' | 'taupe' | 'danger'> = {
  Pending: 'neutral',
  Invited: 'taupe',
  Confirmed: 'dark',
  Declined: 'danger',
}

export function GuestListView() {
  const event = useActiveEvent()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [status, setStatus] = useState('All')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Guest | null>(null)
  const [formKey, setFormKey] = useState(0)
  const [deleting, setDeleting] = useState<Guest | null>(null)

  const guests = event?.guests ?? []
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return guests
      .filter(
        (g) =>
          (category === 'All' || g.category === category) &&
          (status === 'All' || g.status === status) &&
          (!q ||
            g.name.toLowerCase().includes(q) ||
            g.email.toLowerCase().includes(q) ||
            g.notes.toLowerCase().includes(q)),
      )
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [guests, query, category, status])

  if (!event) return null

  const openForm = (guest: Guest | null) => {
    setEditing(guest)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  const counts = GUEST_STATUSES.map((s) => ({
    status: s,
    count: guests.filter((g) => g.status === s).length,
  }))
  const hasFilters = query !== '' || category !== 'All' || status !== 'All'

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="Guest list"
        title="The guest list"
        description="Press, talent and clients for this event. Search, filter and track every RSVP."
        actions={
          <Button onClick={() => openForm(null)}>
            <Plus aria-hidden="true" strokeWidth={1.25} />
            Add guest
          </Button>
        }
      />

      <div
        role="group"
        aria-label="Quick filter by invitation status"
        className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4"
      >
        {counts.map(({ status: s, count }) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(status === s ? 'All' : s)}
            aria-pressed={status === s}
            className="flex flex-col gap-2 bg-card p-5 text-left transition-colors outline-none hover:bg-ivory focus-visible:ring-2 focus-visible:ring-ring aria-pressed:bg-ivory aria-pressed:shadow-[inset_0_-2px_0_var(--foreground)]"
          >
            <span className="eyebrow">{s}</span>
            <span className="font-serif text-3xl font-light tabular-nums">{count}</span>
          </button>
        ))}
      </div>

      <FilterBar>
        <div className="relative sm:col-span-2 lg:col-span-1">
          <label htmlFor="guest-search" className="sr-only">
            Search guests
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="guest-search"
            type="search"
            placeholder="Search by name, email or notes"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <NativeSelect aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All categories</option>
          {GUEST_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </NativeSelect>
        <NativeSelect aria-label="Filter by invitation status" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All statuses</option>
          {GUEST_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </NativeSelect>
      </FilterBar>

      {guests.length === 0 ? (
        <EmptyState
          icon={Users}
          title="No guests yet"
          description="Start building your guest list with press, VIP clients and talent."
          action={<Button onClick={() => openForm(null)}>Add first guest</Button>}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No matching guests"
          description="Try a different search term or adjust your filters."
          action={
            hasFilters && (
              <Button
                variant="outline"
                onClick={() => {
                  setQuery('')
                  setCategory('All')
                  setStatus('All')
                }}
              >
                Clear filters
              </Button>
            )
          }
        />
      ) : (
        <div className="flex flex-col gap-3">
          <p className="text-xs text-muted-foreground" aria-live="polite">
            Showing {filtered.length} of {guests.length} guests
          </p>
          <ul className="flex flex-col border border-border bg-card">
            <li
              aria-hidden="true"
              className="hidden grid-cols-[1.4fr_1.4fr_120px_120px_88px] gap-4 border-b border-border px-6 py-3 text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase md:grid"
            >
              <span>Guest</span>
              <span>Email</span>
              <span>Category</span>
              <span>Status</span>
              <span className="text-right">Actions</span>
            </li>
            {filtered.map((guest) => (
              <li
                key={guest.id}
                className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-2 border-b border-border px-5 py-4 last:border-b-0 md:grid-cols-[1.4fr_1.4fr_120px_120px_88px] md:items-center md:px-6"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="truncate font-serif text-lg">{guest.name}</span>
                  {guest.notes && (
                    <span className="truncate text-xs text-muted-foreground">{guest.notes}</span>
                  )}
                </div>
                <a
                  href={`mailto:${guest.email}`}
                  className="col-span-2 row-start-2 truncate text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline md:col-span-1 md:row-start-auto"
                >
                  {guest.email}
                </a>
                <div className="col-span-2 row-start-3 flex gap-2 md:contents">
                  <span className="md:block">
                    <Tag tone="outline">{guest.category}</Tag>
                  </span>
                  <span className="md:block">
                    <Tag tone={STATUS_TONE[guest.status]}>{guest.status}</Tag>
                  </span>
                </div>
                <div className="col-start-2 row-start-1 flex justify-end gap-1 md:col-start-auto md:row-start-auto">
                  <Button variant="ghost" size="icon" onClick={() => openForm(guest)} aria-label={`Edit ${guest.name}`}>
                    <Pencil strokeWidth={1.25} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setDeleting(guest)} aria-label={`Delete ${guest.name}`}>
                    <Trash2 strokeWidth={1.25} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <GuestFormDialog
        key={formKey}
        open={formOpen}
        onOpenChange={setFormOpen}
        guest={editing}
        existingGuests={guests}
        onSave={(guest) => {
          actions.saveItem('guests', guest)
          toast.success(editing ? 'Guest updated' : 'Guest added')
          setFormOpen(false)
        }}
      />

      <ConfirmDelete
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Remove guest?"
        description={`${deleting?.name ?? 'This guest'} will be removed from the guest list.`}
        confirmLabel="Remove guest"
        onConfirm={() => {
          if (deleting) actions.deleteItem('guests', deleting.id)
          toast.success('Guest removed')
        }}
      />
    </div>
  )
}
