<template>
  <div>
    <nuxt-content :document="page" class="home-page" />
    <div class="flex justify-center mt-16">
      <ContactButton />
    </div>
  </div>
</template>

<script>
import ContactButton from '~/components/ContactButton.vue'

export default {
  components: { ContactButton },
  props: {
    page: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.home-page {
  @apply font-sans text-gray-400;

  h1 {
    @apply text-7xl font-semibold mb-2 tracking-tight text-gray-700;
  }

  h2 {
    @apply text-5xl font-semibold mb-20 tracking-tight text-gray-400;
  }

  p {
    @apply  leading-relaxed text-2xl mb-3;

    strong {
      @apply text-sky-600 font-semibold
    }
  }

  ul {
    @apply list-disc pl-6 text-2xl
  }
}
</style>
