import { createFileRoute } from '@tanstack/react-router'
import {
  Calendar,
  ChevronRight,
  Clock,
  MapPin,
  Users,
} from 'lucide-react'

export const Route = createFileRoute('/events')({
  component: RouteComponent,
})

type EventItem = {
  id: string
  title: string
  subtitle?: string
  image?: string
  date: string
  time?: string
  venue?: string
  seats?: string
}

const pastEvents: Array<EventItem> = [
  {
    id: 'e1',
    title: 'Data Science Prospects Seminar',
    subtitle: 'Join us for our interactive seminar on March 19, 2025',
    image: '/images/events/event-1.jpg',
    date: 'March 19, 2025',
    time: '2:00 PM - 3:30 PM',
    venue: 'Room 126',
    seats: '50 seats',
  },
  {
    id: 'e2',
    title: 'Deep Learning in Computational and Spatial Biology',
    subtitle: 'A workshop on Deep Learning applications from April 26 to May 10, 2025',
    image: '/images/events/event-2.jpg',
    date: 'Apr 26 - May 10, 2025',
    time: 'Various sessions',
    venue: 'Room #126/628, UIU and Online',
    seats: '100 seats',
  },
  {
    id: 'e3',
    title: 'ENV!SE: Storytelling with Excel and PowerBI',
    subtitle: 'Two-chapter workshop designed to enhance your data analysis skills',
    image: '/images/events/event-3.jpg',
    date: 'August 10-19, 2025',
    time: '12:30 PM - 4:00 PM',
    venue: 'Room TBD, UIU',
    seats: '35 seats',
  },
  {
    id: 'e4',
    title: "Data Scientist's Futsal Championship 2.0",
    subtitle: 'An exciting football tournament featuring a unique player auction system',
    image: '/images/events/event-4.jpg',
    date: 'August 12 - 17, 2025',
    time: 'TBD',
    venue: 'UIU Field',
    seats: '200 seats',
  },
  {
    id: 'e5',
    title: 'Analytics for All: Data Fluency Career Session',
    subtitle: 'Career session by Augmedix',
    image: '/images/events/event-5.jpg',
    date: 'July 30, 2025',
    time: '2:30 PM',
    venue: 'Seminar Room #126',
    seats: '150 seats',
  },
  {
    id: 'e6',
    title: 'ENV!SE: Visualize with Power BI',
    subtitle: 'An advanced Power BI workshop focused on visualization and storytelling',
    image: '/images/events/event-6.jpg',
    date: 'August 19, 2025',
    time: '2:00 PM - 5:00 PM',
    venue: 'Seminar Room #628, UIU',
    seats: '100 seats',
  },
  {
    id: 'e7',
    title: 'Seminar on Research & Development (R&D) and Career Paths',
    subtitle: 'Explore R&D and career opportunities with Prof. Dr. Karim Mohammed Rezaul',
    image: '/images/events/event-7.jpg',
    date: 'August 31, 2025',
    time: '2:00 PM - 4:30 PM',
    venue: 'Room 126, UIU',
    seats: '200 seats',
  },
]

function RouteComponent() {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-cyan-600">Events</h1>
          <p className="mt-3 text-gray-600">Join us for exciting events and activities organized by the UIU Data Science Club</p>
        </header>

        <section className="mb-12">
          <h2 className="text-xl font-semibold text-cyan-600 mb-3">Upcoming Events</h2>
          <div className="bg-white border border-gray-100 rounded-lg p-6 shadow-sm">
            <p className="text-gray-500">No upcoming events at the moment. Check back soon!</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-cyan-600 mb-6">Past Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((ev) => (
              <article key={ev.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    className="w-full h-44 md:h-48 lg:h-56 object-cover"
                    onError={(e) => {
                      // fallback if image missing
                      ;(e.target as HTMLImageElement).src = '/images/events/event-placeholder.jpg'
                    }}
                  />
                  <span className="absolute left-4 top-4 bg-gray-900/75 text-white text-xs px-3 py-1 rounded-full">Past Event</span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800">{ev.title}</h3>
                  {ev.subtitle && <p className="mt-2 text-gray-500 text-sm">{ev.subtitle}</p>}

                  <div className="mt-4 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-cyan-600" />
                      <span>{ev.date}</span>
                    </div>

                    {ev.time && (
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span>{ev.time}</span>
                      </div>
                    )}

                    {ev.venue && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-cyan-600" />
                        <span>{ev.venue}</span>
                      </div>
                    )}

                    {ev.seats && (
                      <div className="flex items-center gap-3">
                        <Users className="w-4 h-4 text-cyan-600" />
                        <span>{ev.seats}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-full text-sm border border-cyan-100 hover:bg-cyan-100"
                      aria-label={`View details for ${ev.title}`}>
                      <span>View Past Event Details</span>
                      <ChevronRight className="w-4 h-4 text-cyan-700" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

