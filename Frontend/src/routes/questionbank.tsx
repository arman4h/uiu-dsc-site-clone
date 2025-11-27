import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questionbank')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/questionbank"!</div>
}
