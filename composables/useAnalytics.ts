export const useAnalytics = () => {
  const { $posthog } = useNuxtApp()

  if (!$posthog) {
    throw new Error('Posthog is not initialized')
  }

  return $posthog
}
