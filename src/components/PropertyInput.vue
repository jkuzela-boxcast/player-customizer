<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useUiStore, type PropValue } from '../stores/ui'
import type { StyleProp } from '../config/features'
import ColorInput from './inputs/ColorInput.vue'
import RadiusInput from './inputs/RadiusInput.vue'
import RangeInput from './inputs/RangeInput.vue'
import SelectInput from './inputs/SelectInput.vue'
import ToggleInput from './inputs/ToggleInput.vue'

const props = defineProps<{
  prop: StyleProp
  subfeatureId: string
  allProps: StyleProp[]
}>()

const store = useUiStore()

const valueOf = (p: StyleProp) => store.getPropertyValue(props.subfeatureId, p.id, p.input.default)

const currentValue = computed(() => valueOf(props.prop))
const isChanged = computed(() => store.propertyChanges[props.subfeatureId]?.[props.prop.id] !== undefined)

// Width/height props with the same id prefix can be locked together,
// e.g. "player-play-button-width" <-> "player-play-button-height"
const companionProp = computed(() => {
  const id = props.prop.id
  if (props.prop.input.type !== 'range') return null
  if (id.endsWith('-width')) return props.allProps.find((p) => p.id === id.replace(/-width$/, '-height')) ?? null
  if (id.endsWith('-height')) return props.allProps.find((p) => p.id === id.replace(/-height$/, '-width')) ?? null
  return null
})

const isLocked = computed(() => !!companionProp.value && store.isAspectRatioLocked(props.subfeatureId, props.prop.id))

// companion / this, captured when the lock is turned on
const aspectRatio = ref(1)

const handleChange = (value: PropValue) => {
  store.updateProperty(props.subfeatureId, props.prop.id, value)

  if (isLocked.value && companionProp.value && typeof value === 'number') {
    store.updateProperty(props.subfeatureId, companionProp.value.id, Math.round(value * aspectRatio.value))
  }
}

const toggleLock = () => {
  const companion = companionProp.value
  if (!companion) return
  if (!isLocked.value) {
    aspectRatio.value = Number(valueOf(companion)) / (Number(currentValue.value) || 1)
  }
  store.toggleAspectRatioLock(props.subfeatureId, props.prop.id)
  store.toggleAspectRatioLock(props.subfeatureId, companion.id)
}
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <div class="flex items-center justify-between">
      <label class="label text-base-content text-xs font-medium">
        {{ prop.label }}
        <span
          v-if="isChanged"
          class="status status-primary status-xs"
          title="Changed" />
      </label>
      <button
        v-if="companionProp"
        class="btn btn-ghost btn-xs btn-square"
        :class="{ 'btn-active text-primary': isLocked }"
        :title="isLocked ? 'Aspect ratio locked' : 'Lock aspect ratio'"
        @click="toggleLock">
        <Icon :icon="isLocked ? 'fluent:lock-closed-16-regular' : 'fluent:lock-open-16-regular'" />
      </button>
    </div>

    <ColorInput
      v-if="prop.input.type === 'color'"
      :model-value="String(currentValue)"
      @update:model-value="handleChange" />

    <RangeInput
      v-else-if="prop.input.type === 'range'"
      :model-value="Number(currentValue)"
      :min="prop.input.min"
      :max="prop.input.max"
      :step="prop.input.step"
      @update:model-value="handleChange" />

    <RadiusInput
      v-else-if="prop.input.type === 'radius'"
      :model-value="currentValue as number | number[]"
      :max="prop.input.max"
      @update:model-value="handleChange" />

    <SelectInput
      v-else-if="prop.input.type === 'select'"
      :model-value="currentValue as string | number"
      :options="prop.input.options"
      @update:model-value="handleChange" />

    <ToggleInput
      v-else-if="prop.input.type === 'toggle'"
      :model-value="Boolean(currentValue)"
      @update:model-value="handleChange" />
  </div>
</template>
