import { Link } from '@tanstack/react-router'

export default function Header() {
  return (
    <>
      {/* Navbar */}
      <nav className="bg-white text-zinc-700 px-6 py-2 sticky top-0 z-50 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-28 h-10 bg-white rounded-full flex items-center justify-center font-bold text-teal-500">
              <img
                src="https://res.cloudinary.com/drrhtmzpk/image/upload/v1753383976/UIUDSC_Logo.png"
                alt="UIU Data Science Club"
                className="w-full"
              />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/about" className="hover:opacity-90 transition">
              About Us
            </Link>
            <Link to="/partners" className="hover:opacity-90 transition">
              Partners
            </Link>
            <Link to="/team" className="hover:opacity-90 transition">
              Team
            </Link>
            <Link to="/track" className="hover:opacity-90 transition">
              Track Application
            </Link>
            <Link to="/events" className="hover:opacity-90 transition">
              Events
            </Link>
            <Link to="/questionbank" className="hover:opacity-90 transition bg-cyan-500 rounded-xl text-white font-semibold px-4 py-2">
              Question Bank
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}
