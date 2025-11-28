import { useMemo, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { ArrowLeft, ChevronRight, Monitor, Search } from 'lucide-react'

type ResourceItem = {
  id: string
  courseName: string
  courseCode?: string
  trimester?: string
  courseCredit: string
  courseType?: string
}

const fetchResources = createServerFn().handler(async () => {
  const baseUrl = process.env.BACKEND_URL ?? 'http://localhost:5000'
  const res = await fetch(`${baseUrl}/api/resources`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error(`Failed to fetch resources: ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error('Invalid response')
  return data as Array<ResourceItem>
})

export const Route = createFileRoute('/questionbank/$category/$trimester/')({
  loader: async () => {
    try {
      const resources = await fetchResources()
      return { resources, error: null }
    } catch (err) {
      return { resources: [], error: err instanceof Error ? err.message : 'Failed to load' }
    }
  },
  component: TrimesterPage,
})

function TrimesterPage() {
  const { category, trimester } = Route.useParams()
  const { resources, error } = Route.useLoaderData()
  const [searchQuery, setSearchQuery] = useState('')

  const isDepartmental = category === 'departmental'
  const categoryTitle = isDepartmental ? 'Departmental Courses' : 'Non-Departmental Courses'
  const trimesterNum = trimester.replace(/\D/g, '')

  // Filter courses by category and trimester
  const courses = useMemo(() => {
    return resources.filter((r) => {
      const type = (r.courseType ?? '').toLowerCase().replace(/\s+/g, '-')
      const matchesCategory = isDepartmental
        ? type === 'departmental' || type === '' || !type
        : type === 'non-departmental' || type === 'nondepartmental'

      // Simple trimester matching - compare the trimester value directly
      const courseTrimester = (r.trimester ?? '').toLowerCase()
      const urlTrimester = trimester.toLowerCase()
      const matchesTrimester = courseTrimester === urlTrimester

      return matchesCategory && matchesTrimester
    })
  }, [resources, isDepartmental, trimester])

  // Search filter
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses
    const q = searchQuery.toLowerCase()
    return courses.filter(
      (c) =>
        c.courseName.toLowerCase().includes(q) ||
        (c.courseCode ?? '').toLowerCase().includes(q)
    )
  }, [courses, searchQuery])

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <Link
          to="/questionbank/$category"
          params={{ category }}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {categoryTitle} - Trimester {trimesterNum}
          </h1>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-8">
          <div className="flex items-center bg-white border border-gray-200 rounded-full px-5 py-3 shadow-sm max-w-xl mx-auto">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No courses available for this trimester.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCourses.map((course) => (
              <Link
                key={course.id}
                to="/questionbank/$category/$trimester/$courseId"
                params={{ category, trimester, courseId: course.id }}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg hover:border-cyan-300 transition-all group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {trimester} Trimester
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                    {course.courseCredit} Credits
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <Monitor className="w-4 h-4 text-cyan-600" />
                  <span className="font-bold text-gray-800">{course.courseCode}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{course.courseName}</p>

                <div className="flex items-center justify-between">
                  <span className="text-cyan-600 text-sm">View Resources</span>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
