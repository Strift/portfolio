import { defineStore } from 'pinia'

export const useBlogPostStore = defineStore('blog-post', () => {
  const title = ref<string>('')

  return {
    title,
  }
})
