<script lang="ts" setup>
import { ICONS } from '~/constants'

const { data: items } = await useAsyncData(
  `portfolio`,
  () => queryContent('portfolio').sort({ date: -1 }).find(),
  { default: () => [] },
)

const tags = computed(() => {
  return items.value.map(item => item.tags).flat()
    .filter((tag, index, self) => self.indexOf(tag) === index)
    .sort()
})
</script>

<template>
  <div class="">
    <BackButton class="mb-6" />
    <h2 class="heading-2 mb-4">
      Portfolio
    </h2>
    <div class="text-color-secondary">
      A showcase of my previous work
    </div>

    <!-- <div class="flex gap-x-2 sm:gap-x-4 overflow-x-auto sm:overflow-x-hidden pb-3 -mb-2 sm:mb-0 sm:pb-0">
      <div
        v-for="tag in tags"
        :key="tag"
        class="text-color-muted space-x-2 flex items-baseline shrink-0 hover:text-color-emphasis active:bg-slate-200 active:dark:bg-neutral-800 rounded-md px-2 py-1 sm:p-0 active:text-color-emphasis"
      >
        {{ tag }}
      </div>
    </div> -->
    <div class="grid grid-cols-2 gap-x-8 gap-y-8 mt-8">
      <NuxtLink
        v-for="post in items"
        :key="post.title"
        :to="post.url"
        target="_blank"
        class="group items-center"
      >
        <div class="bg-white dark:bg-neutral-950 rounded-lg border overflow-hidden border-neutral-200 dark:border-neutral-800">
          <div
            v-if="post.image && post.url.includes('github')"
            class="p-4 bg-white"
          >
            <BaseImage
              :src="post.image"
              :alt="post.title"
              aspect-ratio="289/163"
              class="h-[163px] w-full object-cover"
            />
          </div>
          <BaseImage
            v-else-if="post.image"
            :src="post.image"
            :alt="post.title"
            :aspect-ratio="350/197"
            height="197"
            width="350"
          />
          <YoutubeEmbed
            v-else-if="post.url.includes('youtube')"
            :src="post.url"
          />
          <div class="px-5 py-4">
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
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
