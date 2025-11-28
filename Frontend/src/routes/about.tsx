import { Camera } from 'lucide-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import Footer from '@/components/Footer'
import Joinclub from '@/components/Joinclub'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})


const galleryImages = [
  'https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/528222452_122145127400779406_4016274162636514116_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH4JG442LN7nd9HHWvgEv73GyaaG4zXJt0bJpobjNcm3UdATWBiaLCjjFe5FCVaHjsC-jD2W7mrK_OkwzVWCNkk&_nc_ohc=z0DudCgOM0oQ7kNvwEFVz1A&_nc_oc=AdmbRh5XMvCoJx4ITuL2etQKOYuQ9UO9VBCIU_Yz9IPfk_2Zm8uJfR8DRwq8zz1K-Fk&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=FtXfAk0ooNdfHADrglLdoA&oh=00_Afh7oSm5lO7hBRJFXGaKVOugiUPFum0eSppaX58Tj4trkg&oe=692E22ED',
  'https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/528923515_122145128618779406_4544793405617863744_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHC7-lyp73w0gWdCMOozL3zZkDREuFGc89mQNES4UZzz97WpUKf5oTSEhvshWmYxl2-J5aiLJNyntMi_Q7Jjmv7&_nc_ohc=OqGNhjWlDSIQ7kNvwF9yTDY&_nc_oc=Adk_gSCqmg-8xy7cNklxE8xTT7yKEOLG3XtDPPUksjplKAuiDbJYOmrfpCjEmiTLSng&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=WexMX1CXN9mbSe_mOJjNCQ&oh=00_AfjJ-EdKD9Y-2rpqnadivePp9QLVrptoLdZaamFKJHt2XA&oe=692E31CA',
  'https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/537386129_122147451536779406_2629895243971154060_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF2HbyOTfYEhXGEohgTUfO9uVuB2HAj0t25W4HYcCPS3eCIO4rObzGn9PZtNa_JxRwggP8iGl3EEk0A4Dn-7UqC&_nc_ohc=Qnr7Q54FKXoQ7kNvwHpf4SG&_nc_oc=AdlIsU_zqixRRt-BbhLkWToStzxXRtP7Avnd75tuf6_qtzmyiRMNKnUeuLs6lcZMaEU&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=ye_eBdfuKORpuESlUCAkAA&oh=00_Afg_t3QoLeX_O1-Wzal2PoWT-ZR8DVx5FcOWj7ok0riR-Q&oe=692E2406',
  'https://scontent.fdac155-1.fna.fbcdn.net/v/t39.30808-6/537093556_122147947916779406_5832389922899693780_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHEYASU5wmQ2-EYB-B41T6bLsUbzbJRlnEuxRvNslGWcYpVrUqQANKXgnRnE5DSnySZsbrBX6QiMoH6gO9bgfoX&_nc_ohc=tuU6f-1G3VoQ7kNvwE7s9Qy&_nc_oc=AdlryLRNLuQLjdVqOoekOXgn3V_-YLNPH0OFgzyDNZrUeAN8gHxHknZIOGd8O6YW2us&_nc_zt=23&_nc_ht=scontent.fdac155-1.fna&_nc_gid=vY7JRtwuuveJv0Z0C5lX8Q&oh=00_AfhBTZQ54ooia5aGKim6Vczc9Q1RnPic1hthQPe2Wekxew&oe=692E46BE',
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
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-cyan-600">Gallery</h2>
              <p className="text-gray-600">A selection of moments from our events and workshops.</p>
            </div>
            <div>
              <Link to="/gallery" className="inline-flex items-center gap-2 bg-white border border-cyan-200 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition">
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

