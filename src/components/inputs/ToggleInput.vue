<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label class="label cursor-pointer gap-3 text-xs">
    <input
      type="checkbox"
      class="toggle toggle-primary toggle-sm"
      :checked="modelValue"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)" />
    {{ modelValue ? 'Enabled' : 'Disabled' }}
  </label>
</template>
