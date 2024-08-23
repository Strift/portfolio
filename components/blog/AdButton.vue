<script lang="ts" setup>
defineProps<{
  to: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    target="_blank"
    class="inline-flex items-center justify-center w-full px-2 py-1 space-x-2 text-white rounded-full hover:bg-slate-700 bg-slate-500"
  >
    <span>
      <slot name="default" />
    </span>
    <Icon
      name="heroicons:arrow-right"
      class="w-5 h-5"
    />
  </NuxtLink>
</template>
