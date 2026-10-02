<script setup lang="ts">
defineProps<{
  modelValue: string | number
  options: { label: string; value: string | number }[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onChange = (e: Event) => emit('update:modelValue', (e.target as HTMLSelectElement).value)
</script>

<template>
  <select
    :value="modelValue"
    class="select select-sm w-full"
    @change="onChange">
    <option
      v-for="option in options"
      :key="option.value"
      :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>
