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
      <h1 class="text-4xl font-bold mb-4 text-color-emphasis">
        Open-source Esports Repositories
      </h1>
      <p class="max-w-2xl mx-auto text-color-muted">
        A curated list of open-source esports-related repositories on GitHub.
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
    <footer class="py-12 text-center">
      <div class="text-color-secondary">
        Repositories curated from the <a
          href="https://github.com/Strift/awesome-esports/blob/main/README.md"
          target="_blank"
          class="link"
        >Awesome Esports</a> project.
      </div>
    </footer>
  </div>
</template>
