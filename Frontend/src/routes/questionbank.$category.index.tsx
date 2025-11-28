import { useMemo } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { ArrowLeft, Calendar, ChevronRight } from 'lucide-react'

type ResourceItem = {
  id: string
  courseName: string
  courseCode?: string
  trimester?: string
  courseCredit: string
  courseType?: string
  questions?: {
    classTest?: Array<unknown>
    midtermExam?: Array<unknown>
    finalExam?: Array<unknown>
  }
  notes?: Array<unknown>
  practice?: Array<unknown>
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

export const Route = createFileRoute('/questionbank/$category/')({
  loader: async () => {
    try {
      const resources = await fetchResources()
      return { resources, error: null }
    } catch (err) {
      return { resources: [], error: err instanceof Error ? err.message : 'Failed to load' }
    }
  },
  component: CategoryPage,
})

function CategoryPage() {
  const { category } = Route.useParams()
  const { resources, error } = Route.useLoaderData()

  const isDepartmental = category === 'departmental'
  const categoryTitle = isDepartmental ? 'Departmental Courses' : 'Non-Departmental Courses'

  // Filter resources by category
  const filteredResources = useMemo(() => {
    return resources.filter((r) => {
      const type = (r.courseType ?? '').toLowerCase().replace(/\s+/g, '-')
      if (isDepartmental) {
        return type === 'departmental' || type === '' || !type
      }
      return type === 'non-departmental' || type === 'nondepartmental'
    })
  }, [resources, isDepartmental])

  // Group by trimester and count
  const trimesters = useMemo(() => {
    const trimesterList = Array.from({ length: 12 }, (_, i) => {
      const num = i + 1
      const suffix = num === 1 ? 'st' : num === 2 ? 'nd' : num === 3 ? 'rd' : 'th'
      return `${num}${suffix}`
    })

    return trimesterList.map((tri) => {
      const count = filteredResources.filter((r) => {
        const courseTrimester = (r.trimester ?? '').toLowerCase()
        return courseTrimester === tri.toLowerCase()
      }).length
      return { label: `Trimester ${tri.replace(/\D/g, '')}`, value: tri, count }
    })
  }, [filteredResources])

  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <Link
          to="/questionbank"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{categoryTitle}</h1>
          <p className="text-gray-500">Select a trimester to view available courses</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Trimester Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trimesters.map((tri) => (
            <Link
              key={tri.value}
              to="/questionbank/$category/$trimester"
              params={{ category, trimester: tri.value }}
              className={`bg-white border rounded-xl p-5 transition-all ${
                tri.count > 0
                  ? 'border-gray-200 hover:shadow-lg hover:border-cyan-300 cursor-pointer'
                  : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-5 h-5 text-cyan-600" />
                <span className="font-semibold text-gray-800">{tri.label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-sm ${tri.count > 0 ? 'text-cyan-600' : 'text-gray-400'}`}>
                  {tri.count} Course{tri.count !== 1 ? 's' : ''} Available
                </span>
                {tri.count > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
