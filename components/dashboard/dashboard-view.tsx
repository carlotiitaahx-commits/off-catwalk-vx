'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CalendarClock, MapPin } from 'lucide-react'
import { useActiveEvent } from '@/hooks/use-active-event'
import { computeStats, daysUntil, formatCurrency, formatDate } from '@/lib/format'
import { EmptyState, ProgressLine } from '@/components/planner/primitives'
import { cn } from '@/lib/utils'

function Countdown({ date }: { date: string }) {
  const days = daysUntil(date)
  if (days === null) return null
  const label =
    days > 1 ? `In ${days} days` : days === 1 ? 'Tomorrow' : days === 0 ? 'Today' : 'Event concluded'
  return <span className="eyebrow text-taupe">{label}</span>
}

function StatBlock({
  label,
  value,
  detail,
  href,
}: {
  label: string
  value: string
  detail: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-4 bg-card p-6 transition-colors outline-none hover:bg-ivory focus-visible:ring-2 focus-visible:ring-ring md:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow">{label}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-taupe transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.25}
        />
      </div>
      <span className="font-serif text-4xl leading-none font-light tabular-nums md:text-5xl">
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{detail}</span>
    </Link>
  )
}

function SectionTitle({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
      <h2 className="font-serif text-2xl font-light md:text-3xl">{title}</h2>
      <Link
        href={href}
        className="text-[0.65rem] tracking-[0.2em] whitespace-nowrap text-taupe-deep uppercase underline-offset-4 hover:underline"
      >
        {linkLabel}
      </Link>
    </div>
  )
}

export function DashboardView() {
  const event = useActiveEvent()
  if (!event) return null

  const { details } = event
  const stats = computeStats(event)
  const overBudget = stats.remainingBudget < 0
  const nextActivities = stats.upcomingActivities.slice(0, 4)
  const pendingTasks = event.tasks
    .filter((t) => t.status !== 'Completed')
    .sort((a, b) => (a.deadline || '9999').localeCompare(b.deadline || '9999'))
    .slice(0, 4)

  return (
    <div className="flex flex-col gap-14">
      <section className="fade-up grid gap-8 border-b border-border pb-12 md:grid-cols-[1fr_260px] md:items-end lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="eyebrow">{details.brand || 'Untitled brand'}</span>
            <span aria-hidden="true" className="h-px w-8 bg-taupe" />
            <span className="eyebrow">{details.type}</span>
          </div>
          <h1 className="font-serif text-5xl leading-[0.95] font-light text-balance md:text-7xl lg:text-8xl">
            {details.name}
          </h1>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
            <span className="flex items-center gap-2">
              <CalendarClock aria-hidden="true" className="size-4 text-taupe" strokeWidth={1.25} />
              {formatDate(details.date)}
            </span>
            {details.location && (
              <span className="flex items-center gap-2">
                <MapPin aria-hidden="true" className="size-4 text-taupe" strokeWidth={1.25} />
                {details.location}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-baseline justify-between gap-4">
              <span className="eyebrow">Event progress</span>
              <span className="font-serif text-2xl tabular-nums">{stats.progress}%</span>
            </div>
            <ProgressLine value={stats.progress} label="Event progress based on completed tasks" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {stats.completedTasks} of {stats.totalTasks} tasks completed
              </span>
              <Countdown date={details.date} />
            </div>
          </div>
        </div>
        <div className="relative hidden aspect-[3/4] overflow-hidden bg-secondary md:block">
          <Image
            src="/images/editorial-hero.png"
            alt="Black and white editorial image of a model walking a Parisian runway"
            fill
            priority
            sizes="300px"
            className="object-cover grayscale"
          />
        </div>
      </section>

      <section aria-label="Key figures" className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock
          label="Guests"
          value={String(stats.totalGuests)}
          detail={`${stats.confirmedGuests} confirmed · ${stats.awaitingGuests} awaiting · ${stats.declinedGuests} declined`}
          href="/guests"
        />
        <StatBlock
          label="Confirmed"
          value={String(stats.confirmedGuests)}
          detail={
            stats.totalGuests
              ? `${Math.round((stats.confirmedGuests / stats.totalGuests) * 100)}% acceptance rate`
              : 'No guests added yet'
          }
          href="/guests"
        />
        <StatBlock
          label="Tasks completed"
          value={`${stats.completedTasks}/${stats.totalTasks}`}
          detail={`${stats.pendingTasks} pending`}
          href="/tasks"
        />
        <StatBlock
          label="Remaining budget"
          value={formatCurrency(stats.remainingBudget)}
          detail={overBudget ? 'Over budget' : `${stats.budgetUsed}% of budget allocated`}
          href="/budget"
        />
      </section>

      <div className="grid gap-12 lg:grid-cols-2">
        <section className="flex flex-col gap-6">
          <SectionTitle title="Budget overview" href="/budget" linkLabel="Manage budget" />
          <dl className="grid grid-cols-3 gap-4">
            {[
              { label: 'Total budget', value: stats.budget },
              { label: 'Expenses', value: stats.totalExpenses },
              { label: 'Remaining', value: stats.remainingBudget },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-2">
                <dt className="eyebrow">{item.label}</dt>
                <dd
                  className={cn(
                    'font-serif text-xl tabular-nums md:text-2xl',
                    item.label === 'Remaining' && overBudget && 'text-destructive',
                  )}
                >
                  {formatCurrency(item.value)}
                </dd>
              </div>
            ))}
          </dl>
          <ProgressLine
            value={stats.budgetUsed}
            label="Share of budget spent"
            tone={overBudget ? 'danger' : 'taupe'}
          />

          <div className="mt-6 flex flex-col gap-6">
            <SectionTitle title="Pending tasks" href="/tasks" linkLabel="All tasks" />
            {pendingTasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {stats.totalTasks ? 'Every task is complete. Beautifully done.' : 'No tasks yet.'}
              </p>
            ) : (
              <ul className="flex flex-col divide-y divide-border">
                {pendingTasks.map((task) => (
                  <li key={task.id} className="flex items-center justify-between gap-4 py-3">
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate text-sm">{task.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {task.assignee || 'Unassigned'}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground tabular-nums">
                      {task.deadline ? formatDate(task.deadline, 'short') : 'No deadline'}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="flex flex-col gap-6">
          <SectionTitle title="Upcoming activities" href="/timeline" linkLabel="Full timeline" />
          {nextActivities.length === 0 ? (
            <EmptyState
              icon={CalendarClock}
              title="Nothing scheduled"
              description={
                event.activities.length
                  ? 'All timeline activities have taken place.'
                  : 'Add activities to the timeline to see what comes next.'
              }
            />
          ) : (
            <ol className="flex flex-col">
              {nextActivities.map((activity, index) => (
                <li
                  key={activity.id}
                  className="grid grid-cols-[72px_1fr] gap-4 border-b border-border py-5 first:pt-0"
                >
                  <div className="flex flex-col">
                    <span className="font-serif text-2xl leading-none tabular-nums">
                      {activity.startTime}
                    </span>
                    <span className="mt-1 text-xs text-muted-foreground tabular-nums">
                      {activity.endTime}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[0.6rem] tracking-[0.2em] text-taupe-deep uppercase">
                      {index === 0 ? 'Next · ' : ''}
                      {formatDate(activity.date, 'short')}
                    </span>
                    <span className="text-sm font-medium">{activity.title}</span>
                    {activity.location && (
                      <span className="text-xs text-muted-foreground">{activity.location}</span>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  )
}
