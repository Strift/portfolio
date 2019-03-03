<template>
  <button class="font-serif text-lg text-black hover:text-grey-lighter p-4 border border-black inline-block relative">
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
button:before {
  content: '';
  @apply .bg-black .absolute .w-0 .pin-t .pin-l .h-full;
  transition: all 350ms linear;
  z-index: -1;
}

button:hover:before {
  @apply .w-full;
}
</style>
