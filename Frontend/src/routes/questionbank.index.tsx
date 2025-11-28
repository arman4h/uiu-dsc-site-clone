import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { BookOpen, ChevronRight, FileText, Search, X } from 'lucide-react'

type ResourceItem = {
  id: string
  courseName: string
  courseCode?: string
  trimester?: string
  courseCredit: string
  resourceType: string
  courseType?: string
  questions?: {
    classTest?: Array<{ testNo?: string; trimesterName?: string; driveLink?: string }>
    midtermExam?: Array<{ trimesterName?: string; driveLink?: string }>
    finalExam?: Array<{ trimesterName?: string; driveLink?: string }>
  }
  notes?: Array<{ author?: string; email?: string; id?: string; noteTitle?: string; driveLink?: string }>
  practice?: Array<{ documentTitle?: string; driveLink?: string }>
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

export const Route = createFileRoute('/questionbank/')({
  loader: async () => {
    try {
      const resources = await fetchResources()
      return { resources, error: null }
    } catch (err) {
      return { resources: [], error: err instanceof Error ? err.message : 'Failed to load' }
    }
  },
  component: QuestionbankHome,
})

function QuestionbankHome() {
  const { resources, error } = Route.useLoaderData()
  const [searchValue, setSearchValue] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const stats = useMemo(() => {
    const dept = resources.filter((r: { courseType: any }) => {
      const type = (r.courseType ?? '').toLowerCase()
      return type === 'departmental' || type === ''
    })
    const nonDept = resources.filter((r: { courseType: any }) => {
      const type = (r.courseType ?? '').toLowerCase()
      return type === 'non-departmental' || type === 'nondepartmental'
    })
    return { departmental: dept.length, nonDepartmental: nonDept.length }
  }, [resources])

  // Search results
  const searchResults = useMemo(() => {
    const query = searchValue.trim().toLowerCase()
    if (!query) return []
    
    const matches = resources.filter(
      (r: { courseName: string; courseCode: any }) =>
        r.courseName.toLowerCase().includes(query) ||
        (r.courseCode ?? '').toLowerCase().includes(query)
    )

    // Group by course code to count trimesters
    const courseMap = new Map<string, { course: ResourceItem; trimesters: Set<string> }>()
    
    matches.forEach((r: { courseCode: any; id: any; trimester: any }) => {
      const code = r.courseCode ?? r.id
      // Provide a fallback for missing ResourceItem fields to satisfy type
      const resourceItem: ResourceItem = {
        ...(r as ResourceItem),
        courseName: (r as any).courseName ?? '',
        courseCredit: (r as any).courseCredit ?? '',
        resourceType: (r as any).resourceType ?? '',
      }
      if (!courseMap.has(code)) {
        courseMap.set(code, { course: resourceItem, trimesters: new Set([r.trimester ?? '']) })
      } else {
        const existing = courseMap.get(code)!
        existing.trimesters.add(r.trimester ?? '')
      }
    })

    return Array.from(courseMap.values()).slice(0, 6)
  }, [resources, searchValue])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    setShowDropdown(value.trim().length > 0)
  }, [])

  const handleClear = useCallback(() => {
    setSearchValue('')
    setShowDropdown(false)
    inputRef.current?.focus()
  }, [])

  const handleResultClick = useCallback(() => {
    setSearchValue('')
    setShowDropdown(false)
  }, [])

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-cyan-50 text-cyan-600 px-4 py-1.5 rounded-full mb-4 border border-cyan-200">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Questions Bank</span>
          </div>
          <h1 className="text-4xl font-bold text-cyan-600  mb-4">Resource Archive</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access previous exam questions, notes, and practice materials from different courses. 
            Find class tests, midterm, and final exams organized by department type, trimester, and course.
          </p>
        </header>

        

        {/* Search Bar */}
        <div className="relative mb-10" ref={searchRef}>
          <div className={`flex items-center bg-white border rounded-full px-3 py-2 transition-all ${
            showDropdown ? 'border-cyan-400 ring-2 ring-cyan-100' : 'border-gray-200'
          }`}>
            <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search for any course..."
              value={searchValue}
              onChange={handleInputChange}
              onFocus={() => searchValue.trim() && setShowDropdown(true)}
              className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent min-w-0"
            />
            {searchValue && (
              <button
                type="button"
                onClick={handleClear}
                className="ml-2 p-1 text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Search Results Dropdown */}
          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
              {searchResults.length > 0 ? (
                <>
                  <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                    <p className="text-sm text-gray-600">Found {searchResults.length} course{searchResults.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {searchResults.map(({ course, trimesters }) => {
                      const trimesterCount = trimesters.size
                      const category = (course.courseType ?? 'departmental').toLowerCase().replace(/\s+/g, '-')
                      
                      return (
                        <Link
                          key={course.id}
                          to="/questionbank/$category/$trimester/$courseId"
                          params={{
                            category,
                            trimester: course.trimester ?? '1st',
                            courseId: course.id,
                          }}
                          className="block px-5 py-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 transition-colors"
                          onClick={handleResultClick}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-800">{course.courseCode}</span>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                                  {course.trimester} Semester
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{course.courseName}</p>
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 bg-cyan-50 text-cyan-700 text-xs font-medium rounded-full">
                                  {trimesterCount} Trimester{trimesterCount !== 1 ? 's' : ''}
                                </span>
                                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                                  {course.courseCredit} Credits
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </>
              ) : (
                <div className="px-5 py-8 text-center">
                  <p className="text-gray-500">No courses found matching "{searchValue}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Departmental */}
          <Link
            to="/questionbank/$category"
            params={{ category: 'departmental' }}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-cyan-300 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-50 rounded-xl">
                <BookOpen className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-1">Departmental Courses</h2>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-3">
                  DEPT
                </span>
                <p className="text-gray-500 text-sm mb-4">
                  Core departmental courses including Data Science, Computer Science, and Mathematics
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-600 font-medium text-sm">
                    {stats.departmental} Courses Available
                  </span>
                  <ChevronRight className="w-5 h-5 text-cyan-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>

          {/* Non-Departmental */}
          <Link
            to="/questionbank/$category"
            params={{ category: 'non-departmental' }}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-cyan-300 transition-all group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-cyan-50 rounded-xl">
                <BookOpen className="w-6 h-6 text-cyan-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-800 mb-1">Non-Departmental Courses</h2>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full mb-3">
                  NON_DEPT
                </span>
                <p className="text-gray-500 text-sm mb-4">
                  General courses not specific to any department - language, soft skills, etc.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-cyan-600 font-medium text-sm">
                    {stats.nonDepartmental} Courses Available
                  </span>
                  <ChevronRight className="w-5 h-5 text-cyan-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
