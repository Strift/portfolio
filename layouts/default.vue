<script lang="ts" setup>
const route = useRoute()
const isHomePage = computed(() => route.path === '/')
</script>

<template>
  <div class="font-sans">
    <header class="fixed top-0 left-0 right-0 z-10 bg-white dark:bg-neutral-950 h-[var(--header-height)] flex items-center">
      <div class="max-w-screen-md w-full px-4 py-6 sm:py-8 mx-auto md:flex md:justify-between space-y-4 md:space-y-0">
        <div class="text-2xl font-extrabold font-title">
          <NuxtLink
            class="flex items-center space-x-4 text-color-title no-underline"
            to="/"
          >
            <NuxtImg
              src="/images/me.jpg"
              alt="Picture of Laurent Cazanove"
              height="40"
              width="40"
              class="rounded-full"
            />
            <component :is="isHomePage ? 'h1' : 'span'">
              Laurent Cazanove
            </component>
          </NuxtLink>
        </div>
        <SocialLinks class="md:flex hidden" />
      </div>
    </header>
    <main class="max-w-screen-md mx-auto px-4 mt-[var(--header-height)]">
      <slot />
    </main>
    <footer class="mt-8 sm:mt-12 mb-20 md:mb-12">
      <div class="max-w-screen-md px-4 mx-auto mb-10">
        <h2 class="mb-4 heading-2">
          💌 Join my newsletter
        </h2>
        <p class="text-color mb-6">
          Subscribe to my newsletter to get my latest articles and updates.
        </p>
        <div class="border shadow-lg dark:border-neutral-800 dark:shadow-neutral-800  border-neutral-200 rounded-md mb-10">
          <BlogKitForm
            form="keep-in-touch"
          />
        </div>
        <h2 class="mb-4 heading-2">
          🤙 Get in touch
        </h2>
        <p class="text-color mb-2">
          Find me on
          <NuxtLink
            to="https://bsky.app/profile/laurentcazanove.com"
            target="_blank"
            class="link"
          >
            {{ 'Bluesky' }}
          </NuxtLink>,
          <NuxtLink
            to="https://x.com/StriftCodes"
            target="_blank"
            class="link"
          >
            {{ 'X (formerly Twitter)' }}
          </NuxtLink>,
          <NuxtLink
            to="https://www.linkedin.com/in/laurentcazanove/"
            target="_blank"
            class="link"
          >
            {{ 'LinkedIn' }}
          </NuxtLink>, and
          <NuxtLink
            to="https://github.com/Strift"
            target="_blank"
            class="link"
          >
            {{ 'Github' }}
          </NuxtLink>.
        </p>
        <p class="text-color">
          You can also contact me via <a
            class="link"
            href="mailto:lau.cazanove@gmail.com"
          >email</a>.
        </p>
      </div>
    </footer>
    <div class="px-4 py-4 z-10 md:hidden block fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-950">
      <SocialLinks />
    </div>
  </div>
</template>
