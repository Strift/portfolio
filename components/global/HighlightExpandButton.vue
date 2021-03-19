<template>
  <button @click="handleClick()">
    <span v-if="expand">&#9650;</span>
    <span v-else>&#9660;</span>
  </button>
</template>

<script>
  export default {
    props: {
      expand: {
        type: Boolean,
        default: false
      },
    },
    methods: {
      handleClick() {
        this.$emit('toggle')
      }
    }
  }
</script>
