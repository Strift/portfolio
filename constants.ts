export const ICONS = {
  ARROW_BACK: 'tabler:arrow-back-up',
  ARROW_RIGHT: 'tabler:arrow-right',
  CALENDAR: 'tabler:calendar',
  CONTACT: 'tabler:message',
  EXTERNAL_LINK: 'tabler:external-link',
  LIST: 'tabler:list',
  MEETING: 'tabler:calendar-bolt',
  MAIL: 'tabler:mail',
  PENCIL: 'tabler:pencil',
  TOOLTIP: 'tabler:info-circle',
  // Socials
  BLUESKY: 'ri:bluesky-fill',
  LINKEDIN: 'ri:linkedin-fill',
  TWITTER: 'ri:twitter-fill',
  TWITTER_X: 'ri:twitter-x-fill',
  GITHUB: 'ri:github-fill',
}

export const SOCIAL_LINKS = [
  {
    name: 'X (formerly Twitter)',
    href: 'https://strift.dev/twitter',
    icon: ICONS.TWITTER_X,
  },
  {
    name: 'Bluesky',
    href: 'https://strift.dev/bluesky',
    icon: ICONS.BLUESKY,
  },
  {
    name: 'LinkedIn',
    href: 'https://strift.dev/linkedin',
    icon: ICONS.LINKEDIN,
  },
  {
    name: 'GitHub',
    href: 'https://strift.dev/github',
    icon: ICONS.GITHUB,
  },
]

export const SENTRY_PROJECT_ID = 4508317686038528
export const SENTRY_DSN = `https://961970e783a29ae28cf4bece55814757@o571625.ingest.us.sentry.io/${SENTRY_PROJECT_ID}`
export const SENTRY_ENVIRONMENT = process.env.NUXT_SENTRY_ENVIRONMENT
