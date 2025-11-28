import { useMemo } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { ArrowLeft, BookOpen, ChevronRight, FileText, Lightbulb } from 'lucide-react'

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

export const Route = createFileRoute('/questionbank/$category/$trimester/$courseId/')({
  loader: async () => {
    try {
      const resources = await fetchResources()
      return { resources, error: null }
    } catch (err) {
      return { resources: [], error: err instanceof Error ? err.message : 'Failed to load' }
    }
  },
  component: CoursePage,
})

function CoursePage() {
  const { category, trimester, courseId } = Route.useParams()
  const { resources, error } = Route.useLoaderData()

  const course = useMemo(() => {
    return resources.find((r) => r.id === courseId)
  }, [resources, courseId])

  if (!course) {
    return (
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-500">Course not found</p>
          <Link to="/questionbank" className="text-cyan-600 hover:underline mt-4 inline-block">
            Go back to Question Bank
          </Link>
        </div>
      </div>
    )
  }

  const hasQuestions =
    (course.questions?.classTest?.length ?? 0) > 0 ||
    (course.questions?.midtermExam?.length ?? 0) > 0 ||
    (course.questions?.finalExam?.length ?? 0) > 0
  const hasNotes = (course.notes?.length ?? 0) > 0
  const hasPractice = (course.practice?.length ?? 0) > 0

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <Link
          to="/questionbank/$category/$trimester"
          params={{ category, trimester }}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </Link>

        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {course.courseCode} - Select Resource Type
          </h1>
          <p className="text-gray-500">{course.courseName}</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
            {error}
          </div>
        )}

        {/* Course Info */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800 mb-2">Course Information</p>
              <span className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-full">
                {course.courseCredit} Credits
              </span>
            </div>
            <span className="px-4 py-1.5 bg-white border border-cyan-200 text-cyan-600 text-sm font-medium rounded-full">
              1 Trimester Available
            </span>
          </div>
        </div>

        {/* Resource Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Questions */}
          <Link
            to="/questionbank/$category/$trimester/$courseId/questions"
            params={{ category, trimester, courseId }}
            className={`bg-white border rounded-xl p-6 transition-all ${
              hasQuestions
                ? 'border-gray-200 hover:shadow-lg hover:border-cyan-300'
                : 'border-gray-100 opacity-60 pointer-events-none'
            }`}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">Questions</h3>
              {hasQuestions && <ChevronRight className="w-5 h-5 text-gray-400" />}
            </div>
            <p className="text-gray-500 text-sm mb-4">Previous exam questions and tests by trimester</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                hasQuestions ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {hasQuestions ? 'Available' : 'Not Available'}
            </span>
          </Link>

          {/* Notes */}
          <Link
            to="/questionbank/$category/$trimester/$courseId/notes"
            params={{ category, trimester, courseId }}
            className={`bg-white border rounded-xl p-6 transition-all ${
              hasNotes
                ? 'border-gray-200 hover:shadow-lg hover:border-cyan-300'
                : 'border-gray-100 opacity-60 pointer-events-none'
            }`}
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">Notes</h3>
              {hasNotes && <ChevronRight className="w-5 h-5 text-gray-400" />}
            </div>
            <p className="text-gray-500 text-sm mb-4">Course notes and study materials</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                hasNotes ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {hasNotes ? 'Available' : 'Not Available'}
            </span>
          </Link>

          {/* Practice */}
          <Link
            to="/questionbank/$category/$trimester/$courseId/practice"
            params={{ category, trimester, courseId }}
            className={`bg-white border rounded-xl p-6 transition-all ${
              hasPractice
                ? 'border-gray-200 hover:shadow-lg hover:border-cyan-300'
                : 'border-gray-100 opacity-60 pointer-events-none'
            }`}
          >
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <Lightbulb className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">Practice</h3>
              {hasPractice && <ChevronRight className="w-5 h-5 text-gray-400" />}
            </div>
            <p className="text-gray-500 text-sm mb-4">Practice problems and exercises</p>
            <span
              className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                hasPractice ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {hasPractice ? 'Available' : 'Not Available'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
