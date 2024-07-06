<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
}>()
</script>

<template>
  <div class="h-full w-full bg-slate-50">
    <div class="flex flex-col justify-between w-full h-full p-20">
      <div>
        <div class="text-[80px] font-title font-extrabold leading-none mb-12">
          {{ props.title }}
        </div>
        <div class="mb-16 flex flex-row space-x-4 items-center">
          <img
            class="h-20 w-20 rounded-full mr-4"
            src="~/assets/images/me.jpg"
          >
          <div class="text-slate-700 text-4xl font-sans">
            Laurent Cazanove
          </div>
        </div>
      </div>
      <div
        class="text-3xl text-slate-500"
        style="font-family: 'Noto Sans'"
      >
        laurentcazanove.com
      </div>
    </div>
  </div>
</template>
