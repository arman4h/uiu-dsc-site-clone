import { createFileRoute } from '@tanstack/react-router'
import {
  BookOpen,
  ChevronRight,
  Layers,
  Play,
  Search,
  X,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ChangeEvent } from 'react'

export const Route = createFileRoute('/questionbank')({
  component: RouteComponent,
})

type Course = {
  id: string
  title: string
  department: string
  trimester: number
  category: 'departmental' | 'non-departmental'
  resourcesCount: number
}

const sampleCourses: Array<Course> = [
  { id: 'c1', title: 'Intro to Programming', department: 'CSE', trimester: 1, category: 'departmental', resourcesCount: 5 },
  { id: 'c2', title: 'Data Structures', department: 'CSE', trimester: 3, category: 'departmental', resourcesCount: 8 },
  { id: 'c3', title: 'Linear Algebra', department: 'Math', trimester: 2, category: 'departmental', resourcesCount: 3 },
  { id: 'c4', title: 'Public Speaking', department: 'General', trimester: 5, category: 'non-departmental', resourcesCount: 2 },
  { id: 'c5', title: 'Database Systems', department: 'CSE', trimester: 6, category: 'departmental', resourcesCount: 6 },
  { id: 'c6', title: 'Statistics for Data Science', department: 'Math', trimester: 4, category: 'departmental', resourcesCount: 7 },
  { id: 'c7', title: 'Advanced Excel', department: 'General', trimester: 2, category: 'non-departmental', resourcesCount: 4 },
]

const sampleResources: Record<
  string,
  {
    questions: Array<{ id: string; title: string; link?: string; uploadedAt?: string }>;
    notes: Array<{ id: string; title: string; link?: string; uploadedAt?: string }>;
    practice: Array<{ id: string; title: string; link?: string; uploadedAt?: string }>;
  }
> = {
  c1: {
    questions: [
      { id: 'q1', title: 'Intro Quiz 1 (Midterm)', link: '#', uploadedAt: '2025-03-01' },
      { id: 'q2', title: 'Intro Quiz 2 (Final)', link: '#', uploadedAt: '2025-04-01' },
    ],
    notes: [
      { id: 'n1', title: 'Lecture Notes: Variables', link: '#', uploadedAt: '2025-02-10' },
      { id: 'n2', title: 'Lab Notes: Getting Started', link: '#', uploadedAt: '2025-02-12' },
    ],
    practice: [
      { id: 'p1', title: 'Practice Set 1', link: '#', uploadedAt: '2025-02-20' },
    ],
  },
  c2: {
    questions: [{ id: 'q3', title: 'DS Midterm', link: '#', uploadedAt: '2025-05-10' }],
    notes: [{ id: 'n3', title: 'Trees & Graphs Notes', link: '#', uploadedAt: '2025-04-25' }],
    practice: [{ id: 'p2', title: 'DS Practice Problems', link: '#', uploadedAt: '2025-05-01' }],
  },
  c3: {
    questions: [{ id: 'q4', title: 'Linear Algebra Midterm', link: '#', uploadedAt: '2025-04-20' }],
    notes: [{ id: 'n4', title: 'Matrix Properties Notes', link: '#', uploadedAt: '2025-03-15' }],
    practice: [],
  },
  c4: {
    questions: [],
    notes: [{ id: 'n5', title: 'Public Speaking Slides', link: '#', uploadedAt: '2025-06-02' }],
    practice: [{ id: 'p3', title: 'Speech Practice Tasks', link: '#', uploadedAt: '2025-06-05' }],
  },
  c5: { questions: [], notes: [], practice: [] },
  c6: { questions: [], notes: [], practice: [] },
  c7: { questions: [], notes: [], practice: [] },
}

function RouteComponent() {
  const [category, setCategory] = useState<string>('')
  const [trimester, setTrimester] = useState<string>('')
  const [selectedCourse, setSelectedCourse] = useState<string>('')
  const [panelOpen, setPanelOpen] = useState<boolean>(false)

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name === 'category') setCategory(value)
    if (name === 'trimester') {
      setTrimester(value)
      // reset selected course when trimester changes
      setSelectedCourse('')
      setPanelOpen(false)
    }
    if (name === 'course') setSelectedCourse(value)
  }

  // Courses available based on filters
  const filteredCourses = useMemo(() => {
    let list = sampleCourses
    if (category) {
      list = list.filter((c) => c.category === category)
    }
    if (trimester) {
      const t = Number(trimester)
      list = list.filter((c) => c.trimester === t)
    }
    return list
  }, [category, trimester])

  // For the course selector: show all courses if trimester not selected, otherwise show trimester-specific
  const courseSelectorOptions = useMemo(() => {
    if (!trimester) return sampleCourses
    const t = Number(trimester)
    return sampleCourses.filter((c) => c.trimester === t)
  }, [trimester])

  const handleCardClick = (id: string) => {
    console.debug('card click', id, { selectedCourse, panelOpen })
    if (selectedCourse === id) {
      // toggle
      setSelectedCourse('')
      setPanelOpen(false)
      return
    }
    setSelectedCourse(id)
    setPanelOpen(true)
    setActiveTab('questions')
  }

  const closePanel = () => {
    setPanelOpen(false)
    // keep selectedCourse so re-opening is possible, but you can clear if preferred
    // setSelectedCourse('')
  }

  const [activeTab, setActiveTab] = useState<'questions' | 'notes' | 'practice'>('questions')

  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-700 px-4 py-1 rounded-full mb-4">
            <Play className="w-4 h-4" />
            <span className="text-sm">Questions Bank</span>
          </div>
          <h1 className="text-4xl font-bold text-cyan-600">Resource Archive</h1>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            Access previous exam questions, notes, and practice materials from different courses. Find class tests, midterm, and final exams organized by department type, trimester, and course.
          </p>
        </div>

        {/* Dashboard filters */}
        <section className="bg-white border border-gray-100 rounded-lg p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Course Category</label>
              <select name="category" value={category} onChange={handleSelect} className="w-full px-3 py-2 border border-gray-200 rounded">
                <option value="">All Categories</option>
                <option value="departmental">Departmental Course</option>
                <option value="non-departmental">Non Departmental Course</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Trimester</label>
              <select name="trimester" value={trimester} onChange={handleSelect} className="w-full px-3 py-2 border border-gray-200 rounded">
                <option value="">All Trimesters</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((t) => (
                  <option key={t} value={String(t)}>{t}th</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-2">Course (Available Resources)</label>
              <select name="course" value={selectedCourse} onChange={handleSelect} className="w-full px-3 py-2 border border-gray-200 rounded">
                <option value="">All Courses</option>
                {courseSelectorOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} — {c.department} (Trimester {c.trimester})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Broadcast / boardcamp small design */}
        <section className="mb-6">
          <div className="flex items-center justify-between bg-cyan-50 border border-cyan-100 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <Layers className="w-6 h-6 text-cyan-600" />
              <div>
                <p className="text-sm text-cyan-800 font-semibold">Resource Tracker</p>
                <p className="text-xs text-gray-600">Showing {filteredCourses.length} courses matching your filters</p>
              </div>
            </div>
            <div className="text-sm text-gray-500">Last updated: Nov 27, 2025</div>
          </div>
        </section>

        {/* Resources list + right-side panel wrapper */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Resources</h3>

          <div className="relative">
            {/* Debug badge (visible during development) */}
            <div className="fixed left-4 bottom-4 bg-white border border-gray-200 rounded-md px-3 py-2 text-xs text-gray-600 shadow z-10000">
              <div>panelOpen: <strong className="text-cyan-600">{String(panelOpen)}</strong></div>
              <div>selected: <strong className="text-gray-800">{selectedCourse || '—'}</strong></div>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10`}>
              {(selectedCourse ? sampleCourses.filter((c) => c.id === selectedCourse) : filteredCourses.length ? filteredCourses : sampleCourses).map((course) => (
                <article
                  key={course.id}
                  className={`cursor-pointer bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transform hover:scale-[1.01] transition-transform duration-150 ${selectedCourse === course.id ? 'ring-2 ring-cyan-200' : ''}`}>
                  <div className="p-4" onClick={() => handleCardClick(course.id)} role="button" tabIndex={0}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-cyan-600" />
                          {course.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">{course.department} • Trimester {course.trimester}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-sm font-medium">
                          <Search className="w-4 h-4" /> {course.resourcesCount}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-sm text-gray-600">{course.resourcesCount} resources</div>
                      <button className="inline-flex items-center gap-2 text-cyan-600 hover:underline">
                        View Resources <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Backdrop for panel */}
            <div
              onClick={closePanel}
              className={`fixed inset-0 bg-black/30 z-9998 transition-opacity ${panelOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Right side sliding panel (fixed overlay) */}
            <aside
              className={`fixed top-0 right-0 h-full z-9999 w-full sm:w-96 bg-white border-l border-gray-100 shadow-lg transform transition-transform duration-300 ${panelOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}
              aria-hidden={!panelOpen}
            >
              <div className="p-4 flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{selectedCourse ? sampleCourses.find((c) => c.id === selectedCourse)?.title : 'Course Resources'}</h4>
                  <p className="text-sm text-gray-500 mt-1">Resources for the selected course</p>
                </div>
                <button onClick={closePanel} className="p-2 rounded hover:bg-gray-100">
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-4 border-t border-gray-100 overflow-y-auto" style={{ maxHeight: '60vh' }}>
                {/* Tabs for Questions / Notes / Practice */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setActiveTab('questions')}
                    className={`px-3 py-1 rounded-md text-sm ${activeTab === 'questions' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                    Questions
                  </button>
                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`px-3 py-1 rounded-md text-sm ${activeTab === 'notes' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                    Notes
                  </button>
                  <button
                    onClick={() => setActiveTab('practice')}
                    className={`px-3 py-1 rounded-md text-sm ${activeTab === 'practice' ? 'bg-cyan-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                    Practice
                  </button>
                </div>

                {selectedCourse ? (
                  (() => {
                    const resourcesObj = (sampleResources as Record<string, any>)[selectedCourse] ?? { questions: [], notes: [], practice: [] };
                    const list: Array<{ id: string; title: string; link?: string; uploadedAt?: string }> = resourcesObj[activeTab] ?? [];
                    return list.length ? (
                      <ul className="space-y-3">
                        {list.map((r) => (
                          <li key={r.id} className="p-3 rounded border border-gray-100 hover:bg-gray-50">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-800">{r.title}</div>
                                <div className="text-xs text-gray-500 mt-1">{r.uploadedAt}</div>
                              </div>
                              <a href={r.link} className="text-cyan-600 inline-flex items-center gap-1">View <ChevronRight className="w-4 h-4" /></a>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-sm text-gray-500">No {activeTab} uploaded for this course yet.</div>
                    )
                  })()
                ) : (
                  <div className="text-sm text-gray-500">Select a course to view its resources.</div>
                )}
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  )
}

