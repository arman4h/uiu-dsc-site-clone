import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questionbank/$category/$trimester/$courseId/questions')({
  component: QuestionsLayout,
})

function QuestionsLayout() {
  return <Outlet />
}
