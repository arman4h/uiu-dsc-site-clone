import { useMemo } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { ArrowLeft, ChevronRight, ClipboardList, FileText, GraduationCap } from 'lucide-react'

type ResourceItem = {
  id: string
  courseName: string
  courseCode?: string
  trimester?: string
  questions?: {
    classTest?: Array<{ testNo?: string; trimesterName?: string; driveLink?: string }>
    midtermExam?: Array<{ trimesterName?: string; driveLink?: string }>
    finalExam?: Array<{ trimesterName?: string; driveLink?: string }>
  }
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

export const Route = createFileRoute('/questionbank/$category/$trimester/$courseId/questions/')({
  loader: async () => {
    try {
      const resources = await fetchResources()
      return { resources, error: null }
    } catch (err) {
      return { resources: [], error: err instanceof Error ? err.message : 'Failed to load' }
    }
  },
  component: QuestionsPage,
})

function QuestionsPage() {
  const { category, trimester, courseId } = Route.useParams()
  const { resources } = Route.useLoaderData()

  const course = useMemo(() => resources.find((r) => r.id === courseId), [resources, courseId])

  if (!course) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Course not found</p>
      </div>
    )
  }

  const classTestCount = course.questions?.classTest?.length ?? 0
  const midtermCount = course.questions?.midtermExam?.length ?? 0
  const finalCount = course.questions?.finalExam?.length ?? 0

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
            {course.courseCode} - Select Question Type
          </h1>
          <p className="text-gray-500">{course.courseName}</p>
        </header>

        {/* Question Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Class Tests */}
          <Link
            to="/questionbank/$category/$trimester/$courseId/questions/$type"
            params={{ category, trimester, courseId, type: 'classtest' }}
            className={`bg-white border rounded-xl p-6 transition-all ${
              classTestCount > 0
                ? 'border-gray-200 hover:shadow-lg hover:border-cyan-300'
                : 'border-gray-100 opacity-60 pointer-events-none'
            }`}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">Class Tests</h3>
              {classTestCount > 0 && <ChevronRight className="w-5 h-5 text-gray-400" />}
            </div>
            <p className="text-gray-500 text-sm mb-4">Class test questions from all trimesters</p>
            <div className="flex items-center justify-between">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  classTestCount > 0 ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {classTestCount > 0 ? 'Available' : 'Not Available'}
              </span>
              <span className="text-sm text-gray-400">{classTestCount} Questions</span>
            </div>
          </Link>

          {/* Midterm Exams */}
          <Link
            to="/questionbank/$category/$trimester/$courseId/questions/$type"
            params={{ category, trimester, courseId, type: 'midterm' }}
            className={`bg-white border rounded-xl p-6 transition-all ${
              midtermCount > 0
                ? 'border-gray-200 hover:shadow-lg hover:border-cyan-300'
                : 'border-gray-100 opacity-60 pointer-events-none'
            }`}
          >
            <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4">
              <ClipboardList className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">Midterm Exams</h3>
              {midtermCount > 0 && <ChevronRight className="w-5 h-5 text-gray-400" />}
            </div>
            <p className="text-gray-500 text-sm mb-4">Midterm exam questions from all trimesters</p>
            <div className="flex items-center justify-between">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  midtermCount > 0 ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {midtermCount > 0 ? 'Available' : 'Not Available'}
              </span>
              <span className="text-sm text-gray-400">{midtermCount} Question{midtermCount !== 1 ? 's' : ''}</span>
            </div>
          </Link>

          {/* Final Exams */}
          <Link
            to="/questionbank/$category/$trimester/$courseId/questions/$type"
            params={{ category, trimester, courseId, type: 'final' }}
            className={`bg-white border rounded-xl p-6 transition-all ${
              finalCount > 0
                ? 'border-gray-200 hover:shadow-lg hover:border-cyan-300'
                : 'border-gray-100 opacity-60 pointer-events-none'
            }`}
          >
            <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-orange-500" />
            </div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-800">Final Exams</h3>
              {finalCount > 0 && <ChevronRight className="w-5 h-5 text-gray-400" />}
            </div>
            <p className="text-gray-500 text-sm mb-4">Final exam questions from all trimesters</p>
            <div className="flex items-center justify-between">
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                  finalCount > 0 ? 'bg-cyan-100 text-cyan-700' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {finalCount > 0 ? 'Available' : 'Not Available'}
              </span>
              <span className="text-sm text-gray-400">{finalCount} Question{finalCount !== 1 ? 's' : ''}</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
