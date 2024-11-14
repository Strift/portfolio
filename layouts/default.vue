<script lang="ts" setup>
import { EXTERNAL_LINKS } from '~/constants'
</script>

<template>
  <div class="font-sans">
    <header class="fixed top-0 left-0 right-0 z-10 mb-8 bg-white">
      <div class="max-w-screen-md px-4 py-8 mx-auto md:flex md:justify-between space-y-4 md:space-y-0">
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
        <SocialLinks class="" />
      </div>
    </header>
    <div class="max-w-screen-md mx-auto px-4 mt-30 mt-[var(--header-height)]">
      <slot />
    </div>
    <footer class="max-w-screen-md px-4 mx-auto mt-8 mb-16">
      <h2 class="mb-4 heading-2">
        💌 Get in touch
      </h2>
      <p class="text-color mb-2">
        Find me on
        <NuxtLink
          :to="EXTERNAL_LINKS.bluesky"
          target="_blank"
          class="link"
        >
          {{ 'Bluesky' }}
        </NuxtLink>,
        <NuxtLink
          :to="EXTERNAL_LINKS.twitter"
          target="_blank"
          class="link"
        >
          {{ 'X (formerly Twitter)' }}
        </NuxtLink>,
        <NuxtLink
          :to="EXTERNAL_LINKS.linkedin"
          target="_blank"
          class="link"
        >
          {{ 'LinkedIn' }}
        </NuxtLink>, and
        <NuxtLink
          :to="EXTERNAL_LINKS.github"
          target="_blank"
          class="link"
        >
          {{ 'Github' }}
        </NuxtLink>.
      </p>
      <p class="text-color">
        You can also contact me via <a
          class="link"
          :href="EXTERNAL_LINKS.email"
        >email</a>.
      </p>
    </footer>
  </div>
</template>
