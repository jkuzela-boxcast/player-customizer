<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleToggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    @click="handleToggle"
    :class="props.modelValue 
      ? 'border-bxblue bg-bxblue/10 text-bxblue' 
      : 'border-slate-600 bg-slate-900 text-slate-400'"
    class="flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-xs font-medium transition-all hover:border-slate-500">
    <span v-if="props.modelValue" class="size-2 rounded-full bg-bxblue"></span>
    <span v-else class="size-2 rounded-full border border-slate-600 bg-transparent"></span>
    {{ props.modelValue ? 'Enabled' : 'Disabled' }}
  </button>
</template>

<style scoped></style>
