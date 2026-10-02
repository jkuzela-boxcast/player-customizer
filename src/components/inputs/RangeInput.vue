<script setup lang="ts">
defineProps<{
  modelValue: number
  min: number
  max: number
  step: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const onInput = (e: Event) => emit('update:modelValue', parseFloat((e.target as HTMLInputElement).value) || 0)
</script>

<template>
  <div class="flex items-center gap-3">
    <input
      type="range"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      class="range range-primary range-xs flex-1"
      @input="onInput" />
    <input
      type="number"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      class="input input-sm w-18 font-mono text-xs"
      @change="onInput" />
  </div>
</template>
