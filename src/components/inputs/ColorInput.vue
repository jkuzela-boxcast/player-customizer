<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :value="modelValue"
    type="color"
    class="h-10 w-full cursor-pointer rounded-md border border-slate-600 bg-slate-900"
    @change="handleChange" />
</template>

<style scoped></style>
