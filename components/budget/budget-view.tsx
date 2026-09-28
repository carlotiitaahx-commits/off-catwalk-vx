'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Pencil, Plus, Search, Trash2, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConfirmDelete } from '@/components/planner/confirm-delete'
import {
  EmptyState,
  NativeSelect,
  PageHeader,
  ProgressLine,
  Tag,
} from '@/components/planner/primitives'
import { useActiveEvent } from '@/hooks/use-active-event'
import { actions } from '@/lib/store'
import { computeStats, formatCurrency } from '@/lib/format'
import { EXPENSE_CATEGORIES, type Expense } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ExpenseFormDialog } from './expense-form-dialog'

export function BudgetView() {
  const event = useActiveEvent()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Expense | null>(null)
  const [formKey, setFormKey] = useState(0)
  const [deleting, setDeleting] = useState<Expense | null>(null)

  const expenses = event?.expenses ?? []
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return expenses
      .filter(
        (e) =>
          (category === 'All' || e.category === category) &&
          (!q || e.description.toLowerCase().includes(q) || e.notes.toLowerCase().includes(q)),
      )
      .sort((a, b) => b.amount - a.amount)
  }, [expenses, query, category])

  if (!event) return null

  const stats = computeStats(event)
  const overBudget = stats.remainingBudget < 0
  const filteredTotal = filtered.reduce((sum, e) => sum + e.amount, 0)
  const byCategory = EXPENSE_CATEGORIES.map((c) => ({
    category: c,
    total: expenses.filter((e) => e.category === c).reduce((sum, e) => sum + e.amount, 0),
  }))
    .filter((c) => c.total > 0)
    .sort((a, b) => b.total - a.total)

  const openForm = (expense: Expense | null) => {
    setEditing(expense)
    setFormKey((k) => k + 1)
    setFormOpen(true)
  }

  return (
    <div className="flex flex-col gap-10">
      <PageHeader
        eyebrow="Budget control"
        title="Budget & expenses"
        description="Track every line item against your total budget. All figures are calculated live."
        actions={
          <Button onClick={() => openForm(null)}>
            <Plus aria-hidden="true" strokeWidth={1.25} />
            Add expense
          </Button>
        }
      />

      <section aria-label="Budget summary" className="flex flex-col gap-6 border border-border bg-card p-6 md:p-8">
        <dl className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <dt className="eyebrow">Total budget</dt>
            <dd className="font-serif text-3xl font-light tabular-nums md:text-4xl">
              {formatCurrency(stats.budget)}
            </dd>
            <dd>
              <Link href="/event" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
                Edit total budget
              </Link>
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="eyebrow">Total expenses</dt>
            <dd className="font-serif text-3xl font-light tabular-nums md:text-4xl">
              {formatCurrency(stats.totalExpenses)}
            </dd>
            <dd className="text-xs text-muted-foreground">
              {expenses.length} {expenses.length === 1 ? 'item' : 'items'}
            </dd>
          </div>
          <div className="flex flex-col gap-2">
            <dt className="eyebrow">Remaining budget</dt>
            <dd
              className={cn(
                'font-serif text-3xl font-light tabular-nums md:text-4xl',
                overBudget && 'text-destructive',
              )}
            >
              {formatCurrency(stats.remainingBudget)}
            </dd>
            <dd className={cn('text-xs', overBudget ? 'text-destructive' : 'text-muted-foreground')}>
              {overBudget ? 'Budget exceeded' : `${stats.budgetUsed}% allocated`}
            </dd>
          </div>
        </dl>
        <ProgressLine value={stats.budgetUsed} label="Share of budget spent" tone={overBudget ? 'danger' : 'dark'} />
      </section>

      <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
        <section aria-label="Expenses" className="flex min-w-0 flex-col gap-4">
          <div className="grid gap-3 border border-border bg-card p-4 sm:grid-cols-[1fr_200px]">
            <div className="relative">
              <label htmlFor="expense-search" className="sr-only">
                Search expenses
              </label>
              <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="expense-search"
                type="search"
                placeholder="Search expenses"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <NativeSelect aria-label="Filter by category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="All">All categories</option>
              {EXPENSE_CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </NativeSelect>
          </div>

          {expenses.length === 0 ? (
            <EmptyState
              icon={Wallet}
              title="No expenses yet"
              description="Record venue, production and talent costs to track your remaining budget."
              action={<Button onClick={() => openForm(null)}>Add first expense</Button>}
            />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No matching expenses"
              description="Try a different search term or category."
              action={
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuery('')
                    setCategory('All')
                  }}
                >
                  Clear filters
                </Button>
              }
            />
          ) : (
            <div className="border border-border bg-card">
              <ul>
                {filtered.map((expense) => (
                  <li
                    key={expense.id}
                    className="grid grid-cols-[1fr_auto] items-start gap-x-4 gap-y-2 border-b border-border px-5 py-4 md:grid-cols-[1fr_auto_auto] md:items-center md:px-6"
                  >
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="font-serif text-lg leading-snug">{expense.description}</span>
                      <div className="flex flex-wrap items-center gap-3">
                        <Tag tone="outline">{expense.category}</Tag>
                        {expense.notes && (
                          <span className="text-xs text-muted-foreground">{expense.notes}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-right font-serif text-xl tabular-nums">
                      {formatCurrency(expense.amount)}
                    </span>
                    <div className="col-span-2 flex justify-end gap-1 md:col-span-1">
                      <Button variant="ghost" size="icon" onClick={() => openForm(expense)} aria-label={`Edit ${expense.description}`}>
                        <Pencil strokeWidth={1.25} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleting(expense)} aria-label={`Delete ${expense.description}`}>
                        <Trash2 strokeWidth={1.25} />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between bg-ivory px-5 py-4 md:px-6">
                <span className="eyebrow">
                  {filtered.length === expenses.length ? 'Total' : `Filtered total (${filtered.length})`}
                </span>
                <span className="font-serif text-xl tabular-nums">{formatCurrency(filteredTotal)}</span>
              </div>
            </div>
          )}
        </section>

        <aside aria-label="Expenses by category" className="flex flex-col gap-5 self-start border border-border bg-ivory p-6">
          <h2 className="font-serif text-2xl font-light">By category</h2>
          {byCategory.length === 0 ? (
            <p className="text-sm text-muted-foreground">Category breakdown appears once you add expenses.</p>
          ) : (
            <ul className="flex flex-col gap-5">
              {byCategory.map((c) => {
                const share = stats.totalExpenses ? Math.round((c.total / stats.totalExpenses) * 100) : 0
                return (
                  <li key={c.category} className="flex flex-col gap-2">
                    <div className="flex items-baseline justify-between gap-2 text-sm">
                      <span>{c.category}</span>
                      <span className="tabular-nums">{formatCurrency(c.total)}</span>
                    </div>
                    <ProgressLine value={share} label={`${c.category}: ${share}% of expenses`} tone="taupe" />
                  </li>
                )
              })}
            </ul>
          )}
        </aside>
      </div>

      <ExpenseFormDialog
        key={formKey}
        open={formOpen}
        onOpenChange={setFormOpen}
        expense={editing}
        onSave={(expense) => {
          actions.saveItem('expenses', expense)
          toast.success(editing ? 'Expense updated' : 'Expense added')
          setFormOpen(false)
        }}
      />

      <ConfirmDelete
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title="Delete expense?"
        description={`“${deleting?.description ?? 'This expense'}” will be removed from the budget.`}
        confirmLabel="Delete expense"
        onConfirm={() => {
          if (deleting) actions.deleteItem('expenses', deleting.id)
          toast.success('Expense deleted')
        }}
      />
    </div>
  )
}
