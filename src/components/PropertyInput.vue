<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUiStore } from '../stores/ui'
import ColorInput from './inputs/ColorInput.vue'
import RangeInput from './inputs/RangeInput.vue'
import SelectInput from './inputs/SelectInput.vue'
import ToggleInput from './inputs/ToggleInput.vue'

const props = defineProps<{
  prop: any
  featureId: string
  allProps?: any[]
}>()

const store = useUiStore()

const currentValue = computed(() => {
  return store.getPropertyValue(props.featureId, props.prop.id, props.prop.input.default)
})

// Find companion width/height property - must have same prefix
const companionProp = computed(() => {
  if (!props.allProps) return null
  
  const propId = props.prop.id.toLowerCase()
  const isWidthProp = propId.includes('width')
  const isHeightProp = propId.includes('height')
  
  if (!isWidthProp && !isHeightProp) return null
  
  // Extract the prefix (everything before the dimension keyword)
  // E.g., "play-button-icon-width" → "play-button-icon-"
  //       "play-button-width" → "play-button-"
  let prefix = ''
  if (isWidthProp) {
    prefix = propId.substring(0, propId.lastIndexOf('width'))
  } else {
    prefix = propId.substring(0, propId.lastIndexOf('height'))
  }
  
  // Look for the complementary dimension with the same prefix
  const searchFor = isWidthProp ? 'height' : 'width'
  const expectedCompanionId = prefix + searchFor
  
  return props.allProps.find((p: any) => p.id.toLowerCase() === expectedCompanionId)
})

const hasAspectRatioLock = computed(() => {
  return companionProp.value !== null
})

const isAspectRatioLocked = computed(() => {
  if (!companionProp.value) return false
  return store.isAspectRatioLocked(props.featureId, props.prop.id)
})

// Store the initial aspect ratio when lock is enabled
const initialAspectRatio = ref<number | null>(null)

const handleChange = (value: any) => {
  // Only convert to number for range inputs
  const finalValue = props.prop.input.type === 'range' ? Number(value) : value
  store.updateProperty(props.featureId, props.prop.id, finalValue)
  
  // Handle aspect ratio locking (only applies to range inputs)
  if (props.prop.input.type === 'range' && isAspectRatioLocked.value && companionProp.value) {
    // Initialize aspect ratio on first change if not set
    if (initialAspectRatio.value === null) {
      const currentCompanionValue = store.getPropertyValue(
        props.featureId,
        companionProp.value.id,
        companionProp.value.input.default
      )
      initialAspectRatio.value = currentCompanionValue / (store.getPropertyValue(
        props.featureId,
        props.prop.id,
        props.prop.input.default
      ) || props.prop.input.default)
    }
    
    // Update companion value based on aspect ratio
    const newCompanionValue = Math.round(finalValue * (initialAspectRatio.value || 1))
    store.updateProperty(props.featureId, companionProp.value.id, newCompanionValue)
  }
}

const toggleAspectRatioLock = () => {
  const willLock = !isAspectRatioLocked.value
  
  // Reset aspect ratio cache when toggling
  if (willLock) {
    initializeAspectRatio()
  } else {
    initialAspectRatio.value = null
  }
  
  store.toggleAspectRatioLock(props.featureId, props.prop.id)
  if (companionProp.value) {
    store.toggleAspectRatioLock(props.featureId, companionProp.value.id)
  }
}

const initializeAspectRatio = () => {
  if (companionProp.value) {
    const currentValue = store.getPropertyValue(props.featureId, props.prop.id, props.prop.input.default)
    const companionValue = store.getPropertyValue(
      props.featureId,
      companionProp.value.id,
      companionProp.value.input.default
    )
    initialAspectRatio.value = companionValue / (currentValue || 1)
  }
}
</script>

<template>
  <div class="flex flex-col gap-1">
    <div class="flex items-center justify-between">
      <label class="text-xs font-medium text-slate-300">{{ prop.label }}</label>
      <button
        v-if="hasAspectRatioLock"
        @click="toggleAspectRatioLock"
        :title="isAspectRatioLocked ? 'Aspect ratio locked' : 'Aspect ratio unlocked'"
        class="rounded border border-slate-600 px-1.5 py-0.5 text-xs transition-all"
        :class="isAspectRatioLocked 
          ? 'border-bxblue bg-bxblue/10 text-bxblue' 
          : 'border-slate-600 text-slate-400 hover:border-slate-500'">
        🔒
      </button>
    </div>
    
    <!-- Color Input -->
    <ColorInput
      v-if="prop.input.type === 'color'"
      :model-value="currentValue"
      @update:model-value="handleChange" />
    
    <!-- Range Input -->
    <RangeInput
      v-else-if="prop.input.type === 'range'"
      :model-value="currentValue"
      :min="prop.input.min"
      :max="prop.input.max"
      :step="prop.input.step"
      @update:model-value="handleChange" />
    
    <!-- Select Input -->
    <SelectInput
      v-else-if="prop.input.type === 'select'"
      :model-value="currentValue"
      :options="prop.input.options"
      @update:model-value="handleChange" />
    
    <!-- Toggle Input -->
    <ToggleInput
      v-else-if="prop.input.type === 'toggle'"
      :model-value="currentValue"
      @update:model-value="handleChange" />
  </div>
</template>

<style scoped></style>
