import { createFileRoute, notFound } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { Calendar, Clock, Info, MapPin, Phone, Users } from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import type { EventItem } from './events.index'
import Footer from '@/components/Footer'

const fetchEventById = createServerFn()
  .inputValidator((id: string) => id)
  .handler(async ({ data }) => {
    const baseUrl = process.env.BACKEND_URL ?? 'http://localhost:5000'
    const res = await fetch(`${baseUrl}/api/events`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
    }

    const events = (await res.json()) as Array<EventItem>
    const event = events.find((item) => item.id === data)

    if (!event) {
      throw notFound()
    }

    return event
  })

export const Route = createFileRoute('/events/$eventId')({
  loader: async ({ params }) => {
    try {
      const event = await fetchEventById({ data: params.eventId })
      return { event, error: null }
    } catch (err) {
      if (err instanceof Response && err.status === 404) {
        throw notFound()
      }
      const message =
        err instanceof Error ? err.message : 'Failed to load event'
      console.error(message)
      return { event: null, error: message }
    }
  },
  component: EventDetailsPage,
})

type Organizer = NonNullable<EventItem['organizers']>[number]

function EventDetailsPage() {
  const { event, error } = Route.useLoaderData()

  if (error) {
    return (
      <div className="max-w-5xl mx-auto py-20 px-4 text-center">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    )
  }

  if (!event) {
    return null
  }

  const eventDate = event.eventDate?.start
    ? new Date(event.eventDate.start)
    : null
  const formattedDate = eventDate
    ? eventDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Date TBD'
  const formattedTime =
    event.eventTime && (event.eventTime.start || event.eventTime.end)
      ? `${event.eventTime.start ?? 'TBD'}${event.eventTime.end ? ` – ${event.eventTime.end}` : ''}`
      : 'Time TBD'
  const isPast = eventDate ? eventDate < new Date() : false

  const registrationLabel = isPast
    ? 'Registration Closed'
    : 'Registration Upcoming'
  const registrationMessage = isPast
    ? 'This event has already taken place.'
    : 'Registration will start soon. Stay tuned for more updates.'

  const organizers = (event.organizers ?? []).filter(
    Boolean,
  ) as Array<Organizer>
  const contact = event.contactInfo
  const showFullDescription =
    event.shortDescription && event.shortDescription.length > 220
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  return (
    <div className="pt-4 pb-16 space-y-8">
      <div className="mx-auto max-w-3xl px-4 space-y-6 text-center">
        <div
          className={`inline-flex w-full items-center justify-start text-left gap-3 rounded-2xl border px-5 py-2 text-sm font-medium ${
            isPast
              ? 'border-amber-200 bg-amber-50 text-amber-800'
              : 'border-emerald-200 bg-emerald-50 text-emerald-800'
          }`}
        >
          <Info className="h-4 w-4" />
          <div className="text-left">
            <p className="font-semibold">{registrationLabel}</p>
            <p className="text-xs">{registrationMessage}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-4xl font-semibold text-cyan-600">
            {event.eventTitle}
          </h1>
          {event.shortDescription && (
            <p className="text-gray-600 max-w-3xl mx-auto">
              {showFullDescription && !descriptionExpanded
                ? `${event.shortDescription.slice(0, 220)}...`
                : event.shortDescription}
              {showFullDescription && (
                <button
                  className="ml-2 text-cyan-600 underline-offset-2 hover:underline"
                  onClick={() => setDescriptionExpanded((prev) => !prev)}
                >
                  {descriptionExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </p>
          )}
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-100/20 overflow-hidden">
          <div className="p-6  space-y-10 ">
            <div className="flex items-center justify-between">
              <h3 className='text-cyan-500 text-lg font-semibold'>Event Details</h3>
              <div className="text-xs flex items-center gap-1 border font-semibold border-cyan-400/30 bg-cyan-100/35 px-3 py-0.5 rounded-full">
                <span ><Calendar className="w-3 h-3" /></span>
                <p>{formattedDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <InfoRow
                icon={<Calendar className="w-5 h-5" />}
                label="Date"
                value={formattedDate}
              />
              <InfoRow
                icon={<Clock className="w-5 h-5" />}
                label="Time"
                value={formattedTime}
              />
              <InfoRow
                icon={<MapPin className="w-5 h-5" />}
                label="Venue"
                value={event.roomNo ?? 'Venue to be announced'}
              />
              <InfoRow
                icon={<Users className="w-5 h-5" />}
                label="Seats"
                value={event.capacity ?? 'Limited'}
              />
            </div>

            {event.openTo && (
              <div className="rounded-2xl border border-cyan-100 bg-white  px-4 py-3 text-sm text-cyan-500">
                <strong className="font-semibold">Open to:</strong>{' '}
                {event.openTo}
              </div>
            )}

            <div className="space-y-4">
              <SectionHeading title="Event Schedule" />
              <div className="rounded-2xl border border-gray-100 bg-white p-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Day 1</span>
                  <span>{formattedDate}</span>
                </div>
                <p className="mt-1 text-gray-900 font-medium">
                  {formattedTime}
                </p>
                <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600">
                  {event.roomNo?.toLowerCase().includes('online')
                    ? 'Online'
                    : 'Offline'}
                </span>
              </div>
            </div>

            {organizers.length > 0 && (
              <div className="space-y-3">
                <SectionHeading title="Organizers" />
                <div className="flex flex-wrap gap-2">
                  {organizers.map((org, idx) => (
                    <a
                      key={`${org.Name ?? 'org'}-${idx}`}
                      href={org.link ?? ''}
                      className="inline-flex items-center hover:underline rounded-full border border-gray-200 bg-white px-3 py-0 text-xs text-gray-600"
                    >
                      <div className="flex items-center gap-1 ">
                        <img
                          src={org.LogoUrl ?? ''}
                          alt={org.Name ?? 'Organizer'}
                          className="w-8 h-8 rounded-full bg-white"
                        />
                        <span>{org.Name ?? 'Organizer'}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {contact && (
              <div className="space-y-3">
                <SectionHeading title="Contact" />
                <div className="rounded-2xl border border-gray-100 bg-white p-4 space-y-2 text-sm text-gray-700">
                  {contact.Name && (
                    <p className="font-semibold">{contact.Name}</p>
                  )}
                  <div className="flex flex-wrap gap-4">
                    {contact.Email && (
                      <span className="inline-flex items-center gap-2 text-gray-600">
                        <MailIcon /> {contact.Email}
                      </span>
                    )}
                    {contact.Phone && (
                      <span className="inline-flex items-center gap-2 text-gray-600">
                        <Phone className="h-4 w-4 text-cyan-600" />{' '}
                        {contact.Phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4">
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 text-center text-sm text-gray-500">
          {isPast
            ? 'Registration for this event is no longer available.'
            : 'Registration will be announced soon.'}
        </div>
      </div>


    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-100 bg-cyan-50 text-cyan-700">
        {icon}
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
        <p className="text-base font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function SectionHeading({ title }: { title: string }) {
  return (
    <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
      {title}
    </h3>
  )
}

function MailIcon() {
  return (
    <svg
      className="h-4 w-4 text-cyan-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="m4 6 8 6 8-6" />
    </svg>
  )
}
