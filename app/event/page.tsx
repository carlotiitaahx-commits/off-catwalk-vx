import { Suspense } from 'react'
import type { Metadata } from 'next'
import { EventDetailsView } from '@/components/event/event-details-view'

export const metadata: Metadata = { title: 'Event Details' }

export default function EventPage() {
  return (
    <Suspense>
      <EventDetailsView />
    </Suspense>
  )
}
