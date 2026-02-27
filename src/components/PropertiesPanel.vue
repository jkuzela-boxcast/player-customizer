<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useUiStore } from '../stores/ui'
import PropertyInput from './PropertyInput.vue'

const store = useUiStore()

const props = defineProps<{
  feature: any
}>()

const emit = defineEmits<{
  resetFeature: [featureId: string]
}>()

// Group properties by their group field
const groupedProps = computed(() => {
  if (!props.feature.props) return {}
  
  const groups: { [key: string]: any[] } = {}
  props.feature.props.forEach((prop: any) => {
    const groupName = prop.group || 'General'
    if (!groups[groupName]) {
      groups[groupName] = []
    }
    groups[groupName].push(prop)
  })
  return groups
})

const handleReset = () => {
  emit('resetFeature', props.feature.id)
}
</script>

<template>
  <div v-if="!props.feature.props || props.feature.props.length === 0" class="flex flex-1 flex-col items-center justify-center gap-4 text-slate-500">
    <Icon icon="fluent:settings-16-filled" class="size-16" />
    <p>No properties available</p>
  </div>
  <div v-else class="flex flex-col overflow-y-auto">
    <!-- Properties grouped by category -->
    <div v-for="(groupProps, groupName) in groupedProps" :key="groupName" class="border-b border-slate-700">
      <h4 class="bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        {{ groupName }}
      </h4>
      <div class="flex flex-col gap-3 p-4">
        <PropertyInput
          v-for="prop in groupProps"
          :key="prop.id"
          :prop="prop"
          :feature-id="props.feature.id"
          :all-props="props.feature.props" />
      </div>
    </div>
    
    <!-- Reset button -->
    <div class="border-t border-slate-700 p-4">
      <button
        @click="handleReset"
        class="flex w-full items-center justify-center gap-2 rounded-md border border-red-700 bg-red-900 px-3 py-2 text-sm text-red-300 transition-all hover:border-red-400 hover:bg-red-800 hover:text-red-100">
        <Icon icon="fluent:arrow-reset-16-filled" />
        Reset Feature
      </button>
    </div>
  </div>
</template>

<style scoped></style>
