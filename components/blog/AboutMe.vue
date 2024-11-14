<script lang="ts" setup>
import { EXTERNAL_LINKS } from '~/constants'
</script>

<template>
  <div class="px-5 py-6 bg-slate-100 rounded-xl">
    <h2 class="mb-4 heading-2">
      👋 About the author
    </h2>
    <div class="mb-2 text-color">
      I'm Laurent, a <strong>freelance developer experience engineer</strong> that helps dev tools build great onboarding experiences.
    </div>
    <p class="mb-4 text-color">
      I specialize in technical writing, UX writing, and full-stack development.
    </p>
    <div>
      👉 <NuxtLink
        :href="EXTERNAL_LINKS.email"
        target="_blank"
        class="link"
      >
        Work with me
      </NuxtLink>
    </div>
  </div>
</template>
