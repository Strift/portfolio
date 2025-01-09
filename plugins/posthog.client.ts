import posthog from 'posthog-js'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return
  const runtimeConfig = useRuntimeConfig()
  const posthogClient = posthog.init(runtimeConfig.public.posthogPublicKey, {
    api_host: runtimeConfig.public.posthogHost || 'https://eu.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false, // we add manual pageview capturing below
    loaded: (posthog) => {
      if (import.meta.dev) posthog.debug()
    },
  })

  // Make sure that pageviews are captured with each route change
  const router = useRouter()
  router.afterEach((to, from, failure) => {
    if (failure) return

    nextTick(() => {
      posthog.capture('$pageleave', {
        $current_url: window.location.host + from.fullPath,
        path: from.fullPath,
      })
      posthog.capture('$pageview', {
        path: to.fullPath,
      })
    })
  })

  return {
    provide: {
      posthog: () => posthogClient,
    },
  }
})
