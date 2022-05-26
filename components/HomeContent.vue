<template>
  <nuxt-content :document="page" class="home-page" />
</template>

<script>
export default {
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
  p {
    @apply  leading-relaxed text-2xl mb-3;

    strong {
      @apply text-indigo-500 font-semibold
    }
  }

  ul {
    @apply list-disc pl-6 text-2xl space-y-1;
  }

  a {
    @apply underline;

    text-decoration-color: currentColor;
  }
}
</style>
