<script lang="ts" setup>
import { ICONS } from '~/constants'
</script>

<template>
  <div class="flex items-center space-x-2 ">
    <ContentSlot />
    <VTooltip
      :triggers="['hover', 'touch', 'click']"
      class="inline-flex"
    >
      <Icon
        :name="ICONS.TOOLTIP"
        class="text-slate-500 h-5 w-5"
      />
      <template #popper>
        <slot name="tooltip" />
      </template>
    </VTooltip>
  </div>
</template>
