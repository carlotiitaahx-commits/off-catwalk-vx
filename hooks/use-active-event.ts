'use client'

import { getActiveEvent, useAppData } from '@/lib/store'

export function useActiveEvent() {
  const data = useAppData()
  return data ? getActiveEvent(data) : null
}
