<script setup lang="ts">
const props = defineProps<{
  title: string
  description: string
  coverSrc: string
  coverAlt: string
}>()
</script>

<template>
  <div class="h-full w-full bg-slate-50">
    <div class="flex flex-col justify-between w-full h-full p-20">
      <div>
        <div class="text-[80px] font-title font-extrabold leading-none mb-12">
          {{ props.title }}
        </div>
        <div class="text-left text-4xl text-slate-500 leading-relaxed">
          {{ props.description }}
        </div>
      </div>
      <div
        class="text-3xl text-slate-500 relative"
        style="font-family: 'Noto Sans'"
      >
        <img
          class="h-16 w-16 rounded-full mr-10"
          src="~/assets/images/me.jpg"
        >
        <div
          class="text-3xl text-slate-500 absolute left-24 top-4"
          style="font-family: 'Noto Sans'"
        >
          laurentcazanove.com
        </div>
      </div>
    </div>
  </div>
</template>
