<script lang="ts" setup>
const props = defineProps<{
  icon: string
  date: string
}>()
</script>

<template>
  <div class="callout shadow-lg hover:shadow-xl rounded-md border border-slate-100 p-5">
    <div class="flex items-center space-x-3 mb-1">
      <div class="text-xl">
        {{ props.icon }}
      </div>
      <div class="text-sm">
        {{ toCalendarDateString(props.date) }}
      </div>
    </div>
    <div class="text-color-subtle">
      <slot />
    </div>
  </div>
</template>
