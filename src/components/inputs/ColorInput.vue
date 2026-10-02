<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const onInput = (e: Event) => emit('update:modelValue', (e.target as HTMLInputElement).value)
</script>

<template>
  <label class="input input-sm w-full cursor-pointer">
    <input
      :value="modelValue"
      type="color"
      class="size-5 shrink-0 cursor-pointer rounded border-0 bg-transparent p-0"
      @input="onInput" />
    <span class="font-mono text-xs">{{ modelValue }}</span>
  </label>
</template>
