import { Link, createFileRoute } from '@tanstack/react-router'
import {
  BookOpen,
  Briefcase,
  Calendar,
  LinkIcon,
  Users,
} from 'lucide-react'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/')({ component: App })

function App() {
  const clubFeatures = [
    {
      icon: <Users className="w-12 h-12 text-cyan-600" />,
      title: 'Community',
      description:
        'Join a vibrant community of data enthusiasts, collaborate on projects, and network with peers.',
    },
    {
      icon: <BookOpen className="w-12 h-12 text-cyan-600" />,
      title: 'Learning',
      description:
        'Access workshops, courses, and hands-on projects led by experienced mentors and faculty members.',
    },
    {
      icon: <Briefcase className="w-12 h-12 text-cyan-600" />,
      title: 'Opportunities',
      description:
        'Participate in competitions, hackathons, internships, and real-world projects to enhance your skills.',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Banner */}
      {/* <div className="bg-linear-to-r from-cyan-500 to-cyan-600 text-white text-center py-3 text-sm">
        <span className="font-semibold">
          🚀 Fall 2025 Recruitment Now Open!
        </span>
        <span className="ml-2">
          | Open November 18, 2025 - Close November 24, 2025
        </span>
      </div> */}

      {/* Hero Section */}
      <section className="bg-linear-to-b from-blue-50 to-white px-6 py-28 ">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-cyan-600 mb-2 leading-tight">
              UIU Data Science Club
            </h1>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              Empowering students with data science skills, fostering
              innovation, and building a community of future data leaders.
            </p>
            <div className="flex gap-4 items-center">
              <Link
                to="/events"
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-2 cursor-pointer rounded-xl font-semibold transition shadow-lg"
              >
                Events
              </Link>
              <Link
                to="/team"
                className="border-2 border-cyan-600 text-cyan-600 hover:bg-cyan-50 px-8 py-2 cursor-pointer rounded-xl font-semibold transition"
              >
                Meet Our Team
              </Link>
            </div>
          </div>
          <div className="flex w-full h-full justify-center">
            <div className="w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
              <img
                src="https://stg-dsc-prod.monzim.com/dsc-cover.webp"
                alt="UIU Data Science Club Team"
                className="w-full  rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="bg-white text-white py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 px-14 py-16 bg-linear-to-r from-cyan-500 to-cyan-600 rounded-3xl gap-8 items-center">
          <div>
            <span className="text-white bg-white/30 border-white rounded-full text-sm font-medium px-4 py-1">
              Official Partnership
            </span>
            <h2 className="text-4xl font-bold my-4 ">
              DataCamp Donates Partnership
            </h2>
            <p className="text-lg mb-6 leading-relaxed">
              Get a{' '}
              <span className="font-bold">
                FREE 1-year DataCamp subscription
              </span>{' '}
              with 500+ courses on Python, SQL, R, and Machine Learning. Boost
              your data science skills!
            </p>
            <div className="flex gap-4">
              <Link
                to="/"
                className="bg-white text-cyan-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Learn More
              </Link>
              <Link
                to="/"
                className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition"
              >
                Exclusive for club members
              </Link>
            </div>
          </div>
          <div className="flex flex-col w-full gap-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg rotate-3 hover:rotate-0 hover:shadow-xl transition flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/drrhtmzpk/image/upload/v1743152299/DC_Donates_logo_regular_kilezb.png"
                alt="DataCamp Logo"
                className="h-28 object-contain"
              />
            </div>
            <div className="bg-black p-8 rounded-3xl shadow-lg -rotate-1 hover:rotate-0 hover:shadow-xl transition flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/drrhtmzpk/image/upload/v1743152299/DC_Donates_logo_inverted_mhlvl2.png"
                alt="DataCamp Dark Logo"
                className="h-28 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-6 py-24">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-cyan-500 mb-4">
            About Our Club
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The UIU Data Science Club is dedicated to promoting data science
            education, research, and applications among students of United
            International University.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {clubFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-8 text-center hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="max-w-6xl mx-auto bg-linear-to-b from-cyan-500/5 to-cyan-600/4 rounded-3xl py-16 md:py-24 mb-24 lg:py-32"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-cyan-500 mb-3">
            Upcoming Events
          </h2>
          <p className="text-gray-600 mb-12">
            Join us for our exciting events and activities throughout the
            semester
          </p>

          <div className="rounded-xl p-12 text-center max-w-2xl mx-auto bg-white border border-cyan-200/40">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-cyan-500 mb-2">
              No Upcoming Events
            </h3>
            <p className="text-gray-600 mb-6">
              We're currently planning our next batch of exciting events. Check
              back soon for updates, or follow us on social media for
              @UIUcodeforchange
            </p>
            <div className="flex justify-center gap-4 text-sm md:text-base">
              <Link
                to="/"
                className="text-zinc-900 border border-cyan-200/40 px-8 py-2 rounded-xl font-medium hover:bg-cyan-50 transition"
              >
                View Past Events →
              </Link>
              <Link
                to="/"
                className="text-white bg-cyan-500 border border-cyan-200/40 px-8 py-2 rounded-xl font-medium hover:bg-cyan-600 transition flex items-center gap-2"
              >
                Follow Updates
                <LinkIcon className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-gray-600 mt-8 text-sm">
              Want to suggest an event? Contact us at{' '}
              <a
                href="mailto:contact@iuudsc.club"
                className="text-cyan-600 hover:underline font-semibold"
              >
                contact@iuudsc.club
              </a>
            </p>
          </div>

          <div className="mt-10">
            <Link
              to="/"
              className="text-zinc-900 border-2 bg-white border-cyan-600 px-10 py-2 rounded-xl text-sm hover:bg-cyan-50 transition"
            >
              View All Events →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className=" px-6 py-20 mb-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-cyan-500">
            Join Our Club Today
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Become a part of UIU Data Science Club and embark on an exciting
            journey into the world of data science.
          </p>
          <Link
            to="/"
            className="text-white w-auto mx-auto bg-cyan-500 border border-cyan-200/40 px-8 py-2 rounded-xl text-sm hover:bg-cyan-600 "
          >
            Register Now
            
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  )
}
