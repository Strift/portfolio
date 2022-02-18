<template>
  <div class="relative font-sans group component">
    <div
      class="z-10 transition-transform duration-150 transform bg-white border border-indigo-400 shadow-lg group-hover:-translate-x-2 group-hover:-translate-y-2"
    >
      <div class="flex justify-between">
        <div class="p-5 text-lg">
          <div class="mb-1 text-gray-500">
            Vous gérez une guilde sur le serveur Classic Sulfuron ?
          </div>
          <a
            target="_blank"
            href="https://guildes.sulfuron.eu/"
            class="inline-flex items-center space-x-1 font-semibold text-indigo-500"
          >
            <span>
              Rejoignez le portail des guildes
            </span>
            <ArrowRightIcon />
          </a>
        </div>
        <div class="flex mr-5">
          <nuxt-img src="/images/sulfuron-guilds-logo.png" class="h-20 my-auto" />
        </div>
      </div>
    </div>
    <div class="absolute inset-0 bg-indigo-300 shadow-lg -z-1" />
    <div class="absolute inset-0 transition-transform duration-150 transform translate-x-2 translate-y-2 bg-indigo-100 shadow-lg -z-2 group-hover:translate-x-2 group-hover:translate-y-2" />
  </div>
</template>

<script>
import ArrowRightIcon from '~/components/icons/solid/ArrowRightIcon.vue'

export default {
  components: {
    ArrowRightIcon
  }
}
</script>

<style>

</style>
