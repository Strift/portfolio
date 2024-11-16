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
        <div class="mb-16 relative">
          <img
            class="h-32 w-32 rounded-full mr-10"
            src="/images/me.jpg"
          >
          <div
            class="text-[80px] text-left font-extrabold leading-none absolute left-44 top-6"
            style="font-family: Poppins"
          >
            {{ props.title }}
          </div>
        </div>
        <div
          class="text-left text-4xl text-slate-500 leading-relaxed"
          style="font-family: 'Noto Sans'"
        >
          {{ props.description }}
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
