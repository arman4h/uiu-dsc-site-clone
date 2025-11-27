import { Facebook } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-cyan-50 border-t border-cyan-600/20 text-gray-300 px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-cyan-400 font-bold text-base mb-2">
              UIU Data Science Club
            </h3>
            <p className="text-xs text-gray-500">
              United International University
            </p>
            <p className="text-xs text-gray-500">
              United City, Madani Avenue, Sector 7, Dhaka
            </p>
          </div>
          <div></div>
          <div className="text-right">
            <a
              href="https://facebook.com"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-600 transition"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </a>
            <p className="text-xs">
              © 2025 UIU Data Science Club. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
