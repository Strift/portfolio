<template>
  <BaseContainer class="max-w-screen-lg space-y-24">
    <ProjectCard
      image-url="/images/projects/sulfuron-guilds.jpg"
      website-url="https://guildes.sulfuron.eu/"
      github-url="https://github.com/Strift/sulfuron-guilds"
    >
      <template slot="header">
        🎮 Sulfuron Guilds Portal
      </template>
      <template slot="description">
        When running a World of Warcraft guild, recruitment never stops. This app is the dedicated recruitment platform for players from Sulfuron.
      </template>
    </ProjectCard>
    <ProjectCard
      image-url="/images/projects/awesome-esports.png"
      website-url="/awesome-esports/"
      github-url="https://github.com/Strift/awesome-esports"
    >
      <template slot="header">
        👨‍💻 Awesome Esports
      </template>
      <template slot="description">
        A curated list of open-source projects related to esports.
      </template>
    </ProjectCard>
    <ProjectCard
      image-url="/images/projects/la-kaz-creole.jpg"
      website-url="https://lakazcreole.fr"
    >
      <template slot="header">
        🇷🇪 La Kaz Créole
      </template>
      <template slot="description">
        Cooking traditional dishes from Reunion Island, La Kaz Créole offers catering and food delivery services in Paris.
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
  layout: 'default'
}
</script>
