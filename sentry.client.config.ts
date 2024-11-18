import * as Sentry from '@sentry/nuxt'
import posthog from 'posthog-js'
import { SENTRY_DSN, SENTRY_ENVIRONMENT, SENTRY_PROJECT_ID } from './constants'

Sentry.init({
  dsn: SENTRY_DSN,
  environment: SENTRY_ENVIRONMENT,

  integrations: [
    posthog.sentryIntegration({
      organization: 'https://strift.sentry.io/',
      projectId: SENTRY_PROJECT_ID,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})
