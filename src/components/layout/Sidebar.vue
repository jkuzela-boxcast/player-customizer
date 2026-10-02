<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    side: 'left' | 'right'
    label: string
    icon: string
    defaultWidth?: number
    minWidth?: number
    maxWidth?: number
  }>(),
  { defaultWidth: 320, minWidth: 240, maxWidth: 640 }
)

const width = ref(props.defaultWidth)
const collapsed = ref(false)
const resizing = ref(false)

// Arrow points toward the edge the sidebar collapses into
const collapseIcon = computed(() =>
  props.side === 'left' ? 'fluent:panel-left-contract-20-regular' : 'fluent:panel-right-contract-20-regular'
)
const expandIcon = computed(() =>
  props.side === 'left' ? 'fluent:panel-left-expand-20-regular' : 'fluent:panel-right-expand-20-regular'
)

// Pointer capture keeps the drag going even when the cursor passes over the player's iframes
const startResize = (e: PointerEvent) => {
  const handle = e.currentTarget as HTMLElement
  const startX = e.clientX
  const startWidth = width.value
  handle.setPointerCapture(e.pointerId)
  resizing.value = true

  const onMove = (ev: PointerEvent) => {
    const delta = props.side === 'left' ? ev.clientX - startX : startX - ev.clientX
    width.value = Math.min(props.maxWidth, Math.max(props.minWidth, startWidth + delta))
  }
  const onUp = () => {
    resizing.value = false
    handle.removeEventListener('pointermove', onMove)
    handle.removeEventListener('pointerup', onUp)
    handle.removeEventListener('pointercancel', onUp)
  }
  handle.addEventListener('pointermove', onMove)
  handle.addEventListener('pointerup', onUp)
  handle.addEventListener('pointercancel', onUp)
}
</script>

<template>
  <!-- Collapsed: a thin rail with a button to re-open -->
  <aside
    v-if="collapsed"
    class="bg-base-100 border-base-300 flex w-12 shrink-0 flex-col items-center gap-3 py-3"
    :class="side === 'left' ? 'border-r' : 'border-l'">
    <button
      class="btn btn-ghost btn-sm btn-square"
      :title="`Show ${label}`"
      @click="collapsed = false">
      <Icon
        :icon="expandIcon"
        class="size-5" />
    </button>
    <Icon
      :icon="icon"
      class="text-base-content/50 size-5" />
  </aside>

  <aside
    v-else
    class="bg-base-100 border-base-300 relative flex shrink-0 flex-col"
    :class="[side === 'left' ? 'border-r' : 'border-l', { 'select-none': resizing }]"
    :style="{ width: `${width}px` }">
    <!-- Collapse button sits on the inner edge, next to the player -->
    <header class="border-base-300 flex h-12 shrink-0 items-center gap-2 border-b px-2">
      <div class="flex min-w-0 flex-1 items-center gap-2">
        <slot name="header">
          <span class="truncate px-1 text-sm font-semibold">{{ label }}</span>
        </slot>
      </div>
      <button
        class="btn btn-ghost btn-sm btn-square"
        :class="side === 'right' ? 'order-first' : ''"
        :title="`Hide ${label}`"
        @click="collapsed = true">
        <Icon
          :icon="collapseIcon"
          class="size-5" />
      </button>
    </header>

    <div class="flex min-h-0 flex-1 flex-col">
      <slot />
    </div>

    <!-- Drag handle on the inner edge. Double-click resets width. -->
    <div
      class="hover:bg-primary/40 absolute inset-y-0 z-10 w-1.5 cursor-col-resize transition-colors"
      :class="[side === 'left' ? '-right-0.75' : '-left-0.75', { 'bg-primary/60': resizing }]"
      @pointerdown.prevent="startResize"
      @dblclick="width = defaultWidth" />
  </aside>
</template>
