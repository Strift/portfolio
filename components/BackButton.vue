<template>
  <NuxtLink
    to="/"
    class="inline-flex items-center space-x-2 text-slate-500 hover:text-slate-700"
  >
    <Icon
      name="heroicons:arrow-left"
      class="w-5 h-5"
    />
    <span>
      <slot name="default">Back</slot>
    </span>
  </NuxtLink>
</template>
