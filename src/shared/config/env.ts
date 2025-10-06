import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  },
  client: {
    VITE_PUBLIC_POSTHOG_KEY: z.string().min(1),
    VITE_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  },
  clientPrefix: 'VITE_PUBLIC_',
  runtimeEnv: {
    NODE_ENV: import.meta.env.MODE as 'development' | 'test' | 'production',
    VITE_PUBLIC_POSTHOG_KEY: import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
    VITE_PUBLIC_POSTHOG_HOST: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  },
  skipValidation: !!import.meta.env.SKIP_ENV_VALIDATION,
})
