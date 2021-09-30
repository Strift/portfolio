<template>
  <header class="flex items-center justify-between w-full py-16 text-2xl">
    <NavbarLink to="/" title="Home" class="text-gray-700">
      <span v-if="$route.fullPath === '/'">hello</span>
      <span v-else>home</span>
    </NavbarLink>
    <nav>
      <ul class="flex space-x-16 font-semibold">
        <!-- <li>
          <NavbarLink to="/about/" title="About">
            About
          </NavbarLink>
        </li> -->
        <li>
          <NavbarLink to="/projects/" title="Projects">
            Projects
          </NavbarLink>
        </li>
        <li>
          <NavbarLink to="/articles/" title="Articles">
            Articles
          </NavbarLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import NavbarLink from '~/components/NavbarLink.vue'

export default {
  components: {
    NavbarLink
  }
}
</script>
