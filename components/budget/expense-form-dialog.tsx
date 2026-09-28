'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormDialog } from '@/components/planner/form-dialog'
import { FormField, NativeSelect } from '@/components/planner/primitives'
import { createId } from '@/lib/store'
import { EXPENSE_CATEGORIES, type Expense, type ExpenseCategory } from '@/lib/types'

interface Values {
  description: string
  category: ExpenseCategory
  amount: string
  notes: string
}
type Errors = Partial<Record<keyof Values, string>>

const EMPTY: Values = { description: '', category: 'Venue', amount: '', notes: '' }

export function ExpenseFormDialog({
  open,
  onOpenChange,
  expense,
  onSave,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense: Expense | null
  onSave: (expense: Expense) => void
}) {
  const [values, setValues] = useState<Values>(
    expense ? { ...expense, amount: String(expense.amount) } : EMPTY,
  )
  const [errors, setErrors] = useState<Errors>({})
  const set = <K extends keyof Values>(key: K, value: Values[K]) =>
    setValues((v) => ({ ...v, [key]: value }))

  const handleSubmit = () => {
    const next: Errors = {}
    const amount = Number(values.amount)
    if (!values.description.trim()) next.description = 'Please describe the expense.'
    if (values.amount.trim() === '' || Number.isNaN(amount)) next.amount = 'Please enter an amount.'
    else if (amount <= 0) next.amount = 'The amount must be greater than zero.'
    setErrors(next)
    if (Object.keys(next).length > 0) return
    onSave({
      id: expense?.id ?? createId(),
      description: values.description.trim(),
      category: values.category,
      amount: Math.round(amount * 100) / 100,
      notes: values.notes.trim(),
    })
  }

  const aria = (field: keyof Values) => ({
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `expense-${field}-error` : undefined,
  })

  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={expense ? 'Edit expense' : 'Add expense'}
      description="All amounts are in euros."
      submitLabel={expense ? 'Save expense' : 'Add expense'}
      onSubmit={handleSubmit}
    >
      <FormField id="expense-description" label="Description" required error={errors.description} className="sm:col-span-2">
        <Input
          id="expense-description"
          value={values.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="e.g. Florals for the dinner table"
          {...aria('description')}
        />
      </FormField>
      <FormField id="expense-category" label="Category">
        <NativeSelect
          id="expense-category"
          value={values.category}
          onChange={(e) => set('category', e.target.value as ExpenseCategory)}
        >
          {EXPENSE_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </NativeSelect>
      </FormField>
      <FormField id="expense-amount" label="Amount (€)" required error={errors.amount}>
        <Input
          id="expense-amount"
          type="number"
          inputMode="decimal"
          min={0}
          step="0.01"
          value={values.amount}
          onChange={(e) => set('amount', e.target.value)}
          placeholder="0.00"
          {...aria('amount')}
        />
      </FormField>
      <FormField id="expense-notes" label="Notes" hint="Optional — supplier, payment status, invoice number." className="sm:col-span-2">
        <Textarea id="expense-notes" value={values.notes} onChange={(e) => set('notes', e.target.value)} rows={3} />
      </FormField>
    </FormDialog>
  )
}
