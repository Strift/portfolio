<script setup lang="ts">
const { data: awesomeEsports } = await useAsyncData('awesome-esports', () =>
  queryContent('/awesome/awesome-esports').findOne(),
)

function getGitHubOgImage(url: string) {
  // Expects: https://github.com/OWNER/REPO...
  const match = url.match(/github\.com\/([^/]+)\/([^/]+)/)
  if (!match) return null
  const owner = match[1]
  const repo = match[2]
  return `https://opengraph.githubassets.com/1/${owner}/${repo}`
}
</script>

<template>
  <div class="">
    <header class="py-12 text-center">
      <h1 class="text-4xl font-bold mb-4 text-color">
        Awesome Esports Resources
      </h1>
      <p class="text-gray-600 max-w-2xl mx-auto text-color-secondary">
        Curated list of esports resources from GitHub
      </p>
    </header>
    <div
      v-if="awesomeEsports"
      class="space-y-8"
    >
      <div
        v-for="category in awesomeEsports.body"
        :key="category.name"
      >
        <h2 class="heading-2 mb-8">
          {{ category.name }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div
            v-for="repo in category.repositories"
            :key="repo.name"
          >
            <a
              :href="repo.url"
              target="_blank"
            >
              <img
                :src="getGitHubOgImage(repo.url)"
                class="rounded-md aspect-[2/1] object-cover w-full"
              >
              <div class="mt-4 px-1">
                <span class="text-color-emphasis">
                  {{ repo.name }}
                </span>
                <span class="text-color-secondary">
                  - {{ repo.description }}
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
