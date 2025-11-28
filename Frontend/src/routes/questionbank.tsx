import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questionbank')({
  component: QuestionbankLayout,
})

function QuestionbankLayout() {
  return <Outlet />
}
