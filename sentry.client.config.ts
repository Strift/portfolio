import * as Sentry from '@sentry/nuxt'
import { SENTRY_DSN } from './constants'

Sentry.init({
  dsn: SENTRY_DSN,

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})
