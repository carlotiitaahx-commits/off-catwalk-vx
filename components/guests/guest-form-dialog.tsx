'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormDialog } from '@/components/planner/form-dialog'
import { FormField, NativeSelect } from '@/components/planner/primitives'
import { createId } from '@/lib/store'
import {
  GUEST_CATEGORIES,
  GUEST_STATUSES,
  type Guest,
  type GuestCategory,
  type GuestStatus,
} from '@/lib/types'

type Values = Omit<Guest, 'id'>
type Errors = Partial<Record<keyof Values, string>>

const EMPTY: Values = { name: '', email: '', category: 'Press', status: 'Pending', notes: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function GuestFormDialog({
  open,
  onOpenChange,
  guest,
  existingGuests,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  guest: Guest | null
  existingGuests: Guest[]
  onSave: (guest: Guest) => void
}) {
  const [values, setValues] = useState<Values>(guest ?? EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = () => {
    const next: Errors = {}
    const email = values.email.trim().toLowerCase()
    if (!values.name.trim()) next.name = 'Please enter the guest’s name.'
    if (!email) next.email = 'Please enter an email address.'
    else if (!EMAIL_PATTERN.test(email)) next.email = 'Please enter a valid email address.'
    else if (existingGuests.some((g) => g.id !== guest?.id && g.email.toLowerCase() === email))
      next.email = 'A guest with this email is already on the list.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    onSave({
      id: guest?.id ?? createId(),
      name: values.name.trim(),
      email,
      category: values.category,
      status: values.status,
      notes: values.notes.trim(),
    })
  }

  const aria = (field: keyof Values) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `guest-${field}-error` : undefined,
  })

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={guest ? 'Edit guest' : 'Add guest'}
      description="Invitations, RSVPs and seating notes in one place."
      submitLabel={guest ? 'Save guest' : 'Add guest'}
      onSubmit={handleSubmit}
    >
      <FormField id="guest-name" label="Full name" required error={errors.name}>
        <Input
          id="guest-name"
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
          autoComplete="off"
          {...aria('name')}
        />
      </FormField>
      <FormField id="guest-email" label="Email" required error={errors.email}>
        <Input
          id="guest-email"
          type="email"
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
          autoComplete="off"
          {...aria('email')}
        />
      </FormField>
      <FormField id="guest-category" label="Category">
        <NativeSelect
          id="guest-category"
          value={values.category}
          onChange={(e) => set('category', e.target.value as GuestCategory)}
        >
          {GUEST_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField id="guest-status" label="Invitation status">
        <NativeSelect
          id="guest-status"
          value={values.status}
          onChange={(e) => set('status', e.target.value as GuestStatus)}
        >
          {GUEST_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField id="guest-notes" label="Notes" hint="Optional — seating, dietary needs, plus-ones." className="sm:col-span-2">
        <Textarea
          id="guest-notes"
          value={values.notes}
          onChange={(e) => set('notes', e.target.value)}
          rows={3}
        />
      </FormField>
    </FormDialog>
  )
}
