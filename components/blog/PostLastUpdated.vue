<script lang="ts" setup>
import { toLocaleDateString } from '~/utils/date'

const props = defineProps<{
  date: string
  updatedAt?: string
}>()
</script>

<template>
  <div class="flex items-center space-x-1 last-updated text-color-secondary text-sm">
    <span>{{ toLocaleDateString(props.updatedAt || props.date) }}</span>
  </div>
</template>
