<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <NuxtLayout>
    <h2 class="heading-2 mb-4">
      Sorry, something went wrong
    </h2>
    <div class="mb-6">
      <BackButton>Go back home</BackButton>
    </div>
    <div class="bg-slate-100 rounded-xl p-12 text-center">
      <h1 class="font-title text-4xl mb-6">
        {{ props.error.statusCode }}
      </h1>
      <div class="text-color  ">
        {{ props.error.message }}
      </div>
    </div>
  </NuxtLayout>
</template>
