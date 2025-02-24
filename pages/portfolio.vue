<script lang="ts" setup>
import { ICONS } from '~/constants'

const { data: posts } = await useAsyncData(
  `portfolio-posts`,
  () => queryContent('portfolio/writing').sort({ date: -1 }).find(),
  { default: () => [] },
)
</script>

<template>
  <div class="">
    <BackButton class="mb-6" />
    <h2 class="heading-2 mb-6">
      Portfolio
    </h2>
    <h3 class="heading-3 mb-4">
      Speaking
    </h3>
    <div class="grid grid-cols-2 gap-x-8 mb-8">
      <div class="bg-white dark:bg-neutral-950 rounded-lg border overflow-hidden border-neutral-200 dark:border-neutral-800">
        <iframe
          width="350"
          height="197"
          src="https://www.youtube.com/embed/aki7mLNAgzk?si=VQZp9ssQw9gN9Sd9"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
      <div class="bg-white dark:bg-neutral-950 rounded-lg border overflow-hidden border-neutral-200 dark:border-neutral-800">
        <iframe
          width="350"
          height="197"
          src="https://www.youtube.com/embed/edrgsjp0N5U?si=NNV8HdqWNiO7Ya03"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </div>
    </div>
    <h3 class="heading-3 mb-4">
      Demo apps
    </h3>
    <h3 class="heading-3 mb-4">
      Documentation
    </h3>
    <div class="grid grid-cols-2 gap-x-8 mb-8">
      <div>twicpics</div>
      <div>Pandascore</div>
    </div>
    <h3 class="heading-3 mb-4">
      Technical Writing
    </h3>
    <div class="overflow-x-auto pb-4 mb-4 sm:mb-6">
      <div class="flex flex-row min-w-max space-x-8">
        <NuxtLink
          v-for="post in posts"
          :key="post.title"
          :to="post.url"
          target="_blank"
          class="group items-center w-[70vw] sm:w-[256px]"
        >
          <div class="w-full sm:w-[256px] mb-5 sm:mb-0 flex-shrink-0">
            <BaseImage
              :src="post.image"
              :alt="post.title"
              aspect-ratio="256/136"
              class="rounded-lg"
            />
          </div>
          <div class="mt-4">
            <div class="text-lg font-bold mb-2 sm:mb-2 leading-tight text-color-emphasis group-hover:underline">
              {{ post.title }}
              <Icon
                :name="ICONS.EXTERNAL_LINK"
                class="w-4 h-4 text-color-secondary"
              />
            </div>
            <div class="text-color-secondary">
              {{ post.tags.join(' &bull; ') }}
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
