<template>
  <BaseContainer class="max-w-screen-lg space-y-24">
    <ProjectCard
      v-for="(project, i) in projects"
      :key="i"
      :title="project.name"
      :image-url="project.imageUrl"
      :website-url="project.websiteUrl"
      :github-url="project.githubUrl"
    >
      <template slot="description">
        {{ project.description }}
      </template>
    </ProjectCard>
  </BaseContainer>
</template>

<script>
import BaseContainer from '~/components/Base/Container.vue'
import ProjectCard from '~/components/Projects/ProjectCard.vue'

export default {
  components: {
    BaseContainer,
    ProjectCard
  },
  layout: 'default',
  data: () => ({
    projects: [
      {
        name: '🎮 Sulfuron Guilds Portal',
        imageUrl: '/images/projects/sulfuron-guilds.jpg',
        websiteUrl: 'https://guildes.sulfuron.eu/',
        githubUrl: 'https://github.com/Strift/sulfuron-guilds',
        description: 'When running a World of Warcraft guild, recruitment never stops. This app is the dedicated recruitment platform for players from Sulfuron.'
      },
      {
        name: '👨‍💻 Awesome Esports',
        imageUrl: '/images/projects/awesome-esports.png',
        githubUrl: 'https://github.com/Strift/awesome-esports',
        description: 'A curated list of open-source projects related to esports.'
      },
      {
        name: '🇷🇪 La Kaz Créole',
        imageUrl: '/images/projects/la-kaz-creole.jpg',
        websiteUrl: 'https://lakazcreole.fr',
        description: 'Cooking traditional dishes from Reunion Island, La Kaz Créole offers catering and food delivery services in Paris.'
      }
    ]
  })
}
</script>
