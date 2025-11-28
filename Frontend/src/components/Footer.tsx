import { Facebook } from 'lucide-react'

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
          <div className="col-span-3 border-t border-cyan-100 pt-6 mt-4 text-center">
            <p className="text-sm mb-1 text-gray-500">
              This is a Clone Site of{' '}
              <a
                href="https://uiudsc.uiu.ac.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-600 font-semibold underline hover:text-cyan-800"
              >
                UIU Data Science Club
              </a>
            </p>
            <div className="flex flex-col justify-center items-center gap-3 mb-1">
              <span className="text-xs text-gray-400">
                Cloned By Arman Hossain
              </span>
              <div className='flex items-center gap-2'>
                <a
                  href="https://github.com/arman4h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-600 transition"
                  aria-label="GitHub"
                >
                  <svg height="18" width="18" fill="none" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M12 2C6.478 2 2 6.486 2 12.021c0 4.43 2.865 8.188 6.839 9.504.5.091.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.605-3.37-1.342-3.37-1.342-.455-1.161-1.11-1.47-1.11-1.47-.908-.621.069-.609.069-.609 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.089 2.91.833.091-.646.35-1.089.636-1.34-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.447-1.273.098-2.654 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 7.844c.85.004 1.706.115 2.506.338 1.909-1.296 2.748-1.025 2.748-1.025.546 1.381.202 2.4.1 2.654.64.7 1.028 1.594 1.028 2.688 0 3.848-2.337 4.695-4.566 4.944.36.309.679.92.679 1.854 0 1.338-.012 2.419-.012 2.749 0 .268.18.577.688.48C19.138 20.206 22 16.451 22 12.021 22 6.486 17.523 2 12 2"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="https://armanh.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-600 transition"
                  aria-label="Website"
                >
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <ellipse
                      cx="12"
                      cy="12"
                      rx="4"
                      ry="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M2 12h20"
                    />
                  </svg>
                </a>
                <a
                  href="mailto:hossain4arman@gmail.com"
                  className="text-gray-400 hover:text-cyan-600 transition"
                  aria-label="Mail"
                >
                  <svg height="18" width="18" fill="none" viewBox="0 0 24 24">
                    <rect
                      width="20"
                      height="16"
                      x="2"
                      y="4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      rx="3"
                    />
                    <path
                      stroke="currentColor"
                      strokeWidth="1.5"
                      d="M3 5c.569.395 4.73 3.579 7.119 5.372a3 3 0 0 0 3.762 0C16.27 8.578 20.431 5.395 21 5"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
