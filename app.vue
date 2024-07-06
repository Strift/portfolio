<template>
  <div class="max-w-2xl mx-auto font-sans">
    <header class="mb-8 fixed top-0 left-0 right-0 z-10 bg-white">
      <div class="max-w-2xl mx-auto px-4 py-8 ">
        <div class="text-2xl font-title font-extrabold">
          <NuxtLink
            class="flex space-x-4 items-center text-black no-underline"
            to="/"
          >
            <NuxtImg
              src="/images/me.jpg"
              alt="Laurent Cazanove"
              height="40"
              width="40"
              class="rounded-full"
            />
            <span>Laurent Cazanove</span>
          </NuxtLink>
        </div>
      </div>
    </header>
    <div class="px-4 mt-30 mt-[var(--header-height)]">
      <NuxtPage />
    </div>
    <footer class="px-4 mt-8 mb-16">
      <h2 class="heading-2 mb-4">
        Get in touch
      </h2>
      <p class="text-color">
        Find me on
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
    </footer>
  </div>
</template>

<style>
@media (prefers-color-scheme: dark) {
  :root {
    /* @apply bg-slate-900; */
  }
}
</style>
