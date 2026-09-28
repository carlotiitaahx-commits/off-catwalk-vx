'use client'

import { useSyncExternalStore } from 'react'
import { createDemoEvent, createInitialData } from './demo-data'
import type {
  AppData,
  CollectionItem,
  CollectionKey,
  EventDetails,
  EventRecord,
} from './types'

const STORAGE_KEY = 'fashion-event-planner:v1'

let state: AppData | null = null
const listeners = new Set<() => void>()

function isAppData(value: unknown): value is AppData {
  if (!value || typeof value !== 'object') return false
  const data = value as Partial<AppData>
  return (
    data.version === 1 &&
    typeof data.activeEventId === 'string' &&
    Array.isArray(data.events) &&
    data.events.length > 0
  )
}

function load(): AppData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (isAppData(parsed)) return parsed
    }
  } catch {
    // Corrupted storage falls back to the demo data below.
  }
  const initial = createInitialData()
  persist(initial)
  return initial
}

function persist(data: AppData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Storage may be full or unavailable (private mode); keep in-memory state.
  }
}

function emit() {
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      state = null
      emit()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot(): AppData {
  if (state === null) state = load()
  return state
}

function getServerSnapshot(): AppData | null {
  return null
}

function setState(updater: (current: AppData) => AppData) {
  state = updater(getSnapshot())
  persist(state)
  emit()
}

function updateActiveEvent(updater: (event: EventRecord) => EventRecord) {
  setState((current) => ({
    ...current,
    events: current.events.map((event) =>
      event.id === current.activeEventId ? updater(event) : event,
    ),
  }))
}

export function useAppData(): AppData | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export function getActiveEvent(data: AppData): EventRecord {
  return data.events.find((event) => event.id === data.activeEventId) ?? data.events[0]
}

export function createId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export const actions = {
  updateEventDetails(details: EventDetails) {
    updateActiveEvent((event) => ({ ...event, details }))
  },

  createEvent(details: EventDetails) {
    const newEvent: EventRecord = {
      id: createId(),
      details,
      guests: [],
      tasks: [],
      expenses: [],
      activities: [],
    }
    setState((current) => ({
      ...current,
      activeEventId: newEvent.id,
      events: [...current.events, newEvent],
    }))
  },

  switchEvent(eventId: string) {
    setState((current) =>
      current.events.some((event) => event.id === eventId)
        ? { ...current, activeEventId: eventId }
        : current,
    )
  },

  deleteActiveEvent() {
    setState((current) => {
      const remaining = current.events.filter((event) => event.id !== current.activeEventId)
      const events = remaining.length > 0 ? remaining : [createDemoEvent()]
      return { ...current, events, activeEventId: events[0].id }
    })
  },

  restoreDemoEvent() {
    const demo = createDemoEvent()
    setState((current) => ({
      ...current,
      activeEventId: demo.id,
      events: [...current.events.filter((event) => event.id !== demo.id), demo],
    }))
  },

  saveItem<K extends CollectionKey>(key: K, item: CollectionItem<K>) {
    updateActiveEvent((event) => {
      const list = event[key] as CollectionItem<K>[]
      const exists = list.some((entry) => entry.id === item.id)
      const next = exists
        ? list.map((entry) => (entry.id === item.id ? item : entry))
        : [...list, item]
      return { ...event, [key]: next }
    })
  },

  deleteItem(key: CollectionKey, id: string) {
    updateActiveEvent((event) => ({
      ...event,
      [key]: (event[key] as { id: string }[]).filter((entry) => entry.id !== id),
    }))
  },
}
