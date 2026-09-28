import type { Metadata } from 'next'
import { GuestListView } from '@/components/guests/guest-list-view'

export const metadata: Metadata = { title: 'Guest List' }

export default function GuestsPage() {
  return <GuestListView />
}
