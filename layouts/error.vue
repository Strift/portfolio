<template>
  <div class="flex flex-grow items-center justify-center">
    <div class="space-y-2">
      <div class="text-8xl text-gray-700">
        {{ error.statusCode }}
      </div>
      <div class="text-2xl text-gray-500">
        {{ error.message }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>
