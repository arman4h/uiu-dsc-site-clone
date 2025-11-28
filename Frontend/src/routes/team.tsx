
import { createFileRoute } from '@tanstack/react-router'
import { Facebook, Linkedin, Mail } from 'lucide-react'
import Footer from '@/components/Footer'

export const Route = createFileRoute('/team')({
  component: TeamPage,
})

interface TeamMember {
  id: string
  name: string
  position: string
  image: string
  socials?: {
    email?: string
    linkedin?: string
    facebook?: string
  }
}

const teamData = {
  moderator: [
    {
      id: '1',
      name: 'MD. Khyalire Tasin Jahangir',
      position: 'Moderator',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/modaretor.png',
      socials: {
        email: 'khushnur@cse.uiu.ac.bd',
        linkedin: 'https://www.linkedin.com/in/khushnur',
      },
    },
  ],
  executiveCommittee: [
    {
      id: '2',
      name: 'Musfique Ahmed',
      position: 'President',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Anik.JPG',
      socials: {
        email: 'mahmed2330101@bsds.uiu.ac.bd',
        linkedin: 'https://www.linkedin.com/in/musfique-ahmed-aa89a5293',
        facebook: 'https://www.facebook.com/anik.mushfik',
      },
    },
    {
      id: '3',
      name: 'MD Mahidul Islam Mahi',
      position: 'Vice President',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Mahi.JPG',
      socials: {
        email: 'mmahi2330150@bsds.uiu.ac.bd',
        linkedin: 'https://www.linkedin.com/in/md-mahidul-islam-mahi-192759227',
        facebook: 'https://www.facebook.com/kmmahidulislam.mahi',
      },
    },
    {
      id: '4',
      name: 'Mushfiqur Rahman',
      position: 'General Secretary',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/ds_mushfiq_rahman_v2.webp',
      socials: {
        email: 'secretary@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '5',
      name: 'Meherun Mehnaj Miti',
      position: 'Joint Secretary',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Miti.JPG',
      socials: {
        email: 'treasurer@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '6',
      name: 'Faiyaz Rahman',
      position: 'Treasurer',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Faiyaz.JPG',
      socials: {
        email: 'additional@example.com',
      },
    },
  ],
  wingHeads: [
    {
      id: '7',
      name: 'Azraf Al Monzim',
      position: 'IT Wing Head',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Monzim.JPG',
      socials: {
        email: 'wing1@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '8',
      name: 'Abu Anas',
      position: 'Operations & Events Wing Head',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Anas.JPG',
      socials: {
        email: 'wing2@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '9',
      name: 'Farhan Tariq Jamee',
      position: 'Creative and Content Wing Head',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Jamee.JPG',
      socials: {
        email: 'wing3@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '10',
      name: 'Lamyea Tasnim',
      position: 'PR & Media Head',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Lameya.JPG',
      socials: {
        email: 'wing4@example.com',
        facebook: 'https://facebook.com',
      },
    },
    {
      id: '11',
      name: 'Ahammad Nafiz',
      position: 'Research & Development Wing',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Nafiz.JPG',
      socials: {
        email: 'wing5@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
  ],
  coHeads: [
    {
      id: '12',
      name: 'Habibur Rahman',
      position: 'Co-Head of Web Development Team',
      image: 'https://res.cloudinary.com/drrhtmzpk/image/upload/v1741801227/Habibur_Rahman_image_2_k4muww.jpg',
      socials: {
        email: 'cohead1@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '13',
      name: 'Azmain Islam',
      position: 'Co-Head Operations',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Azmain.JPG',
      socials: {
        email: 'cohead2@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '14',
      name: 'Fahim Hasan',
      position: 'Co-Head Event Management',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Fahim.JPG',
      socials: {
        email: 'cohead3@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '15',
      name: 'Sazzad Sunfi',
      position: 'Co-Head Photography',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/sunfi.png',
      socials: {
        email: 'cohead4@example.com',
      },
    },
    {
      id: '16',
      name: 'HM Mahin',
      position: 'Co-Head Videography',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/mahin.png',
      socials: {
        email: 'cohead5@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '17',
      name: 'Redoan Arefin Siam',
      position: 'Co-Head Creative and Planning',
      image: 'https://res.cloudinary.com/drrhtmzpk/image/upload/v1754575007/Siam.jpg',
      socials: {
        email: 'cohead6@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '18',
      name: 'Tasfiya Binte Karim',
      position: 'Co-Head Social Media Management',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/tasfia.JPG',
      socials: {
        email: 'cohead7@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
    {
      id: '19',
      name: 'Mahera Rezwan',
      position: 'Co-Head Communication',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Mahera.JPG',
      socials: {
        email: 'cohead8@example.com',
        facebook: 'https://facebook.com',
      },
    },
    {
      id: '20',
      name: 'Montasir Chowdhury',
      position: 'Research Co-Head',
      image: 'https://stg-dsc-prod.monzim.com/panel-25/Muntasir.JPG',
      socials: {
        email: 'cohead9@example.com',
        facebook: 'https://facebook.com',
      },
    },
    {
      id: '21',
      name: 'Atkia Mona Rahi',
      position: 'Academic Co-Head',
      image: 'https://res.cloudinary.com/drrhtmzpk/image/upload/v1754557482/Rahi_Academics_gqvhqy.jpg',
      socials: {
        email: 'cohead10@example.com',
        linkedin: 'https://linkedin.com',
      },
    },
  ],
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden  transition duration-300 flex flex-col items-center">
      <div className=" rounded-xl overflow-hidden mb-4">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full aspect-square object-cover hover:scale-105 transition-transform duration-300"
        />

      </div>
      <h3 className="text-center font-bold text-gray-900 text-sm">{member.name}</h3>
      <p className="text-center text-xs text-cyan-500 mb-3">{member.position}</p>
      <div className="flex justify-center gap-2">
        {member.socials?.email && (
          <a
            href={`mailto:${member.socials.email}`}
            className="text-gray-400 hover:text-cyan-600 transition"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        )}
        {member.socials?.linkedin && (
          <a
            href={member.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-600 transition"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {member.socials?.facebook && (
          <a
            href={member.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-600 transition"
            title="Facebook"
          >
            <Facebook className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  )
}

function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="bg-linear-to-b from-blue-50 to-white px-6 py-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-cyan-500 mb-2">
            Our Team
          </h1>
          <p className="text-lg text-gray-600">
            Meet the dedicated individuals who make the UIU Data Science Club happen
          </p>
        </div>
      </section>

      {/* Moderator Section */}
      <section className="px-6 pb-16 pt-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-500 text-center mb-8">
            Moderator
          </h2>
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              {teamData.moderator.map((member) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Executive Committee Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-600 text-center mb-12">
            Executive Committee
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamData.executiveCommittee.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Wing Heads Section */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-600 text-center mb-12">
            Wing Heads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamData.wingHeads.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Co-Heads & Other Positions Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-cyan-600 text-center mb-12">
            Co-Heads & Other Positions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {teamData.coHeads.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>


    </div>
  )
}
