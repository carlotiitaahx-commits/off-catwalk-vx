'use client'

import { useState, type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  CalendarClock,
  ClipboardList,
  LayoutGrid,
  Menu,
  NotebookPen,
  Users,
  Wallet,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { actions, useAppData } from '@/lib/store'
import { formatDate } from '@/lib/format'
import { cn } from '@/lib/utils'
import type { AppData } from '@/lib/types'

const NAV_ITEMS = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/event', label: 'Event Details', icon: NotebookPen },
  { href: '/guests', label: 'Guest List', icon: Users },
  { href: '/tasks', label: 'Tasks', icon: ClipboardList },
  { href: '/budget', label: 'Budget', icon: Wallet },
  { href: '/timeline', label: 'Timeline', icon: CalendarClock },
]

function Brand() {
  return (
    <Link href="/" className="group flex flex-col gap-1 outline-none">
      <span className="text-[0.6rem] tracking-[0.32em] text-taupe uppercase">Atelier Edition</span>
      <span className="font-serif text-[1.7rem] leading-[1.05] font-light text-white">
        Fashion Event
        <br />
        <em className="italic">Planner</em>
      </span>
    </Link>
  )
}

function EventSwitcher({ data, onNavigate }: { data: AppData; onNavigate?: () => void }) {
  const router = useRouter()
  const active = data.events.find((e) => e.id === data.activeEventId) ?? data.events[0]

  return (
    <div className="flex flex-col gap-3 border-y border-sidebar-border py-5">
      <label
        htmlFor="event-switcher"
        className="text-[0.6rem] tracking-[0.28em] text-white/50 uppercase"
      >
        Current event
      </label>
      {data.events.length > 1 ? (
        <select
          id="event-switcher"
          value={active.id}
          onChange={(e) => {
            actions.switchEvent(e.target.value)
            onNavigate?.()
          }}
          className="h-10 w-full border border-sidebar-border bg-sidebar-accent px-2 text-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-taupe"
        >
          {data.events.map((event) => (
            <option key={event.id} value={event.id}>
              {event.details.name}
            </option>
          ))}
        </select>
      ) : (
        <p id="event-switcher" className="font-serif text-lg leading-tight text-white">
          {active.details.name}
        </p>
      )}
      <p className="text-xs text-white/50">{formatDate(active.details.date, 'short')}</p>
      <button
        type="button"
        onClick={() => {
          router.push('/event?new=1')
          onNavigate?.()
        }}
        className="self-start text-[0.62rem] tracking-[0.22em] text-taupe uppercase underline-offset-4 transition-colors hover:text-white hover:underline"
      >
        + New event
      </button>
    </div>
  )
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-col">
        {NAV_ITEMS.map((item, index) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group flex items-center gap-4 border-l py-3 pl-4 text-[0.72rem] tracking-[0.2em] uppercase transition-colors outline-none focus-visible:bg-sidebar-accent',
                  active
                    ? 'border-taupe text-white'
                    : 'border-transparent text-white/55 hover:border-white/30 hover:text-white',
                )}
              >
                <span className="w-5 font-serif text-sm tracking-normal text-taupe tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.25} />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

function SidebarContent({ data, onNavigate }: { data: AppData; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-8 px-7 py-9">
      <Brand />
      <EventSwitcher data={data} onNavigate={onNavigate} />
      <SidebarNav onNavigate={onNavigate} />
      <p className="mt-auto text-[0.6rem] leading-relaxed tracking-[0.2em] text-white/35 uppercase">
        Data saved locally
        <br />
        in this browser
      </p>
    </div>
  )
}

function LoadingState() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background" aria-busy="true">
      <p className="eyebrow animate-pulse">Loading your atelier…</p>
    </div>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const data = useAppData()
  const [mobileOpen, setMobileOpen] = useState(false)

  if (!data) return <LoadingState />

  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 hidden w-72 overflow-y-auto bg-sidebar lg:block">
        <SidebarContent data={data} />
      </aside>

      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-sidebar-border bg-sidebar px-5 py-4 lg:hidden">
        <Link href="/" className="font-serif text-xl font-light text-white">
          Fashion Event <em className="italic">Planner</em>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation"
          className="text-white hover:bg-sidebar-accent hover:text-white"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="size-5" strokeWidth={1.25} />
        </Button>
      </header>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="w-80 max-w-[85vw] border-sidebar-border bg-sidebar p-0 text-white [&>[data-slot=sheet-close]]:text-white"
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <SidebarContent data={data} onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <main className="lg:pl-72">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-10 md:py-14">{children}</div>
      </main>
    </div>
  )
}
