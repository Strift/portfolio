<template>
  <BaseContainer class="max-w-screen-lg space-y-24">
    <ProjectCard
      image-url="/images/projects/sulfuron-guilds.jpg"
      website-url="https://guildes.sulfuron.eu/"
      github-url="https://github.com/Strift/sulfuron-guilds"
    >
      <template slot="header">
        Sulfuron Guilds Portal
      </template>
      <template slot="description">
        When running a World of Warcraft guild, recruitment never stops. This app is the dedicated platform for player recruitment on the Classic server Sulfuron.
      </template>
    </ProjectCard>
    <ProjectCard
      image-url="/images/projects/sulfuron-guilds.jpg"
      website-url="https://lakazcreole.fr"
    >
      <template slot="header">
        La Kaz Créole
      </template>
      <template slot="description">
        When running a World of Warcraft guild, recruitment never stops. This app is the dedicated platform for player recruitment on the Classic server Sulfuron.
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
