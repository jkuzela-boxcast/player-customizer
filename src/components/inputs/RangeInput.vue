<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue: number
  min: number
  max: number
  step: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const displayValue = ref(String(props.modelValue))

// Watch for changes from parent (e.g., aspect ratio lock syncing)
watch(
  () => props.modelValue,
  (newValue) => {
    displayValue.value = String(newValue)
  }
)

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  displayValue.value = target.value
  emit('update:modelValue', parseFloat(target.value))
}

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = parseFloat(target.value) || 0
  displayValue.value = String(value)
  emit('update:modelValue', value)
}
</script>

<template>
  <div class="flex gap-2">
    <input
      type="range"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      class="flex-1 cursor-pointer"
      @input="handleInput" />
    <input
      :value="displayValue"
      type="number"
      :min="min"
      :max="max"
      :step="step"
      class="w-16 rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-300"
      @change="handleInputChange" />
  </div>
</template>

<style scoped></style>
