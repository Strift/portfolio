<script lang="ts" setup>
const props = defineProps<{
  form: 'keep-in-touch' | 'in-article' | 'ai-in-article'
}>()
</script>

<template>
  <component
    :is="'script'"
    v-if="props.form === 'keep-in-touch'"
    async
    data-uid="07d31f8e78"
    src="https://strift.kit.com/07d31f8e78/index.js"
  />
  <div
    v-else-if="props.form === 'in-article'"
    class="kit-form-wrapper my-4 sm:my-8"
  >
    <hr>
    <div class="text-center leading-0 mx-auto mt-6 -mb-6 text-color-secondary italic max-w-[240px]">
      If you like what you're reading, consider joining my newsletter:
    </div>
    <component
      :is="'script'"
      async
      data-uid="502bd49c93"
      src="https://strift.kit.com/502bd49c93/index.js"
    />
    <hr>
  </div>
  <div v-else-if="props.form === 'ai-in-article'">
    <hr>
    <div class="text-center leading-0 mx-auto mt-6 -mb-6 text-color-secondary italic max-w-[240px]">
      Get more actionable tips to leverage AI as a developer:
    </div>
    <component
      :is="'script'"
      async
      data-uid="a7fbc6f428"
      src="https://strift.kit.com/a7fbc6f428/index.js"
    />
    <hr>
  </div>
</template>
