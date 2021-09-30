<template>
  <div class="bg-center bg-cover rounded-lg shadow-md group-hover:shadow-lg h-60" :style="`background-image: url('${imageUrl}')`" />
</template>

<script>
export default {
  props: {
    imageUrl: {
      type: String,
      required: true
    }
  }
}
</script>
