<script lang="ts" setup>
const props = defineProps<{
  form: 'keep-in-touch' | 'in-article'
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
    class="kit-form-wrapper"
  >
    <hr>
    <div class="text-center text-lg max-w-[400px] leading-0 mx-auto mt-6 -mb-6 text-slate-500 italic">
      You can join my friends and colleagues who receive my occasional blog posts by email <span class="not-italic">🤗</span>
    </div>
    <component
      :is="'script'"
      async
      data-uid="502bd49c93"
      src="https://strift.kit.com/502bd49c93/index.js"
    />
    <hr>
  </div>
</template>
