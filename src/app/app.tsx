import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from '../routeTree.gen'
import { PostHogProvider } from '@shared/lib/posthog'
import { TelegramProvider } from '@shared/lib/telegram-store'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Create a client
const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TelegramProvider>
        <PostHogProvider>
          <RouterProvider router={router} />
        </PostHogProvider>
      </TelegramProvider>
    </QueryClientProvider>
  )
}
