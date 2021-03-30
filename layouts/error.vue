<template>
  <div class="absolute inset-0 flex items-center justify-center h-screen">
    <div class="space-y-2">
      <div class="text-gray-700 text-8xl">{{ error.statusCode }}</div>
      <div class="text-gray-500 text-2xl">{{ error.message }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
