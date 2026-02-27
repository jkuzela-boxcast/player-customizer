import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const selectedComponent = ref({} as any)

  return { selectedComponent }
})
