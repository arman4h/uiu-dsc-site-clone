import { Camera } from 'lucide-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import Footer from '@/components/Footer'
import Joinclub from '@/components/Joinclub'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})


const galleryImages = [
  'https://images.unsplash.com/photo-1757143090822-df6101c314e3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFVuaXZlcnNpdHklMjBDbHViJTIwRXZlbnRzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1747674148491-51f8a5c723db?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fFVuaXZlcnNpdHklMjBDbHViJTIwRXZlbnRzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1755469163642-15b96466924a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fFVuaXZlcnNpdHklMjBDbHViJTIwRXZlbnRzfGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1581617616979-ca3d553d0120?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzN8fFVuaXZlcnNpdHklMjBDbHViJTIwRXZlbnRzfGVufDB8fDB8fHww',
]

function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero with center image + tagline */}
      <section className="px-6 pt-12 pb-8 bg-linear-to-b from-blue-50 to-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mx-auto w-72 rounded-2xl overflow-hidden ">
            <img
              src="https://res.cloudinary.com/drrhtmzpk/image/upload/v1753383976/UIUDSC_Logo.png"
              alt="UIU DSC"
              className="w-full object-cover"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-600 mt-6">About Our Club</h1>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Empowering students with practical data science skills, building a strong community, and creating real-world impact through learning and collaboration.
          </p>
        </div>
      </section>

      {/* Goals & How we work */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl font-bold text-cyan-600 mb-4">Our Goals</h2>
            <p className="text-gray-700 mb-4">
              We aim to promote data science education at UIU by organizing workshops, providing hands-on projects, and creating opportunities for students to learn, network, and grow.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide practical, project-based learning</li>
              <li>Connect students with industry partners and mentors</li>
              <li>Host events, competitions and hackathons</li>
              <li>Support members with career resources and certifications</li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-cyan-600 mb-4">How We Work</h2>
            <p className="text-gray-700 mb-4">
              We operate through collaborative wings (Tech, Events, Media, Research) led by student wing heads. Activities include weekly workshops, project sprints, and partnered events with industry sponsors.
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Run regular learning sessions and mentorship circles.</li>
              <li>Open projects where members can contribute and learn by doing.</li>
              <li>Partner with industry for internships, courses, and sponsorship.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-6 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-cyan-600">Gallery</h2>
              <p className="text-gray-600">A selection of moments from our events and workshops.</p>
            </div>
            <div className='flex justify-end '>
              <Link to="/gallery" className="flex justify-end  items-center gap-2 bg-white border border-cyan-200 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition">
                See Photo Gallery <Camera className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((src, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition">
                <img src={src} alt={`gallery-${i}`} className="w-full h-44 object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Join */}
      <Joinclub/>


    </div>
  )
}

