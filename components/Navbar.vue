<template>
  <header class="flex justify-between py-16 text-2xl w-full">
    <NuxtLink to="/" title="Home" class="flex items-center space-x-1 text-gray-700">
      <ChevronDoubleRightIcon />
      <span>hello</span>
    </NuxtLink>
    <nav>
      <ul class="flex font-semibold space-x-16">
        <li>
          <NuxtLink to="/about/" class="hover:text-sky-600 text-sky-900">
            About
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/projects/" class="hover:text-sky-600 text-sky-900">
            Projects
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/articles/" class="hover:text-sky-600 text-sky-900">
            Articles
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import ChevronDoubleRightIcon from '~/components/icons/outline/ChevronDoubleRightIcon.vue'
export default {
  components: { ChevronDoubleRightIcon }
}
</script>
