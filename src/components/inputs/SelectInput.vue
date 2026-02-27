<script setup lang="ts">
defineProps<{
  modelValue: string | number
  options: Array<{label: string, value: string | number}>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const handleChange = (e: Event) => {
  const target = e.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <select
    :value="modelValue"
    class="rounded-md border border-slate-600 bg-slate-900 px-2 py-1 text-xs text-slate-300"
    @change="handleChange">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style scoped></style>
