import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'

export default function Header() {
  const navLinks = [
    { to: '/about' as const, label: 'About Us' },
    { to: '/partners' as const, label: 'Partners' },
    { to: '/team' as const, label: 'Team' },
    { to: '/events' as const, label: 'Events' },
    { to: '/questionbank' as const, label: 'Question Bank' },
  ]

  return (
    <nav className="bg-white text-zinc-700 px-6 py-2 sticky top-0 z-50 border-b border-cyan-500/30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-28 h-10 bg-white rounded-full flex items-center justify-center font-bold text-teal-500">
            <Link to="/" className="cursor-pointer">
              <img
                src="https://res.cloudinary.com/drrhtmzpk/image/upload/v1753383976/UIUDSC_Logo.png"
                alt="UIU Data Science Club"
                className="w-full"
              />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className="hover:opacity-90 transition">
              {link.label}
            </Link>
          ))}
          <Link
            to="/join"
            className="hover:opacity-90 transition bg-cyan-500 rounded-xl text-white font-semibold px-4 py-2"
          >
            Join Club
          </Link>
        </div>

        {/* Mobile Menu - Using native details/summary for no-JS support */}
        <details className="md:hidden group relative">
          <summary className="list-none flex items-center justify-center w-10 h-10 text-zinc-700 hover:bg-gray-100 active:bg-gray-200 rounded-lg cursor-pointer [&::-webkit-details-marker]:hidden">
            <Menu className="w-6 h-6" />
          </summary>
          
          {/* Mobile Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-50">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-4 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="px-2 pt-2 mt-2 border-t border-gray-100">
              <Link
                to="/join"
                className="block text-center bg-cyan-500 rounded-xl text-white font-semibold px-4 py-2.5 hover:bg-cyan-600 transition-colors"
              >
                Join Club
              </Link>
            </div>
          </div>
        </details>
      </div>
    </nav>
  )
}
