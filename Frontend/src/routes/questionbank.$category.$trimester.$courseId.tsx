import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questionbank/$category/$trimester/$courseId')({
  component: CourseLayout,
})

function CourseLayout() {
  return <Outlet />
}
