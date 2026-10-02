<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import RangeInput from './RangeInput.vue'

// A number means all corners share one radius.
// An array is per-corner, in CSS shorthand order: [top-left, top-right, bottom-right, bottom-left]
const props = defineProps<{
  modelValue: number | number[]
  max: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number | number[]]
}>()

const linked = computed(() => !Array.isArray(props.modelValue))

// Grid is laid out like the corners themselves: TL TR / BL BR.
// `index` points into the CSS-ordered array, `rotate` turns the corner glyph to match.
const corners = [
  { index: 0, label: 'Top left', rotate: 'rotate-0' },
  { index: 1, label: 'Top right', rotate: 'rotate-90' },
  { index: 3, label: 'Bottom left', rotate: '-rotate-90' },
  { index: 2, label: 'Bottom right', rotate: 'rotate-180' },
]

const toggleLinked = () => {
  const v = props.modelValue
  // Linking keeps the top-left value; unlinking copies the shared value to every corner
  emit('update:modelValue', Array.isArray(v) ? (v[0] ?? 0) : [v, v, v, v])
}

const setCorner = (index: number, e: Event) => {
  const next = [...(props.modelValue as number[])]
  next[index] = Math.min(props.max, Math.max(0, parseFloat((e.target as HTMLInputElement).value) || 0))
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="flex items-start gap-2">
    <RangeInput
      v-if="linked"
      class="flex-1"
      :model-value="modelValue as number"
      :min="0"
      :max="max"
      :step="1"
      @update:model-value="emit('update:modelValue', $event)" />

    <div
      v-else
      class="grid flex-1 grid-cols-2 gap-2">
      <label
        v-for="corner in corners"
        :key="corner.index"
        class="input input-sm"
        :title="corner.label">
        <span
          class="size-2.5 shrink-0 rounded-tl-[4px] border-t-2 border-l-2 border-current opacity-60"
          :class="corner.rotate" />
        <input
          type="number"
          min="0"
          :max="max"
          :value="(modelValue as number[])[corner.index]"
          class="font-mono text-xs"
          @input="setCorner(corner.index, $event)" />
      </label>
    </div>

    <button
      class="btn btn-ghost btn-sm btn-square"
      :class="{ 'btn-active text-primary': !linked }"
      :title="linked ? 'Set corners individually' : 'Use one radius for all corners'"
      @click="toggleLinked">
      <Icon
        :icon="linked ? 'fluent:link-20-regular' : 'fluent:link-dismiss-20-regular'"
        class="size-4" />
    </button>
  </div>
</template>
