<template>
  <div class="font-sans">
    <header class="fixed top-0 left-0 right-0 z-10 mb-8 bg-white">
      <div class="max-w-screen-md px-4 py-8 mx-auto ">
        <div class="text-2xl font-extrabold font-title">
          <NuxtLink
            class="flex items-center space-x-4 text-black no-underline"
            to="/"
          >
            <NuxtImg
              src="/images/me.jpg"
              alt="Picture of Laurent Cazanove"
              height="40"
              width="40"
              class="rounded-full"
            />
            <span>Laurent Cazanove</span>
          </NuxtLink>
        </div>
      </div>
    </header>
    <div class="max-w-screen-md mx-auto px-4 mt-30 mt-[var(--header-height)]">
      <slot />
    </div>
    <footer class="max-w-screen-md px-4 mx-auto mt-8 mb-16">
      <h2 class="mb-4 heading-2">
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
