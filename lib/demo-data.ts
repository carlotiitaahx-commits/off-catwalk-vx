import type { AppData, EventRecord } from './types'

export const DEMO_EVENT_ID = 'demo-fw26'

export function createDemoEvent(): EventRecord {
  return {
    id: DEMO_EVENT_ID,
    details: {
      name: 'FW26 Collection Launch',
      brand: 'Maison Aurèle',
      type: 'Collection Launch',
      date: '2026-10-22',
      location: 'Palais de Tokyo, Paris',
      description:
        'An intimate evening presentation unveiling the Fall/Winter 2026 collection — sculptural tailoring, archival textiles and a live string quartet. Followed by a seated dinner for press and VIP clients.',
      budget: 185000,
    },
    guests: [
      { id: 'g1', name: 'Camille Laurent', email: 'camille@vogue-paris.fr', category: 'Press', status: 'Confirmed', notes: 'Front row, seat A4. Bringing photographer.' },
      { id: 'g2', name: 'Isabella Moretti', email: 'isabella@moretti.studio', category: 'Influencer', status: 'Confirmed', notes: 'Wearing look 12 from the collection.' },
      { id: 'g3', name: 'Léa Dubois', email: 'lea.dubois@agency.com', category: 'Celebrity', status: 'Invited', notes: 'Awaiting reply from her manager.' },
      { id: 'g4', name: 'Oliver Grant', email: 'oliver@thegentleman.co.uk', category: 'Press', status: 'Confirmed', notes: '' },
      { id: 'g5', name: 'Sofia Andersson', email: 'sofia@nordicstyle.se', category: 'Influencer', status: 'Pending', notes: 'Confirm travel arrangements.' },
      { id: 'g6', name: 'Charlotte Beaumont', email: 'c.beaumont@private.fr', category: 'VIP', status: 'Confirmed', notes: 'Top client — seat near runway.' },
      { id: 'g7', name: 'Marco Bellini', email: 'marco@bellini.it', category: 'VIP', status: 'Declined', notes: 'Send lookbook after the event.' },
      { id: 'g8', name: 'Aiko Tanaka', email: 'aiko@modeasia.jp', category: 'Press', status: 'Invited', notes: '' },
      { id: 'g9', name: 'Noah Williams', email: 'noah@williams.mgmt', category: 'Celebrity', status: 'Pending', notes: 'Dietary: vegan.' },
      { id: 'g10', name: 'Hélène Marchand', email: 'helene@galeriemarchand.fr', category: 'Other', status: 'Confirmed', notes: 'Art curator — dinner guest.' },
    ],
    tasks: [
      { id: 't1', title: 'Confirm venue contract', description: 'Sign final agreement with Palais de Tokyo and pay deposit.', assignee: 'Margaux Petit', deadline: '2026-09-15', priority: 'High', status: 'Completed' },
      { id: 't2', title: 'Finalise guest list', description: 'Lock press and VIP list with the brand director.', assignee: 'Julien Roche', deadline: '2026-09-25', priority: 'High', status: 'Completed' },
      { id: 't3', title: 'Send digital invitations', description: 'Dispatch invitations and track RSVPs.', assignee: 'Julien Roche', deadline: '2026-10-01', priority: 'High', status: 'In Progress' },
      { id: 't4', title: 'Model casting', description: 'Final casting session for 24 looks.', assignee: 'Elise Moreau', deadline: '2026-10-05', priority: 'Medium', status: 'In Progress' },
      { id: 't5', title: 'Lighting & sound rehearsal', description: 'Technical run-through with the production team.', assignee: 'Thomas Leroy', deadline: '2026-10-20', priority: 'Medium', status: 'To Do' },
      { id: 't6', title: 'Seating plan', description: 'Draft front-row and dinner seating arrangements.', assignee: 'Margaux Petit', deadline: '2026-10-15', priority: 'Medium', status: 'To Do' },
      { id: 't7', title: 'Press kit printing', description: 'Print 150 press kits with lookbook and collection notes.', assignee: 'Elise Moreau', deadline: '2026-10-12', priority: 'Low', status: 'To Do' },
      { id: 't8', title: 'Menu tasting', description: 'Tasting session with the caterer for the seated dinner.', assignee: 'Margaux Petit', deadline: '2026-09-20', priority: 'Low', status: 'Completed' },
    ],
    expenses: [
      { id: 'e1', description: 'Venue hire — Palais de Tokyo', category: 'Venue', amount: 48000, notes: '50% deposit paid.' },
      { id: 'e2', description: 'Set design & runway build', category: 'Production', amount: 32500, notes: '' },
      { id: 'e3', description: 'Lighting & sound', category: 'Production', amount: 14800, notes: '' },
      { id: 'e4', description: 'Seated dinner for 80', category: 'Catering', amount: 17600, notes: 'Includes champagne reception.' },
      { id: 'e5', description: 'Hair & make-up team', category: 'Styling & Beauty', amount: 8200, notes: '' },
      { id: 'e6', description: 'Model fees', category: 'Talent', amount: 21000, notes: '24 models.' },
      { id: 'e7', description: 'Photographer & videographer', category: 'PR & Media', amount: 9500, notes: '' },
    ],
    activities: [
      { id: 'a1', title: 'Venue load-in', date: '2026-10-22', startTime: '09:00', endTime: '13:00', location: 'Main hall', description: 'Set, lighting and sound installation.' },
      { id: 'a2', title: 'Hair & make-up', date: '2026-10-22', startTime: '14:00', endTime: '17:30', location: 'Backstage', description: 'Final looks for 24 models.' },
      { id: 'a3', title: 'Full rehearsal', date: '2026-10-22', startTime: '16:00', endTime: '17:00', location: 'Runway', description: 'Walk-through with music and lighting cues.' },
      { id: 'a4', title: 'Champagne reception', date: '2026-10-22', startTime: '18:30', endTime: '19:30', location: 'Foyer', description: 'Guest arrival and photocall.' },
      { id: 'a5', title: 'FW26 presentation', date: '2026-10-22', startTime: '19:30', endTime: '20:00', location: 'Main hall', description: 'Runway presentation with live string quartet.' },
      { id: 'a6', title: 'Seated dinner', date: '2026-10-22', startTime: '20:30', endTime: '23:00', location: 'Salon Est', description: 'Dinner for press and VIP clients.' },
    ],
  }
}

export function createInitialData(): AppData {
  return { version: 1, activeEventId: DEMO_EVENT_ID, events: [createDemoEvent()] }
}
