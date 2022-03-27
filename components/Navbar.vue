<template>
  <header class="flex items-center justify-between w-full py-16 text-2xl">
    <NavbarLink
      to="/"
      title="Home"
      :text-class="linkClass"
      :text-hover-class="linkHoverClass"
    >
      <span v-if="$route.fullPath === '/'">hello</span>
      <span v-else>home</span>
    </NavbarLink>
    <nav>
      <ul class="flex space-x-16 font-semibold">
        <li v-for="{title, to} in menuItems" :key="title">
          <NavbarLink
            :to="to"
            :title="title"
            :text-class="linkClass"
            :text-hover-class="linkHoverClass"
          >
            {{ title }}
          </NavbarLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import PropTypes from '@znck/prop-types'
import NavbarLink from '~/components/NavbarLink.vue'

const MENU_ITEMS = [
  {
    title: 'Projects',
    to: '/projects/'
  },
  {
    title: 'Articles',
    to: '/articles/'
  }
]

export default {
  components: {
    NavbarLink
  },
  props: {
    linkClass: PropTypes.string.defaultValue('text-gray-700'),
    linkHoverClass: PropTypes.string.defaultValue('text-indigo-400')
  },
  data: () => ({
    menuItems: MENU_ITEMS
  })
}
</script>
