<template>
  <header class="flex items-baseline justify-between py-16 text-2xl w-full">
    <NavbarLink to="/" title="Home" class="text-gray-700">
      <span v-if="$route.fullPath === '/'">hello</span>
      <span v-else>home</span>
    </NavbarLink>
    <nav>
      <ul class="flex font-semibold space-x-16">
        <li>
          <NavbarLink to="/about/">
            About
          </NavbarLink>
        </li>
        <li>
          <NavbarLink to="/projects/">
            Projects
          </NavbarLink>
        </li>
        <li>
          <NavbarLink to="/articles/">
            Articles
          </NavbarLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import ChevronDoubleRightIcon from '~/components/icons/outline/ChevronDoubleRightIcon.vue'
import NavbarLink from '~/components/NavbarLink.vue'

export default {
  components: {
    ChevronDoubleRightIcon,
    NavbarLink
  }
}
</script>
