import { useMemo } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { ArrowLeft, BookOpen, ExternalLink, FileText, Mail, User } from 'lucide-react'

type NoteItem = {
  author?: string
  email?: string
  id?: string
  noteTitle?: string
  driveLink?: string
}

type ResourceItem = {
  id: string
  courseName: string
  courseCode?: string
  notes?: Array<NoteItem>
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

export const Route = createFileRoute('/questionbank/$category/$trimester/$courseId/notes')({
  loader: async () => {
    try {
      const resources = await fetchResources()
      return { resources, error: null }
    } catch (err) {
      return { resources: [], error: err instanceof Error ? err.message : 'Failed to load' }
    }
  },
  component: NotesPage,
})

function NotesPage() {
  const { category, trimester, courseId } = Route.useParams()
  const { resources } = Route.useLoaderData()

  const course = useMemo(() => resources.find((r: ResourceItem) => r.id === courseId), [resources, courseId])

  if (!course) {
    return (
      <div className="py-8 sm:py-12 text-center px-4">
        <p className="text-gray-500">Course not found</p>
      </div>
    )
  }

  const notes = course.notes ?? []

  // Group notes by author
  const notesByAuthor = useMemo(() => {
    const grouped = new Map<string, typeof notes>()
    notes.forEach((note: NoteItem) => {
      const authorKey = note.author ?? 'Unknown'
      if (!grouped.has(authorKey)) {
        grouped.set(authorKey, [])
      }
      grouped.get(authorKey)!.push(note)
    })
    return Array.from(grouped.entries())
  }, [notes])

  return (
    <div className="py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Back Button */}
        <Link
          to="/questionbank/$category/$trimester/$courseId"
          params={{ category, trimester, courseId }}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 sm:mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </Link>

        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
            {course.courseCode} - Notes
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">{course.courseName}</p>
        </header>

        {notes.length === 0 ? (
          <div className="text-center py-8 sm:py-12 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No notes available for this course.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {notesByAuthor.map(([authorName, authorNotes]) => {
              const firstNote = authorNotes[0]
              const initials = authorName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)

              return (
                <div key={authorName} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                  {/* Author Header */}
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl border-2 border-white/30">
                          {initials}
                        </div>
                        <div className="text-white">
                          <div className="flex items-center gap-2 mb-1">
                            <FileText className="w-4 h-4" />
                            <span className="font-medium text-sm sm:text-base">
                              {course.courseName} Notes
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3 h-3 opacity-80" />
                            <span className="text-sm opacity-90">{authorName}</span>
                          </div>
                          {firstNote?.email && (
                            <p className="text-xs opacity-75 mt-0.5">{firstNote.email}</p>
                          )}
                          {firstNote?.id && (
                            <p className="text-xs opacity-75">ID: {firstNote.id}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur text-white text-xs sm:text-sm font-medium rounded-full border border-white/30">
                          {authorNotes.length} {authorNotes.length === 1 ? 'File' : 'Files'}
                        </span>
                        {firstNote?.email && (
                          <a
                            href={`mailto:${firstNote.email}`}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-cyan-600 text-xs sm:text-sm font-medium rounded-full hover:bg-cyan-50 transition-colors"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>Contact</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="divide-y divide-gray-100">
                    {authorNotes.map((note: NoteItem, idx: number) => (
                      <div
                        key={`note-${idx}`}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-cyan-50 rounded-xl flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-cyan-600" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 text-sm sm:text-base truncate">
                              {note.noteTitle ?? `Notes Document ${idx + 1}`}
                            </p>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                                PDF Document
                              </span>
                              <span className="text-cyan-600 text-xs font-medium">Course Material</span>
                            </div>
                          </div>
                        </div>
                        {note.driveLink && (
                          <a
                            href={note.driveLink}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-xl text-cyan-700 hover:bg-cyan-100 transition-colors text-sm font-medium w-full sm:w-auto"
                          >
                            <ExternalLink className="w-4 h-4" />
                            <span>View</span>
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
