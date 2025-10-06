import { PostHog } from 'posthog-js'
import { useEffect } from 'react'
import { env } from '../config'

let posthog: PostHog | null = null

export const initPostHog = () => {
  if (typeof window !== 'undefined' && !posthog) {
    posthog = new PostHog()
    posthog.init(env.VITE_PUBLIC_POSTHOG_KEY, {
      api_host: env.VITE_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    })
  }
  return posthog
}

export const PostHogProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    initPostHog()
  }, [])

  return <>{children}</>
}
