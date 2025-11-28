import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questionbank/$category')({
  component: CategoryLayout,
})

function CategoryLayout() {
  return <Outlet />
}
