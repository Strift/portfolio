<template>
  <div class="responsive">
    <iframe
      :src="url"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import PropTypes from '@znck/prop-types'

export default defineComponent({
  props: {
    url: PropTypes.string.isRequired
  }
})
</script>

<style scoped>
.responsive {
  overflow:hidden;
  padding-bottom:53.75%;
  position:relative;
  height:0;
}

.responsive iframe {
  left:0;
  top:0;
  height:100%;
  width:100%;
  position:absolute;
}
</style>
