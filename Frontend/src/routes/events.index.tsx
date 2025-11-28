import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Calendar, ChevronRight, Clock, MapPin, Users } from 'lucide-react'
import { useState } from 'react'

export type EventItem = {
  id: string
  eventTitle: string
  bannerUrl?: string
  shortDescription?: string
  eventDate?: { start?: string; end?: string }
  eventTime?: { start?: string; end?: string }
  roomNo?: string
  capacity?: string
  openTo?: string
  speakers?: { name?: string; desg?: string; photoUrl?: string }
  organizers?: Array<{ Name?: string; LogoUrl?: string; link?: string }>
  contactInfo?: { Name?: string; Title?: string; Email?: string; Phone?: string }
}

const fetchEvents = createServerFn().handler(async () => {
  const baseUrl = process.env.BACKEND_URL ?? 'http://localhost:5000'
  const res = await fetch(`${baseUrl}/api/events`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  if (!Array.isArray(data)) {
    throw new Error('Backend returned an invalid response')
  }

  return data as Array<EventItem>
})

export const Route = createFileRoute('/events/')({
  loader: async () => {
    try {
      const events = await fetchEvents()
      return { events, error: null }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load events'
      console.error('Events loader error:', message)
      return { events: [], error: message }
    }
  },
  component: EventsIndexPage
})

function EventsIndexPage() {
  const { events, error } = Route.useLoaderData()

  const now = new Date()
  now.setHours(0, 0, 0, 0)

  const upcomingEvents = events.filter((e: EventItem) => {
    const start = e.eventDate?.start
    if (!start) {
      return false
    }
    const eventDate = new Date(start)
    eventDate.setHours(0, 0, 0, 0)
    return eventDate >= now
  })

  const pastEvents = events.filter((e: EventItem) => {
    const start = e.eventDate?.start
    if (!start) {
      return false
    }
    const eventDate = new Date(start)
    eventDate.setHours(0, 0, 0, 0)
    return eventDate < now
  })

  const undatedEvents = events.filter((e: EventItem) => !e.eventDate?.start)

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-cyan-600">Events</h1>
          <p className="mt-3 text-gray-600">Join us for exciting events and activities organized by the UIU Data Science Club</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
            <p className="text-red-800 font-bold text-lg mb-2">⚠️ Connection Error</p>
            <p className="text-red-700 mb-3">{error}</p>
            <div className="bg-red-100 p-3 rounded">
              <p className="text-red-800 font-semibold mb-2">Troubleshooting Steps:</p>
              <ol className="list-decimal list-inside space-y-1 text-red-700 text-sm">
                <li>
                  Check if backend is running: <code className="bg-red-200 px-2 py-1 rounded">npm start</code> in Backend folder
                </li>
                <li>
                  Verify backend is on port 5000: <code className="bg-red-200 px-2 py-1 rounded">http://localhost:5000/api/events</code>
                </li>
                <li>Check backend has CORS enabled</li>
                <li>Look at browser Console (F12) for detailed errors</li>
                <li>Check Network tab (F12) to see what requests are being made</li>
              </ol>
            </div>
          </div>
        )}

        {events.length === 0 && !error ? (
          <div className="text-center py-12 text-gray-500">No events available.</div>
        ) : (
          <>
            <EventsSection title="Upcoming Events" badge="Upcoming" events={upcomingEvents} />
            {pastEvents.length > 0 && <EventsSection title="Past Events" badge="Past Event" events={pastEvents} />}
            {undatedEvents.length > 0 && <EventsSection title="Events (Date TBD)" badge="Date TBD" events={undatedEvents} />}
          </>
        )}
      </div>
    </div>
  )
}

function EventsSection({ title, badge, events }: { title: string; badge: string; events: Array<EventItem> }) {
  if (events.length === 0) {
    return null
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-cyan-600 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} badge={badge} />
        ))}
      </div>
    </section>
  )
}

function EventCard({ event, badge }: { event: EventItem; badge: string }) {
  const [imgError, setImgError] = useState(false)
  const eventDateValue = event.eventDate?.start ? new Date(event.eventDate.start) : null
  const formattedDate = eventDateValue
    ? eventDateValue.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'Date TBD'

  const eventTime = event.eventTime
  const hasEventTime = Boolean(eventTime?.start || eventTime?.end)
  const coverImage = imgError ? '/images/events/event-placeholder.jpg' : event.bannerUrl || '/images/events/event-placeholder.jpg'

  return (
    <article className="rounded-2xl border border-gray-100  overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
      <div className="relative h-60 bg-gray-200">
        <img
          src={coverImage}
          alt={event.eventTitle}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover${badge === 'Past Event' ? ' grayscale' : ''}`}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        <span className="absolute left-5 top-5 bg-cyan-100/90 text-zinc-900/85 text-xs font-medium tracking-wide px-3 py-1 rounded-full shadow">
          {badge}
        </span>
        <div className="absolute left-5 bottom-5 text-white space-y-1">
          <p className="text-xs uppercase tracking-[0.2em] text-white/80">{formattedDate}</p>
          <h3 className="text-xl font-semibold leading-tight">{event.eventTitle}</h3>
        </div>
      </div>

      <div className="p-6 space-y-4 bg-gray-50">
        {event.shortDescription && <p className="text-gray-600 text-sm leading-relaxed">{event.shortDescription}</p>}

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
          <InfoTile icon={<Calendar />} label="Date" value={formattedDate} />
          {hasEventTime && (
            <InfoTile
              icon={<Clock />}
              label="Time"
              value={`${eventTime?.start ?? 'TBD'}${eventTime?.end ? ` - ${eventTime.end}` : ''}`}
            />
          )}
          {event.roomNo && <InfoTile icon={<MapPin />} label="Venue" value={event.roomNo} />}
          {event.capacity && <InfoTile icon={<Users />} label="Seats" value={event.capacity} />}
        </div>

        <Link
          to="/events/$eventId"
          params={{ eventId: event.id }}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-white px-5 py-2 text-sm text-cyan-700 hover:bg-cyan-50 transition-colors"
        >
          View {badge} Details
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}

function InfoTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 text-cyan-600 shrink-0">{icon}</div>
      <div>
        <p className="text-xs uppercase text-gray-400 tracking-wide">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  )
}
