<script lang="ts" setup>
import type { ProjectsPageContent } from '~/types'

const { data } = await useAsyncData('projects', () => queryContent<ProjectsPageContent>('projects').findOne())
</script>

<template>
  <div v-if="data">
    <div v-for="project in data.projects" :key="project.name">
      <img :src="project.image_url" :alt="project.name" height="148" width="320" />
      <h2>{{ project.name }}</h2>
      <p>{{ project.description }}</p>
      <div v-if="project.website_url">
        <a :href="project.website_url">{{ project.website_url }}</a>
      </div>
      <div v-if="project.github_url">
        <a :href="project.github_url">{{ project.github_url }}</a>
      </div>
    </div>
  </div>
</template>
