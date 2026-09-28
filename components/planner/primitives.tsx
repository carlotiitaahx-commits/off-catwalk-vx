'use client'

import type { ReactNode, SelectHTMLAttributes } from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <header className="fade-up flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
      <div className="flex max-w-2xl flex-col gap-3">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="font-serif text-4xl leading-[1.05] font-light text-balance md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="text-sm leading-relaxed text-pretty text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </header>
  )
}

export function FormField({
  id,
  label,
  error,
  hint,
  required,
  className,
  children,
}: {
  id: string
  label: string
  error?: string
  hint?: string
  required?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={id} className="text-[0.68rem] font-medium tracking-[0.18em] uppercase">
        {label}
        {required && (
          <span aria-hidden="true" className="text-taupe-deep">
            *
          </span>
        )}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function NativeSelect({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        className={cn(
          'h-11 w-full appearance-none border border-input bg-card pr-9 pl-3 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border border-dashed border-input bg-card/60 px-6 py-16 text-center">
      <Icon aria-hidden="true" className="size-6 text-taupe" strokeWidth={1.25} />
      <div className="flex flex-col gap-2">
        <h3 className="font-serif text-2xl font-light">{title}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  )
}

export function ProgressLine({
  value,
  label,
  tone = 'dark',
}: {
  value: number
  label: string
  tone?: 'dark' | 'taupe' | 'danger'
}) {
  const clamped = Math.max(0, Math.min(100, value))
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={clamped}
      className="h-[3px] w-full overflow-hidden bg-secondary"
    >
      <div
        className={cn(
          'h-full transition-[width] duration-700 ease-out',
          tone === 'dark' && 'bg-foreground',
          tone === 'taupe' && 'bg-taupe',
          tone === 'danger' && 'bg-destructive',
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}

const toneClasses = {
  neutral: 'border-border text-muted-foreground',
  dark: 'border-foreground bg-foreground text-primary-foreground',
  taupe: 'border-taupe text-taupe-deep',
  outline: 'border-foreground text-foreground',
  danger: 'border-destructive/40 text-destructive',
} as const

export function Tag({
  tone = 'neutral',
  children,
}: {
  tone?: keyof typeof toneClasses
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center border px-2 text-[0.62rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase',
        toneClasses[tone],
      )}
    >
      {children}
    </span>
  )
}

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-3 border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-[1fr_200px_200px]">
      {children}
    </div>
  )
}
