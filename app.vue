<template>
  <div class="max-w-2xl mx-auto font-sans">
    <header class="mb-8 fixed top-0 left-0 right-0 z-10 bg-white">
      <div class="max-w-2xl mx-auto px-4 py-8 ">
        <NuxtLink
          class="flex space-x-4 items-center"
          to="/"
        >
          <NuxtImg
            src="/images/me.jpg"
            alt="Laurent Cazanove"
            class="h-10 w-auto rounded-full"
          />
          <span class="text-2xl font-title font-extrabold">Laurent Cazanove</span>
        </NuxtLink>
      </div>
    </header>
    <div class="px-4 mt-30 mt-[var(--header-height)]">
      <NuxtPage />
    </div>
    <footer class="px-4 mt-8 mb-16">
      <h2 class="text-2xl font-title font-semibold mb-4">
        Get in touch
      </h2>
      <div>
        Find me on
        <NuxtLink
          to="https://x.com/StriftCodes"
          target="_blank"
        >
          {{ 'X (formerly Twitter)' }}
        </NuxtLink>,
        <NuxtLink
          to="https://www.linkedin.com/in/laurentcazanove/"
          target="_blank"
        >
          {{ 'LinkedIn' }}
        </NuxtLink>, and
        <NuxtLink
          to="https://github.com/Strift"
          target="_blank"
        >
          {{ 'Github' }}
        </NuxtLink>.
      </div>
    </footer>
  </div>
</template>
