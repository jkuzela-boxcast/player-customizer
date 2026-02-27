/// src/composables/useResizable.ts

import { ref, onMounted, onUnmounted } from 'vue'

export function useResizable(initialHeightPercent = 50) {
  const topHeight = ref(initialHeightPercent)
  const containerRef = ref<HTMLElement | null>(null)
  const isDragging = ref(false)

  const onMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    isDragging.value = true
  }

  const onDblClick = () => {
    topHeight.value = initialHeightPercent
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || !containerRef.value) return
    const rect = containerRef.value.getBoundingClientRect()
    const offsetY = e.clientY - rect.top - 9
    const percent = (offsetY / rect.height) * 100
    topHeight.value = Math.min(Math.max(percent, 10), 90)
  }

  const onMouseUp = () => {
    isDragging.value = false
  }

  const setContainer = (el: HTMLElement | null) => {
    containerRef.value = el
  }

  onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
  })

  return { topHeight, containerRef, isDragging, onMouseDown, onDblClick, setContainer }
}
