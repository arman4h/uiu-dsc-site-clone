import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questionbank/$category/$trimester')({
  component: TrimesterLayout,
})

function TrimesterLayout() {
  return <Outlet />
}
