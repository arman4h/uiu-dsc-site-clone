import { useMemo } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'

type ResourceItem = {
  id: string
  courseName: string
  courseCode?: string
  practice?: Array<{
    documentTitle?: string
    driveLink?: string
  }>
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

export const Route = createFileRoute('/questionbank/$category/$trimester/$courseId/practice')({
  loader: async () => {
    try {
      const resources = await fetchResources()
      return { resources, error: null }
    } catch (err) {
      return { resources: [], error: err instanceof Error ? err.message : 'Failed to load' }
    }
  },
  component: PracticePage,
})

function PracticePage() {
  const { category, trimester, courseId } = Route.useParams()
  const { resources } = Route.useLoaderData()

  const course = useMemo(() => resources.find((r: { id: any }) => r.id === courseId), [resources, courseId])

  if (!course) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    )
  }

  const practiceItems = course.practice ?? []

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <Link
          to="/questionbank/$category/$trimester/$courseId"
          params={{ category, trimester, courseId }}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {course.courseCode} - Practice Materials
          </h1>
          <p className="text-gray-500">{course.courseName}</p>
        </header>

        {practiceItems.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No practice materials available.</div>
        ) : (
          <div className="space-y-4">
            {practiceItems.map((item: { documentTitle: any; driveLink: string | undefined }, idx: number) => (
              <div
                key={`practice-${idx}`}
                className="bg-white border border-gray-200 rounded-xl p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {item.documentTitle ?? `Practice Document ${idx + 1}`}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                        PDF Document
                      </span>
                      <span className="text-orange-500 text-xs">Practice Exercise</span>
                    </div>
                  </div>
                </div>
                {item.driveLink && (
                  <a
                    href={item.driveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
