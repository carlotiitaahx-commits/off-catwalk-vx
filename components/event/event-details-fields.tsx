'use client'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField, NativeSelect } from '@/components/planner/primitives'
import { EVENT_TYPES, type EventDetails, type EventType } from '@/lib/types'

export interface EventFormValues {
  name: string
  brand: string
  type: EventType
  date: string
  location: string
  description: string
  budget: string
}

export type EventFormErrors = Partial<Record<keyof EventFormValues, string>>

export const emptyEventValues: EventFormValues = {
  name: '',
  brand: '',
  type: 'Collection Launch',
  date: '',
  location: '',
  description: '',
  budget: '',
}

export function toEventFormValues(details: EventDetails): EventFormValues {
  return { ...details, budget: String(details.budget) }
}

export function validateEvent(values: EventFormValues): {
  errors: EventFormErrors
  details: EventDetails | null
} {
  const errors: EventFormErrors = {}
  if (!values.name.trim()) errors.name = 'Please enter an event name.'
  if (!values.brand.trim()) errors.brand = 'Please enter the brand.'
  if (!values.date) errors.date = 'Please choose the event date.'
  const budget = Number(values.budget)
  if (values.budget.trim() === '' || Number.isNaN(budget)) errors.budget = 'Please enter a budget.'
  else if (budget < 0) errors.budget = 'The budget cannot be negative.'

  if (Object.keys(errors).length > 0) return { errors, details: null }
  return {
    errors,
    details: {
      name: values.name.trim(),
      brand: values.brand.trim(),
      type: values.type,
      date: values.date,
      location: values.location.trim(),
      description: values.description.trim(),
      budget: Math.round(budget * 100) / 100,
    },
  }
}

export function EventDetailsFields({
  idPrefix,
  values,
  errors,
  onChange,
}: {
  idPrefix: string
  values: EventFormValues
  errors: EventFormErrors
  onChange: (values: EventFormValues) => void
}) {
  const set = <K extends keyof EventFormValues>(key: K, value: EventFormValues[K]) =>
    onChange({ ...values, [key]: value })
  const id = (field: string) => `${idPrefix}-${field}`
  const aria = (field: keyof EventFormValues) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `${id(field)}-error` : undefined,
  })

  return (
    <>
      <FormField id={id('name')} label="Event name" required error={errors.name} className="sm:col-span-2">
        <Input
          id={id('name')}
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder="e.g. SS27 Runway Show"
          {...aria('name')}
        />
      </FormField>
      <FormField id={id('brand')} label="Brand" required error={errors.brand}>
        <Input
          id={id('brand')}
          value={values.brand}
          onChange={(e) => set('brand', e.target.value)}
          placeholder="e.g. Maison Aurèle"
          {...aria('brand')}
        />
      </FormField>
      <FormField id={id('type')} label="Event type">
        <NativeSelect
          id={id('type')}
          value={values.type}
          onChange={(e) => set('type', e.target.value as EventType)}
        >
          {EVENT_TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField id={id('date')} label="Date" required error={errors.date}>
        <Input
          id={id('date')}
          type="date"
          value={values.date}
          onChange={(e) => set('date', e.target.value)}
          {...aria('date')}
        />
      </FormField>
      <FormField id={id('budget')} label="Total budget (€)" required error={errors.budget}>
        <Input
          id={id('budget')}
          type="number"
          inputMode="decimal"
          min={0}
          step="0.01"
          value={values.budget}
          onChange={(e) => set('budget', e.target.value)}
          placeholder="0"
          {...aria('budget')}
        />
      </FormField>
      <FormField id={id('location')} label="Location" className="sm:col-span-2">
        <Input
          id={id('location')}
          value={values.location}
          onChange={(e) => set('location', e.target.value)}
          placeholder="Venue, city"
        />
      </FormField>
      <FormField id={id('description')} label="Description" className="sm:col-span-2">
        <Textarea
          id={id('description')}
          value={values.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Concept, mood and key moments of the event"
          rows={5}
        />
      </FormField>
    </>
  )
}
