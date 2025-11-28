
import { Link, createFileRoute } from '@tanstack/react-router'
import { ExternalLink, Facebook, Linkedin, Mail } from 'lucide-react'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/partners')({
  component: PartnersPage,
})

function PartnersPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-linear-to-b from-blue-50 to-white px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-600 mb-2">
            Our Partners
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            UIU Data Science Club collaborates with industry leaders to provide
            our members with valuable resources and opportunities.
          </p>
        </div>
      </section>

      {/* Featured Partnership */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl border border-cyan-100 p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12  gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block text-cyan-600 bg-cyan-50/60 px-3 py-1 rounded-full text-sm font-medium mb-4">
                Official Partnership
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                DataCamp Donates Partnership
              </h2>
              <p className="text-gray-700 mb-4">
                We are thrilled to announce that UIU Data Science Club is now an
                official partner of DataCamp Donates! As part of this
                partnership, our members will receive a 1-year DataCamp
                subscription — absolutely FREE.
              </p>

              <h3 className="text-lg font-semibold text-cyan-500 mb-2">
                Why DataCamp?
              </h3>
              <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                <li>350+ courses on Python, SQL, R, Machine Learning & more</li>
                <li>
                  Hands-on coding experience in an interactive environment
                </li>
                <li>
                  Career tracks & skill tracks tailored for data professionals
                </li>
                <li>
                  Industry-recognized certifications that add value to your
                  resume
                </li>
              </ul>

              <h3 className="text-lg font-semibold text-cyan-500 mb-2">
                DataCamp Certification = Job Market Advantage
              </h3>

              <p className="text-gray-700 mb-6">
                Employers worldwide recognize DataCamp certifications as proof of practical skills in data science and analytics. With this opportunity, you can build a strong portfolio and stand out in the competitive job market!
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/"
                  className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Learn About DataCamp Donates
                  <ExternalLink className="w-4 h-4" />
                </a>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 border border-cyan-200 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition"
                >
                  Join Our Club
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 w-full flex flex-col justify-center lg:justify-end">
              <div className="p-4 shadow-lg rounded-xl">
                <div className="w-full max-w-xl bg-white rounded-xl overflow-hidden">
                  <img
                    src="https://res.cloudinary.com/drrhtmzpk/image/upload/v1743113251/482350231_122118078644779406_7275636371460141339_n_o48wvb.jpg"
                    alt="DataCamp"
                    className="w-full object-contain bg-white"
                  />
                </div>
                <div className="flex flex-col text-center justify-center">
                  <h2 className="text-gray-900 text-lg font-bold pt-5 pb-3">
                    Eligibility
                  </h2>
                  <p className="text-gray-400 text-sm font-light">
                    All active members of UIU Data Science Club are eligible for
                    the free DataCamp subscription.
                  </p>
                  
                  <div className="py-8 mt-4 border-t border-cyan-300 flex gap-4 items-center">
                    <div className="bg-white px-8 py-4 rounded-xl transition flex items-center justify-center">
                      <img
                        src="https://res.cloudinary.com/drrhtmzpk/image/upload/v1743152299/DC_Donates_logo_regular_kilezb.png"
                        alt="DataCamp Logo"
                        className=" object-contain"
                      />
                    </div>
                    <div className="bg-black px-8 py-4 rounded-xl  flex items-center justify-center">
                      <img
                        src="https://res.cloudinary.com/drrhtmzpk/image/upload/v1743152299/DC_Donates_logo_inverted_mhlvl2.png"
                        alt="DataCamp Dark Logo"
                        className=" object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Become Our Partner */}
      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="inline-block text-cyan-600 bg-cyan-50/60 px-3 py-1 rounded-full text-sm font-medium mb-4">
              Collaboration Opportunities
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Become Our Partner
            </h2>
            <p className="text-gray-700 mb-4">
              We’re constantly looking for industry partners who share our
              passion for data science and want to contribute to student growth.
              Partner with UIU Data Science Club to access talented students,
              promote your brand, and create meaningful impact.
            </p>

            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>
                Access talented students passionate about data science and AI
              </li>
              <li>Co-host events, workshops and hackathons</li>
              <li>Brand visibility across our network and events</li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-cyan-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Get in Touch
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Interested in partnering with UIU Data Science Club? Reach out
                to our partnership team through any of these channels.
              </p>

              <div className="space-y-3">
                <a
                  className="flex items-center gap-3 bg-cyan-50/60 rounded-lg px-4 py-3 text-sm"
                  href="mailto:club@datascience.uiu.ac.bd"
                >
                  <Mail className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-xs text-gray-500">Email Us</div>
                    <div className="text-sm text-gray-900">
                      club@datascience.uiu.ac.bd
                    </div>
                  </div>
                </a>

                <a
                  className="flex items-center gap-3 bg-cyan-50/60 rounded-lg px-4 py-3 text-sm"
                  href="#"
                >
                  <Linkedin className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-xs text-gray-500">LinkedIn</div>
                    <div className="text-sm text-gray-900">
                      UIU Data Science Club
                    </div>
                  </div>
                </a>

                <a
                  className="flex items-center gap-3 bg-cyan-50/60 rounded-lg px-4 py-3 text-sm"
                  href="#"
                >
                  <Facebook className="w-5 h-5 text-cyan-600" />
                  <div>
                    <div className="text-xs text-gray-500">Facebook</div>
                    <div className="text-sm text-gray-900">
                      UIU Data Science Club
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
